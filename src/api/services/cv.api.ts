import { AxiosResponse } from 'axios';
import { map, pick, pipe } from 'ramda';
import { API } from '../API';
import { AccessLevel, ICV, ICVDocument } from '../../models/cv';
import { IApiCRUD } from '../../models/api';
import transformJSON from '../../utils/transformJSON';

type cvJsonData = ICV | string;

interface CVResponse {
  id: number,
  jsonData: cvJsonData,
  userId: number
}

interface FileResponse {
  content: string;
  contentType: string;
  name: string;
}

export interface CVDto {
  id: number,
  jsonData: cvJsonData
}

const transformCVResponse = (response: CVResponse): CVDto => {
  return pipe(
    pick(['id', 'jsonData']),
    transformJSON('jsonData', 'parse')
  )(response) as CVDto;
};

class CVAPI extends API implements IApiCRUD<CVDto>{
  public async create(cvFormValues: ICV): Promise<CVDto> {
    const { data } = await this.post<CVResponse>('/cv', { jsonData: JSON.stringify(cvFormValues) });
    return transformCVResponse(data);
  }

  public async createForNonExistingUser(cvFormValues: ICV): Promise<CVDto> {
    const { data } = await this.post<CVResponse>('/cv/not-existed', { jsonData: JSON.stringify(cvFormValues) });
    return transformCVResponse(data);
  }

  public async fetchAll(): Promise<CVDto[]> {
    const { data } = await this.get<CVResponse[]>('/cv');
    return map(transformCVResponse, data);
  }

  public async fetchOne(id: number): Promise<CVDto> {
    const { data } = await this.get<CVResponse>(`/cv/${id}`);
    return transformCVResponse(data);
  }

  public async remove(id: number): Promise<AxiosResponse> {
    return this.delete(`/cv/${id}`);
  }

  public async update({ id, jsonData }: CVDto): Promise<CVDto> {
    const { data } = await this.put<CVResponse>('/cv', { id, jsonData: JSON.stringify(jsonData) });
    return transformCVResponse(data);
  }

  public async fetchUserCV(): Promise<CVDto> {
    const { data } = await this.get<CVResponse>('/cv');
    return transformCVResponse(data);
  }

  public async clone(id: number): Promise<ICVDocument> {
    const { data } = await this.put<CVResponse>(`/cv/${id}/clone`);
    return transformJSON('jsonData', 'parse', data) as ICVDocument;
  }

  public async fetchPublicLink(id: number): Promise<string> {
    const { data } = await this.get(`/cv/${id}/link`);
    return data as string;
  }

  public async updateCVAccess(payload: { id: number, accessLevel: AccessLevel }): Promise<void> {
    await this.put('/cv/access', payload);
  }

  public async fetchPublicCVForPublicTemplate(payload: { token: string }): Promise<CVDto> {
    const { data } = await this.get<CVResponse>(`/cv/public?token=${payload.token}`);
    return transformCVResponse(data);
  }

  public async downloadPDF(payload: { html: string, name: string }): Promise<FileResponse> {
    const { data } = await this.post('/cv/public/pdf', payload);
    return data as FileResponse;
  }
}

export const cvApi = new CVAPI();
