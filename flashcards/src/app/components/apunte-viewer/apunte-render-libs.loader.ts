import { DOCUMENT, Injectable, inject } from '@angular/core';

/**
 * Carga diferida de KaTeX y Mermaid, exponiéndolas como globales — que es como
 * ngx-markdown las consume (`typeof katex`, `renderMathInElement`, `mermaid`).
 *
 * Aislar esto en un servicio inyectable cumple dos objetivos:
 * - Las librerías (pesadas) quedan en el chunk diferido del visor, fuera del
 *   bundle inicial.
 * - En tests se puede sustituir por un stub, evitando importar Mermaid en jsdom.
 */
@Injectable({ providedIn: 'root' })
export class ApunteRenderLibsLoader {
  private readonly document = inject(DOCUMENT);
  // Cachea la promesa en vuelo para que aperturas concurrentes del visor no
  // disparen la carga (ni la escritura de globales) más de una vez.
  private loadPromise: Promise<void> | null = null;

  load(): Promise<void> {
    return (this.loadPromise ??= this.loadOnce());
  }

  private async loadOnce(): Promise<void> {
    const scope = this.document.defaultView as unknown as Record<string, unknown>;
    const [katex, autoRender, mermaid] = await Promise.all([
      import('katex'),
      import('katex/contrib/auto-render'),
      import('mermaid'),
    ]);
    scope['katex'] = katex.default;
    scope['renderMathInElement'] = autoRender.default;
    scope['mermaid'] = mermaid.default;
  }
}
