import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isNil } from 'ramda';
import { actions } from 'store/cv/slice';
import { selectCurrentCV } from 'store/cv/selectors';
import { fetchOneCV, fetchUserCV } from 'store/cv/thunks';

function useCurrentCV(id: number | undefined) {
  const dispatch = useDispatch();
  const currentCV = useSelector(selectCurrentCV);

  /**
   * @description before destroying component clean store from currentCV
   * */
  useEffect(() => {
    return function cleanup() {
      dispatch(actions.cvReceived(undefined));
    };
  }, []);

  /**
   * @description fetch CV by id provided in the URL,
   * or fetch CV for current user in the system
   * */
  useEffect(() => {
    isNil(id) ? dispatch(fetchUserCV()) : dispatch(fetchOneCV(Number(id)));
  }, [dispatch, id]);

  return currentCV;
}

export default useCurrentCV;
