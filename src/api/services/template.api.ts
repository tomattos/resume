import { API } from '../API';
import transformJSON from '../../utils/transformJSON';

interface ITemplateResponse {
  id: number
}

class TemplateApi extends API {
  // public async fetchSelected(): Promise<ITemplateResponse> {
  //   const { data } = await this.get(`/template/selected`);
  //   return transformJSON();
  // }
  //
  // public setSelected(id: number) {
  // }
}

export const userApi = new TemplateApi();
