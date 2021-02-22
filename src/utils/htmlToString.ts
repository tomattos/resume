const htmlToString = (document: Document): string => {
  return new XMLSerializer().serializeToString(document);
};

export default htmlToString;
