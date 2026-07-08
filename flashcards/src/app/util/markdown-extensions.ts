import type { MarkedExtension } from 'marked';

/**
 * Extensión de `marked` que limpia, en `preprocess`, la sintaxis que los apuntes
 * traen del vault y que `marked` no interpreta: frontmatter YAML y wikilinks de
 * Obsidian.
 *
 * Los `id` de los encabezados NO se emiten acá: el sanitizador de ngx-markdown
 * descarta el atributo `id` del HTML generado, así que los asignamos sobre el
 * DOM ya renderizado en el visor (ver `ApunteViewerComponent`), con el mismo
 * algoritmo de slug de `indice-anclas.json` (Fase 0).
 *
 * KaTeX y Mermaid tampoco se manejan acá: los activan los atributos `katex` y
 * `mermaid` de `<markdown>`, con carga diferida dentro del visor.
 */

// Frontmatter YAML al inicio del archivo (--- ... ---).
const YAML_FRONTMATTER = /^---\r?\n[\s\S]*?\r?\n---\r?\n/;
// Wikilinks de Obsidian: [[destino]], [[destino|alias]] y embeds ![[destino]]
// -> texto plano (se descarta el `!` de embed).
const WIKILINK = /!?\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

export const apunteMarkdownExtension: MarkedExtension = {
  hooks: {
    preprocess(markdown: string): string {
      return markdown
        .replace(YAML_FRONTMATTER, '')
        .replace(WIKILINK, (_match, target: string, alias?: string) =>
          (alias ?? target).trim(),
        );
    },
  },
};
