import { AxiosError } from 'axios';
import { equals, pathSatisfies } from 'ramda';

export function checkHttpStatus(status: number): (error: AxiosError) => boolean {
  return function (error: AxiosError) {
    return pathSatisfies(equals(status), ['response', 'status'], error);
  };
}
