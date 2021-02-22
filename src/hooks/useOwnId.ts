import { useEffect, useState } from 'react';
import { compose } from 'ramda';
import curriedJwtDecode from '../utils/curriedJwtDecode';
import getTokensFromLocalStorage from '../utils/getTokensFromLocalStorage';
import extractID from '../utils/extractID';

export function useOwnId(): number {
  const [id, setId] = useState<number>(0);
  const { accessToken } = getTokensFromLocalStorage();

  const getUserId = compose(extractID, curriedJwtDecode);

  useEffect(() => {
    setId(Number(getUserId(accessToken as string)));
  }, [accessToken, getUserId]);

  return id;
}
