import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

  it('se crea y renderiza el router-outlet', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    // App.ngOnInit dispara la carga de preguntas; respondemos para no dejar
    // peticiones HTTP colgadas en el test.
    const http = TestBed.inject(HttpTestingController);
    http.expectOne('/data/preguntas.json').flush([]);
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
    http.verify();
  });
});
