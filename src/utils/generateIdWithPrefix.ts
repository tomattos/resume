import generateId from './generateId';

const generateIdWithPrefix = (prefix: string) => `${prefix}${generateId()}`;

export default generateIdWithPrefix;
