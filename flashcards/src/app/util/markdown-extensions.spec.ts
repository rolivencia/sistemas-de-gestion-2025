import { apunteMarkdownExtension } from './markdown-extensions';

const preprocess = apunteMarkdownExtension.hooks?.preprocess as (
  markdown: string,
) => string;

describe('apunteMarkdownExtension · preprocess', () => {
  it('quita el frontmatter YAML inicial', () => {
    const md = '---\ntitulo: X\nunidad: 1\n---\n# Encabezado\ntexto';
    expect(preprocess(md)).toBe('# Encabezado\ntexto');
  });

  it('no toca separadores --- que no sean frontmatter inicial', () => {
    const md = '# H\n\n---\n\notra cosa';
    expect(preprocess(md)).toBe(md);
  });

  it('convierte [[destino]] a texto plano', () => {
    expect(preprocess('ver [[apunte-1]] acá')).toBe('ver apunte-1 acá');
  });

  it('usa el alias en [[destino|alias]]', () => {
    expect(preprocess('ver [[apunte-1|El apunte]] acá')).toBe('ver El apunte acá');
  });

  it('descarta el ! de los embeds ![[destino]]', () => {
    expect(preprocess('![[diagrama.png]]')).toBe('diagrama.png');
  });
});
