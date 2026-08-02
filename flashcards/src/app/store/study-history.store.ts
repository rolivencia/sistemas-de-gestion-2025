import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import type {
  ProgressDocument,
  SessionRecord,
} from '../models/study-history.model';
import { STUDY_STORAGE } from '../storage/study-storage.token';
import {
  applySession,
  emptyProgressDocument,
  needsRebuild,
  rebuildProgress,
} from '../util/progress-projection';

interface StudyHistoryState {
  readonly history: readonly SessionRecord[];
  readonly progress: ProgressDocument;
  readonly hydrated: boolean;
}

const initialState: StudyHistoryState = {
  history: [],
  progress: emptyProgressDocument(),
  hydrated: false,
};

/**
 * Historial persistido de sesiones y su agregado por pregunta.
 *
 * El historial es el registro autoritativo; el agregado es una caché que se
 * reconstruye sola en cuanto deja de cuadrar. No conoce al `FlashcardStore`:
 * la dependencia va en un solo sentido para que no haya ciclos.
 */
export const StudyHistoryStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => {
    const storage = inject(STUDY_STORAGE);

    return {
      sessionCount: computed(() => store.history().length),
      lastSession: computed(() => store.history().at(-1) ?? null),
      /** Las escrituras dejaron de llegar al disco. */
      degraded: computed(() => storage.degraded()),
    };
  }),
  withMethods((store) => {
    const storage = inject(STUDY_STORAGE);

    return {
      /**
       * Carga lo guardado y valida la caché contra el historial. Si el número
       * de sesiones o la última no coinciden —o cambió el algoritmo— se
       * reproyecta todo desde cero.
       */
      async hydrate(): Promise<void> {
        const history = await storage.loadHistory();
        const stored = await storage.loadProgress();

        let progress = stored;
        if (needsRebuild(stored, history)) {
          // Lo que el agregado decía cubrir y ya no está en el historial fue
          // podado por falta de espacio: el conteo deja de ser exacto.
          const pruned =
            (stored?.prunedSessions ?? 0) +
            Math.max(0, (stored?.sourceSessionCount ?? 0) - history.length);
          progress = rebuildProgress(history, pruned);
          await storage.saveProgress(progress);
        }

        patchState(store, {
          history,
          progress: progress ?? emptyProgressDocument(),
          hydrated: true,
        });
      },

      async recordSession(record: SessionRecord): Promise<void> {
        await storage.appendSession(record);
        const progress = applySession(store.progress(), record);
        await storage.saveProgress(progress);

        // Se relee para reflejar una posible poda al escribir.
        patchState(store, {
          history: await storage.loadHistory(),
          progress,
        });
      },

      /** Reproyecta el agregado desde el historial, a pedido del usuario. */
      async rebuild(): Promise<void> {
        const history = await storage.loadHistory();
        const progress = rebuildProgress(
          history,
          store.progress().prunedSessions,
        );
        await storage.saveProgress(progress);
        patchState(store, { history, progress });
      },

      async clear(): Promise<void> {
        await storage.clearAll();
        patchState(store, {
          history: [],
          progress: emptyProgressDocument(),
        });
      },
    };
  }),
);
