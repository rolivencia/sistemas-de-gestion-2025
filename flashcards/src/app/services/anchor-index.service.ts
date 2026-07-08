import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface IndiceSeccion {
  readonly ancla: string;
}
interface IndiceApunte {
  readonly archivo: string;
  readonly secciones: readonly IndiceSeccion[];
}
interface IndiceAnclas {
  readonly apuntes: readonly IndiceApunte[];
}

/**
 * Provee, por apunte, la lista ordenada de anclas de `indice-anclas.json`.
 *
 * El visor asigna los `id` de los encabezados por POSICIÓN contra esta lista
 * (los encabezados renderizados salen en el mismo orden que el índice). Es más
 * robusto que re-sluggear el `textContent`: no se rompe con encabezados que
 * contienen LaTeX (`$S_s$`), enlaces u otro markup cuyo `textContent` difiere
 * del texto crudo con el que se generó el ancla en la Fase 0.
 */
@Injectable({ providedIn: 'root' })
export class AnchorIndexService {
  private readonly http = inject(HttpClient);
  private index: Map<string, readonly string[]> | null = null;
  private loadPromise: Promise<void> | null = null;

  /** Carga (una vez) el índice. Nunca rechaza: ante error deja el índice vacío. */
  load(): Promise<void> {
    return (this.loadPromise ??= firstValueFrom(
      this.http.get<IndiceAnclas>('/data/indice-anclas.json'),
    )
      .then((data) => {
        this.index = new Map(
          data.apuntes.map((a) => [a.archivo, a.secciones.map((s) => s.ancla)]),
        );
      })
      .catch(() => {
        this.index = new Map();
      }));
  }

  getAnclas(apunte: string): readonly string[] | null {
    return this.index?.get(apunte) ?? null;
  }
}
