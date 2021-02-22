import React from 'react';
import { Container, Fade, Grid } from '@material-ui/core';
import { equals } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from 'store/template/slice';
import {
  selectAllTemplates,
  selectCurrentTemplate,
} from 'store/template/selectors';
import { ITemplate } from 'models/template';
import TemplateItem from 'components/TemplateItem';

function Templates() {
  const dispatch = useDispatch();
  const currentTemplate = useSelector(selectCurrentTemplate);
  const templates = useSelector(selectAllTemplates);

  function handleChangeActiveTemplate(template: ITemplate) {
    dispatch(actions.changeCurrentTemplate(template));
  }

  return (
    <Container>
      <Grid
        container
        spacing={2}
      >
        {templates.map((template) => (
          <Fade
            key={template.id}
            in={Boolean(template)}
          >
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              lg={2}
            >
              <TemplateItem
                changeHandler={() => handleChangeActiveTemplate(template)}
                checked={equals(currentTemplate.id, template.id)}
                templateId={template.id}
                name={template.name}
              />
            </Grid>
          </Fade>
        ))}
      </Grid>
    </Container>
  );
}

export default Templates;
