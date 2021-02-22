import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { curry, isNil } from 'ramda';
import { IconButton, Tooltip } from '@material-ui/core';
import { RemoveRedEye } from '@material-ui/icons';
import { updateCV } from 'store/cv/thunks';
import { ICV } from 'models/cv';
import { IURLIdParams } from 'models/urlParams';
import { selectHasCVStatus } from 'store/user/selectors';
import { selectCurrentCV, selectCurrentCVId } from 'store/cv/selectors';
import Page from 'components/Page';
import { actions } from 'store/template/slice';
import DownloadCVIcon from 'components/DownloadCVIcon';
import Loading from '../components/Loading';
import useCurrentCV from '../hooks/useCurrentCV';
import CustomAlert from '../components/CustomAlert';
import CVForm from '../components/CVForm';

const EditContent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams<IURLIdParams>();
  const [openSnack, setOpenSnack] = useState(false);
  const currentCV = useCurrentCV(id ? Number(id) : undefined);
  const currentCVId = useSelector(selectCurrentCVId);
  const hasCVStatus = useSelector(selectHasCVStatus);

  /**
   * @description this page responsible
   * 1.for editing your own CV if id in URL params is absent
   * 2. for editing other users CVs,
   * we should block this page and do redirect in case of -> your own CV has not been created and you try to edit it
   * */
  useEffect(() => {
    !hasCVStatus && isNil(id) && history.push('/dashboard');
  });

  const handleSubmit = curry(async (cvId: number, jsonData: ICV) => {
    dispatch(updateCV({ id: cvId, jsonData }));
    setOpenSnack(true);
  });

  return (
    <>
      {currentCV ? (
        <CVForm
          initialValues={currentCV as ICV}
          submitHandler={handleSubmit(currentCVId as number)}
        />
      ) : (
        <Loading />
      )}

      <CustomAlert
        content="CV has been saved successfully !"
        open={openSnack}
        closeHandler={() => setOpenSnack(false)}
      />
    </>
  );
};

function Edit() {
  const history = useHistory();
  const currentCV = useSelector(selectCurrentCV) as ICV;
  const currentCVId = useSelector(selectCurrentCVId);

  function handlePreviewClick(id: number) {
    history.push(`/preview/${id}`);
  }

  return (
    <Page
      component={<EditContent />}
      title="Edit CV"
      renderTitleTools={() => (
        <div>
          <DownloadCVIcon toDispatch={actions.dataForTemplateReceived(currentCV as ICV)} />
          <Tooltip title="Preview CV">
            <IconButton onClick={() => handlePreviewClick(currentCVId as number)}>
              <RemoveRedEye color="secondary" />
            </IconButton>
          </Tooltip>
        </div>
      )}
    />
  );
}

export default Edit;
