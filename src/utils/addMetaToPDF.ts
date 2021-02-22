const addMetaToPDF = (html: HTMLElement): Document => {
  const templateDocument: Document = document.implementation.createHTMLDocument(
    'Template'
  );
  const { head } = templateDocument;
  const body = document.createElement('body');
  const styles = document.createElement('style');
  styles.innerHTML = `@page {
    size: 1000px;
  }
  table {
    page-break-inside: auto;
  }
  tr {
    page-break-inside: avoid;
     page-break-after: auto;
  }
  `;
  head.appendChild(styles);
  body.appendChild(html);
  templateDocument.body = body;
  return templateDocument;
};

export default addMetaToPDF;
