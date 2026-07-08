import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideMarkdown } from 'ngx-markdown';
import { ApunteViewerComponent } from './apunte-viewer.component';
import { ApunteRenderLibsLoader } from './apunte-render-libs.loader';

// Stub que nunca resuelve: mantiene `libsReady` en false, así el test no monta
// `<markdown>` ni importa KaTeX/Mermaid en jsdom.
const neverLoads: Pick<ApunteRenderLibsLoader, 'load'> = {
  load: () => new Promise<void>(() => {}),
};

function create(inputs: {
  apunte: string;
  ancla?: string;
  seccion?: string;
}): ComponentFixture<ApunteViewerComponent> {
  const fixture = TestBed.createComponent(ApunteViewerComponent);
  fixture.componentRef.setInput('apunte', inputs.apunte);
  if (inputs.ancla !== undefined) fixture.componentRef.setInput('ancla', inputs.ancla);
  if (inputs.seccion !== undefined) {
    fixture.componentRef.setInput('seccion', inputs.seccion);
  }
  fixture.detectChanges();
  return fixture;
}

describe('ApunteViewerComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApunteViewerComponent],
      providers: [
        provideHttpClient(),
        provideMarkdown(),
        { provide: ApunteRenderLibsLoader, useValue: neverLoads },
      ],
    }).compileComponents();
  });

  it('renderiza un diálogo accesible rotulado con el apunte y la sección', () => {
    const fixture = create({
      apunte: 'apunte-14-planificacion-agregada-produccion',
      seccion: '4. Planificación Agregada de la Producción (PAP)',
    });
    const host = fixture.nativeElement as HTMLElement;
    const dialog = host.querySelector('[role="dialog"]');

    expect(dialog).toBeTruthy();
    expect(dialog?.getAttribute('aria-modal')).toBe('true');
    expect(dialog?.getAttribute('aria-label')).toContain(
      'apunte-14-planificacion-agregada-produccion',
    );
    expect(host.textContent).toContain('4. Planificación Agregada de la Producción');
  });

  it('no monta <markdown> hasta que las librerías estén listas', () => {
    const fixture = create({ apunte: 'apunte-2-bpms' });
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('markdown')).toBeNull();
    expect(host.textContent).toContain('Cargando apunte');
  });

  it('emite close al pulsar el botón cerrar', () => {
    const fixture = create({ apunte: 'apunte-2-bpms' });
    let closed = false;
    fixture.componentInstance.close.subscribe(() => (closed = true));

    const button = (fixture.nativeElement as HTMLElement).querySelector(
      'button[aria-label="Cerrar apunte"]',
    ) as HTMLButtonElement;
    button.click();

    expect(closed).toBe(true);
  });

  it('emite close con la tecla Escape', () => {
    const fixture = create({ apunte: 'apunte-2-bpms' });
    let closed = false;
    fixture.componentInstance.close.subscribe(() => (closed = true));

    fixture.nativeElement.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
    );

    expect(closed).toBe(true);
  });

  it('emite close al hacer click en el backdrop', () => {
    const fixture = create({ apunte: 'apunte-2-bpms' });
    let closed = false;
    fixture.componentInstance.close.subscribe(() => (closed = true));

    const backdrop = (fixture.nativeElement as HTMLElement).querySelector(
      '[aria-hidden="true"]',
    ) as HTMLElement;
    backdrop.click();

    expect(closed).toBe(true);
  });
});
