declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      REACT_APP_API_BASE_PATH: string;
      REACT_APP_GOOGLE_AUTH_PATH: string;
      PORT?: number;
    }
  }
}

export {};
