import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  ElementRef,
  OnDestroy,
  afterNextRender,
  computed,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { ApunteRenderLibsLoader } from './apunte-render-libs.loader';
import { AnchorIndexService } from '../../services/anchor-index.service';
import { HeadingSlugger } from '../../util/slug';

/**
 * Drawer lateral que muestra un apunte completo del vault, embebido en la app,
 * posicionado en la sección (ancla) que fundamenta la flashcard.
 *
 * - Renderiza `/apuntes/<apunte>.md` con ngx-markdown (KaTeX + Mermaid activos).
 * - Al terminar el render (`ready`), hace scroll a la sección `id === ancla` y
 *   aplica un resaltado temporal.
 * - Accesible: `role="dialog"`, `aria-modal`, cierre con Esc / backdrop, trampa
 *   de foco básica y restauración del foco previo.
 */
@Component({
  selector: 'app-apunte-viewer',
  imports: [MarkdownComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(keydown.escape)': 'requestClose()',
    '(keydown.tab)': 'onTab($event)',
  },
  template: `
    <div
      class="fixed inset-0 z-50 flex justify-end animate-fade-in"
      (click)="onBackdropClick($event)"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true"></div>

      <!-- Panel -->
      <section
        #panel
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="'Apunte: ' + apunte()"
        tabindex="-1"
        class="apunte-drawer relative h-dvh w-full max-w-2xl bg-card border-l border-border
               shadow-2xl flex flex-col outline-none"
      >
        <!-- Header -->
        <header
          class="flex items-center justify-between gap-4 px-6 py-4 border-b border-border
                 bg-card/80 backdrop-blur-md sticky top-0 z-10"
        >
          <p class="text-sm font-semibold text-foreground truncate">
            {{ seccion() || 'Apunte' }}
          </p>
          <button
            #closeButton
            type="button"
            (click)="requestClose()"
            aria-label="Cerrar apunte"
            class="flex-shrink-0 p-2 -mr-2 rounded-xl text-muted-foreground
                   hover:text-foreground hover:bg-secondary transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <!-- Content -->
        <div #scrollContainer class="flex-1 overflow-y-auto px-6 py-6">
          @if (libsReady()) {
            <markdown
              class="apunte-prose block"
              [src]="src()"
              katex
              [katexOptions]="katexOptions"
              mermaid
              (ready)="onReady()"
              (error)="onError($event)"
            />
          } @else {
            <p class="text-sm text-muted-foreground">Cargando apunte&hellip;</p>
          }
          @if (hasError()) {
            <p class="text-sm text-destructive mt-4">
              No se pudo cargar el apunte.
            </p>
          }
        </div>
      </section>
    </div>
  `,
})
export class ApunteViewerComponent implements OnDestroy {
  readonly apunte = input.required<string>();
  readonly ancla = input<string>('');
  readonly seccion = input<string>('');
  readonly close = output<void>();

  protected readonly hasError = signal(false);
  protected readonly libsReady = signal(false);
  protected readonly src = computed(() => `/apuntes/${this.apunte()}.md`);
  // Algunas fórmulas de los apuntes tienen LaTeX malformado; que se rendericen
  // en rojo en vez de tirar error de consola.
  protected readonly katexOptions = { throwOnError: false };

  private readonly panel = viewChild.required<ElementRef<HTMLElement>>('panel');
  private readonly closeButton =
    viewChild.required<ElementRef<HTMLButtonElement>>('closeButton');
  private readonly scrollContainer =
    viewChild.required<ElementRef<HTMLElement>>('scrollContainer');

  private readonly document = inject(DOCUMENT);
  private readonly hostRef = inject(ElementRef<HTMLElement>);
  private readonly libsLoader = inject(ApunteRenderLibsLoader);
  private readonly anchorIndex = inject(AnchorIndexService);
  private readonly previouslyFocused = this.document.activeElement as HTMLElement | null;
  private readonly highlightClass = 'apunte-target-highlight';
  private destroyed = false;
  // Elementos del fondo a los que aplicamos `inert` mientras el drawer está
  // abierto; sólo restauramos los que marcamos nosotros.
  private inertedSiblings: HTMLElement[] = [];
  private mermaidObserver: ResizeObserver | null = null;

