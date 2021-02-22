import { AxiosResponse } from 'axios';
import { lensProp, map, over } from 'ramda';
import { API } from '../API';
import { IFolder } from '../../models/folder';
import { IApiCRUD } from '../../models/api';
import transformJSON from '../../utils/transformJSON';

export interface ICVMove {
  id: number;
  folderId: number;
}

/**
 * @description response userCvList has jsonData as string,
 * before passing data to the thunk and then into store reducer we should transform it to ICV type,
 * by parsing string with JSON.parse
 * */
const transformFolderResponse = (folder: IFolder): IFolder => {
  const userCvListLens = lensProp('userCvList');

  return over(
    userCvListLens,
    map(transformJSON('jsonData', 'parse'))
  )(folder);
};

class FolderApi extends API implements IApiCRUD<IFolder> {
  public async fetchRoot(): Promise<IFolder> {
    const { data } = await this.get('/folders/root') as AxiosResponse<IFolder>;
    return transformFolderResponse(data);
  }

  public async create(payload: any): Promise<IFolder> {
    const { data } = await this.post('/folders', payload) as AxiosResponse<IFolder>;
    return data;
  }

  public async fetchOne(id: number): Promise<IFolder> {
    const { data } = await this.get(`/folders/${id}`) as AxiosResponse<IFolder>;
    return transformFolderResponse(data);
  }

  public async remove(id: number): Promise<AxiosResponse> {
    return this.delete(`/folders/${id}`);
  }

  public async update(payload: IFolder): Promise<IFolder> {
    const { data } = await this.put('/folders', payload) as AxiosResponse<IFolder>;
    return data;
  }

  public async moveCV({ folderId, id }: ICVMove): Promise<IFolder> {
    const { data } = await this.put(`/folders/${folderId}/cv/${id}`) as AxiosResponse<IFolder>;
    return transformFolderResponse(data);
  }
}

export const folderApi = new FolderApi();
