import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { AnchorIndexService } from './anchor-index.service';

const INDICE = {
  apuntes: [
    {
      archivo: 'apunte-12-gestion-de-inventarios',
      secciones: [
        { ancla: '1-inventario-conceptos' },
        { ancla: '7-2-inventario-stock-de-seguridad-s-s' },
      ],
    },
  ],
};

describe('AnchorIndexService', () => {
  let service: AnchorIndexService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AnchorIndexService);
    http = TestBed.inject(HttpTestingController);
  });

  it('devuelve las anclas ordenadas del apunte tras cargar el índice', async () => {
    const loading = service.load();
    http.expectOne('/data/indice-anclas.json').flush(INDICE);
    await loading;

    expect(service.getAnclas('apunte-12-gestion-de-inventarios')).toEqual([
      '1-inventario-conceptos',
      '7-2-inventario-stock-de-seguridad-s-s',
    ]);
  });

  it('devuelve null para un apunte desconocido', async () => {
    const loading = service.load();
    http.expectOne('/data/indice-anclas.json').flush(INDICE);
    await loading;

    expect(service.getAnclas('apunte-inexistente')).toBeNull();
  });

  it('carga una sola vez aunque se llame a load() varias veces', async () => {
    const a = service.load();
    const b = service.load();
    http.expectOne('/data/indice-anclas.json').flush(INDICE);
    await Promise.all([a, b]);

    http.verify(); // no habría un segundo request pendiente
    expect(service.getAnclas('apunte-12-gestion-de-inventarios')).not.toBeNull();
  });

  it('no rechaza ante error de red: deja el índice vacío', async () => {
    const loading = service.load();
    http
      .expectOne('/data/indice-anclas.json')
      .error(new ProgressEvent('error'));
    await loading;

    expect(service.getAnclas('apunte-12-gestion-de-inventarios')).toBeNull();
  });
});