  constructor() {
    afterNextRender(() => {
      this.document.body.style.overflow = 'hidden';
      this.applyBackgroundInert();
      this.closeButton().nativeElement.focus();
    });
    // Recién con KaTeX/Mermaid (y el índice de anclas) listos montamos
    // `<markdown>` (`libsReady`): así evitamos el error "katex not loaded" de
    // ngx-markdown y garantizamos que `assignHeadingIds` tenga las anclas.
    Promise.all([this.libsLoader.load(), this.anchorIndex.load()])
      .then(() => {
        if (!this.destroyed) this.libsReady.set(true);
      })
      .catch(() => {
        if (!this.destroyed) this.hasError.set(true);
      });
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.mermaidObserver?.disconnect();
    this.document.body.style.overflow = '';
    this.inertedSiblings.forEach((el) => el.removeAttribute('inert'));
    this.inertedSiblings = [];
    this.previouslyFocused?.focus?.();
  }

  /**
   * Aísla del lector de pantalla el contenido de fondo mientras el drawer está
   * abierto: `aria-modal` no es honrado por todas las combinaciones AT/navegador.
   */
  private applyBackgroundInert(): void {
    const host = this.hostRef.nativeElement;
    const siblings = host.parentElement?.children;
    if (!siblings) return;
    for (const node of Array.from(siblings)) {
      if (node === host || !(node instanceof HTMLElement)) continue;
      if (node.hasAttribute('inert')) continue;
      node.setAttribute('inert', '');
      this.inertedSiblings.push(node);
    }
  }

  protected requestClose(): void {
    this.close.emit();
  }

  protected onBackdropClick(event: MouseEvent): void {
    if (!this.panel().nativeElement.contains(event.target as Node)) {
      this.requestClose();
    }
  }

  protected onError(_event: string | Error): void {
    this.hasError.set(true);
  }

  protected onReady(): void {
    this.assignHeadingIds();
    this.scrollToAncla();
    // Mermaid reajusta el layout de forma asíncrona tras `ready`; observamos el
    // contenedor y reposicionamos hasta que se estabiliza (con corte por tiempo).
    this.observeReflowAndRescroll();
  }

  private observeReflowAndRescroll(): void {
    // Observamos el contenido renderizado (crece a medida que Mermaid pinta los
    // diagramas) y reposicionamos; sin resaltar de nuevo para no reiniciar el flash.
    const content = this.scrollContainer().nativeElement.querySelector('markdown');
    if (!this.ancla() || !content || typeof ResizeObserver === 'undefined') return;
    this.mermaidObserver = new ResizeObserver(() => this.scrollToAncla(false));
    this.mermaidObserver.observe(content);
    // Cortamos la observación pasado el margen en que Mermaid termina de pintar.
    setTimeout(() => this.mermaidObserver?.disconnect(), 1500);
  }

  /**
   * Asigna el `id` de cada encabezado. Se hace sobre el DOM renderizado porque
   * el sanitizador de ngx-markdown descarta el `id` si se emite desde `marked`.
   *
   * Estrategia principal: mapear por POSICIÓN contra las anclas del índice
   * (Fase 0). Los encabezados salen en el mismo orden que el índice (niveles
   * H2–H4; el H1 de título no está indexado), así que asignar `anclas[i]` al
   * i-ésimo encabezado es exacto aunque el `textContent` difiera del texto
   * crudo (p. ej. encabezados con LaTeX como `$S_s$`).
   *
   * Fallback: re-sluggear el `textContent` con el algoritmo de la Fase 0 (menos
   * robusto ante math/enlaces), sólo si el índice no está disponible o el conteo
   * no cuadra.
   */
  private assignHeadingIds(): void {
    // H2–H4 (sin H1) para alinear 1:1 con el índice.
    const headings = this.panel().nativeElement.querySelectorAll<HTMLElement>(
      '.apunte-prose h2, .apunte-prose h3, .apunte-prose h4',
    );
    const anclas = this.anchorIndex.getAnclas(this.apunte());
    if (anclas && anclas.length === headings.length) {
      headings.forEach((heading, i) => {
        heading.id = anclas[i];
      });
      return;
    }
    const slugger = new HeadingSlugger();
    headings.forEach((heading) => {
      heading.id = slugger.slug((heading.textContent ?? '').trim());
    });
  }

  private scrollToAncla(highlight = true): void {
    const ancla = this.ancla();
    if (!ancla) return;
    const target = this.panel().nativeElement.querySelector(
      `#${CSS.escape(ancla)}`,
    );
    if (!(target instanceof HTMLElement)) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (!highlight) return;
    target.classList.add(this.highlightClass);
    setTimeout(() => target.classList.remove(this.highlightClass), 2400);
  }

  protected onTab(event: Event): void {
    if (!(event instanceof KeyboardEvent)) return;
    const focusables = this.panel().nativeElement.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = this.document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }
}
