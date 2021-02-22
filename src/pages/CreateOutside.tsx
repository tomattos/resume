import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { assoc } from 'ramda';
import * as Yup from 'yup';
import { ICV } from 'models/cv';
import { CVEntity } from 'entities/CVEntity';
import { createCVForNonExistingUser } from 'store/cv/thunks';
import CVForm from 'components/CVForm';
import CustomAlert from 'components/CustomAlert';
import { useHistory } from 'react-router';

const CreateOutside = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [openSnack, setOpenSnack] = useState(false);
  const initialValues = new CVEntity('cv');
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email!').required('Required')
  });

  /**
   * @description this method handles the creation of a new resume
   * */
  const handleSubmit = async (cv: ICV) => {
    const withCreationDate = assoc('creationDate', new Date(Date.now()), cv);
    await dispatch(createCVForNonExistingUser(withCreationDate));
    setOpenSnack(true);
    history.push('/folders/root');
  };

  return (
    <>
      <CVForm
        submitHandler={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      />

      <CustomAlert
        content="CV has been created successfully !"
        open={openSnack}
        closeHandler={() => setOpenSnack(false)}
      />
    </>
  );
};

export default CreateOutside;
