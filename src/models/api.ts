import { AxiosResponse } from 'axios';

export interface IApiCRUD<T> {
  fetchOne(id: number): Promise<T>;

  fetchAll?(): Promise<T[]>;

  update?(payload: T): Promise<T>;

  remove?(id: number): Promise<AxiosResponse>;

  create?(payload: T | any): Promise<T>;
}
