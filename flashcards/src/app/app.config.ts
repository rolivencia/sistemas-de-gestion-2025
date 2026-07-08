import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MARKED_EXTENSIONS, provideMarkdown } from 'ngx-markdown';

import { routes } from './app.routes';
import { apunteMarkdownExtension } from './util/markdown-extensions';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideMarkdown({
      markedExtensions: [
        { provide: MARKED_EXTENSIONS, useValue: apunteMarkdownExtension, multi: true },
      ],
    }),
  ],
};
