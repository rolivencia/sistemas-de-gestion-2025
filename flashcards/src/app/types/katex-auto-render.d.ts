// KaTeX no publica tipos para el subpath del auto-render; declaramos el mínimo
// que usamos (se expone como global `renderMathInElement` para ngx-markdown).
declare module 'katex/contrib/auto-render' {
  const renderMathInElement: (
    element: HTMLElement,
    options?: Record<string, unknown>,
  ) => void;
  export default renderMathInElement;
}
