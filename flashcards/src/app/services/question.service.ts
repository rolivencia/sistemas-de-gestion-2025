import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import type { Question } from '../models/question.model';

@Injectable({ providedIn: 'root' })
export class QuestionService {
  private readonly http = inject(HttpClient);
  private readonly questions$ = this.http
    .get<Question[]>('/data/preguntas.json')
    .pipe(shareReplay(1));

  getAll(): Observable<Question[]> {
    return this.questions$;
  }

  getByUnidades(unidades: string[]): Observable<Question[]> {
    if (unidades.length === 0) {
      return this.questions$;
    }
    return this.questions$.pipe(
      map((questions) =>
        questions.filter((q) =>
          q.unidades.some((u) => unidades.includes(u)),
        ),
      ),
    );
  }

  getUnidades(): Observable<string[]> {
    return this.questions$.pipe(
      map((questions) => {
        const all = questions.flatMap((q) => q.unidades);
        return [...new Set(all)].sort((a, b) => {
          const numA = parseInt(a.replace(/\D/g, ''), 10);
          const numB = parseInt(b.replace(/\D/g, ''), 10);
          return numA - numB;
        });
      }),
    );
  }
}
