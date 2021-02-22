import { TokensPair } from '../models/auth';

const getTokensFromLocalStorage = (): TokensPair => ({
  refreshToken: localStorage.getItem('refresh-token'),
  accessToken: localStorage.getItem('access-token'),
});

export default getTokensFromLocalStorage;
