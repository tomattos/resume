import { IUser } from 'models/user';
import { IApiCRUD } from 'models/api';
import { AxiosResponse } from 'axios';
import { API } from '../API';

class UserApi extends API implements IApiCRUD<IUser>{
  public async fetchOne(id: number) {
    const { data } = await this.get<IUser>(`/users/${id}`);
    return data;
  }

  public async fetchAll() {
    const { data } = await this.get<IUser[]>('/users');
    return data;
  }

  public async update(payload: IUser) {
    const { data } = await this.put<IUser>('/users', payload);
    return data;
  }

  public async remove(id: number): Promise<AxiosResponse> {
    return this.delete(`/users/${id}`);
  }

  public async fetchProfile() {
    const { data } = await this.get<IUser>('/users/profile');
    return data;
  }
}

export const userApi = new UserApi();
