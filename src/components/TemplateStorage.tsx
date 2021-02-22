import React from 'react';
import { useSelector } from 'react-redux';
import { isNil } from 'ramda';
import { Container } from '@material-ui/core';
import { selectCurrentTemplate } from 'store/template/selectors';
import { ITemplate, ITemplateProps } from 'models/template';
import { ICV } from 'models/cv';
import DefaultTemplate from './templates/DefaultTemplate';
import Loading from './Loading';

type Props = {
  cv: ICV;
  forDownload?: boolean;
};

function TemplateStorage({ cv, forDownload = false }: Props) {
  const currentTemplate: ITemplate = useSelector(selectCurrentTemplate);
  const Templates = [DefaultTemplate];
  const ActiveTemplate: ({ data }: ITemplateProps) => React.ReactElement =
    Templates[currentTemplate.id];

  return (
    <Container>
      {isNil(cv) ? <Loading /> : <ActiveTemplate
        forDownload={forDownload}
        data={cv}
      />}
    </Container>
  );
}

export default TemplateStorage;
