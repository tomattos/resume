import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { assocPath, compose, when } from 'ramda';
import getTokensFromLocalStorage from '../utils/getTokensFromLocalStorage';
import { checkHttpStatus } from '../utils/checkHttpStatus';
import store from '../store';
import { logOut } from '../store/auth/thunks';

const { dispatch } = store;

export class API {
  private apiConfig: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_API_BASE_PATH,
    headers: {
      'Application-Type': 'CV',
      'Access-Control-Allow-Origin': '*',
    },
  };

  private api: AxiosInstance;

  public constructor() {
    this.api = axios.create(this.apiConfig);

    // this middleware is been called right before the http request is made.
    this.api.interceptors.request.use(
      (params): AxiosRequestConfig => {
        const { accessToken, refreshToken } = getTokensFromLocalStorage();
        const addTokens = compose(
          assocPath(['headers', 'access-token'], accessToken),
          assocPath(['headers', 'refresh-token'], refreshToken)
        );
        return addTokens(params) as AxiosRequestConfig;
      },
      (error) => Promise.reject(error)
    );

    // this middleware is been called right before the response is get it by the method that triggers the request
    this.api.interceptors.response.use((param: AxiosResponse) => {
      return param;
    }, (error: AxiosError) => {
      when(
        checkHttpStatus(401),
        () => dispatch(logOut())
      )(error);
    });
  }

  public getUri(config?: AxiosRequestConfig): string {
    return this.api.getUri(config);
  }

  public request<T, R = AxiosResponse<T>>(
    config: AxiosRequestConfig
  ): Promise<R> {
    return this.api.request(config);
  }

  public get<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.get(url, config);
  }

  public delete<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.delete(url, config);
  }

  public post<T, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.post(url, data, config);
  }

  public put<T, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.put(url, data, config);
  }

  public patch<T, R = AxiosResponse<T>>(
    url: string,
    data?: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.patch(url, data, config);
  }
}
