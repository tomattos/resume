import { useEffect } from 'react';
import { when } from 'ramda';
import { useDispatch } from 'react-redux';
import { setUpTokens } from '../store/auth/thunks';
import checkForTokens from '../utils/checkForTokens';
import { TokensPair } from '../models/auth';

/**
 * @description this effect responsible for emitting redux store with tokens provided
 * */
function useSetToken(tokens: TokensPair) {
  const dispatch = useDispatch();

  useEffect(() => {
    when(checkForTokens, () => dispatch(setUpTokens(tokens)))(tokens);
  });
}

export default useSetToken;
