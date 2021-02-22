import { MutableRefObject } from 'react';

const findTemplate = (ref: MutableRefObject<any>): HTMLElement => {
  return ref.current.getElementsByClassName('template')[0];
};

export default findTemplate;
