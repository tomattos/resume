import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { isNil } from 'ramda';
import { useHistory } from 'react-router';
import useQuery from 'hooks/useQuery';
import { cvApi } from 'api/services/cv.api';
import { ICV } from 'models/cv';
import Loading from 'components/Loading';
import TemplateStorage from 'components/TemplateStorage';
import { actions } from 'store/template/slice';
import DownloadCVIcon from 'components/DownloadCVIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(6)}px 0`,
  },
  downloadWrap: {
    textAlign: 'right'
  }
}));

function PublicTemplate() {
  const history = useHistory();
  const query = useQuery();
  const token = query.get('token') as string;
  const classes = useStyles();
  const [cv, setCV] = useState<ICV>();

  useEffect(() => {
    (async () => {
      try {
        const { jsonData } = await cvApi.fetchPublicCVForPublicTemplate({ token });

        setCV(jsonData as ICV);
      } catch {
        history.push('/login');
      }
    })();
  }, [token]);

  return (
    <div className={classes.root}>
      <Container className={classes.downloadWrap}>
        <DownloadCVIcon toDispatch={actions.dataForTemplateReceived(cv as ICV)} />
      </Container>
      {isNil(cv) ? <Loading /> : <TemplateStorage cv={cv} />}
    </div>
  );
}

export default PublicTemplate;
