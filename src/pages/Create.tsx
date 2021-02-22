import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { assoc, isNil } from 'ramda';
import { ICV } from 'models/cv';
import { CVEntity } from 'entities/CVEntity';
import { selectCurrentUser, selectHasCVStatus } from 'store/user/selectors';
import { createCV } from 'store/cv/thunks';
import { selectCurrentCVId } from 'store/cv/selectors';
import { fetchProfile } from 'store/user/thunks';
import CVForm from 'components/CVForm';
import CustomAlert from 'components/CustomAlert';

const Create = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [openSnack, setOpenSnack] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const currentCVId = useSelector(selectCurrentCVId);
  const hasCVStatus = useSelector(selectHasCVStatus);
  const initialValues = new CVEntity(currentUser?.fullName || 'cv');

  /**
   * @description user can create only one CV,
   * in this effect we check if user has CV and do redirect
   * */
  useEffect(() => {
    hasCVStatus && history.push('/dashboard');
  }, [hasCVStatus]);

  /**
   * @description redirect to editing the newly created resume
   * */
  useEffect(() => {
    (async () => {
      await dispatch(fetchProfile());
      !isNil(currentCVId) && history.push(`/edit/${currentCVId}`);
    })();
  }, [currentCVId]);

  /**
   * @description this method handles the creation of a new resume
   * */
  const handleSubmit = async (cv: ICV) => {
    const withCreationDate = assoc('creationDate', new Date(Date.now()), cv);
    await dispatch(createCV(withCreationDate));
    setOpenSnack(true);
  };

  return (
    <>
      <CVForm
        submitHandler={handleSubmit}
        initialValues={initialValues}
      />

      <CustomAlert
        content="CV has been created successfully !"
        open={openSnack}
        closeHandler={() => setOpenSnack(false)}
      />
    </>
  );
};

export default Create;
