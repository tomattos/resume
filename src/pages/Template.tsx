import React from 'react';
import { useParams } from 'react-router';
import { ICV } from 'models/cv';
import { IURLIdParams } from 'models/urlParams';
import TemplateStorage from 'components/TemplateStorage';
import useCurrentCV from 'hooks/useCurrentCV';
import Page from 'components/Page';
import { fetchCVForDownloadPDF } from 'store/template/thunks';
import DownloadCVIcon from 'components/DownloadCVIcon';

function TemplateContent() {
  const { id } = useParams<IURLIdParams>();
  const currentCV = useCurrentCV(Number(id));

  return <TemplateStorage cv={currentCV as ICV} />;
}

function Template() {
  const { id } = useParams<IURLIdParams>();

  return (
    <Page
      component={<TemplateContent />}
      title="Preview"
      renderTitleTools={() => (
        <DownloadCVIcon toDispatch={fetchCVForDownloadPDF(Number(id))} />
      )}
    />
  );
}

export default Template;
