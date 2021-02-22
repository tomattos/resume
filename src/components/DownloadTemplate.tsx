import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose, isNil } from 'ramda';
import { cvApi } from 'api/services/cv.api';
import { selectDataForTemplate } from 'store/template/selectors';
import { actions } from 'store/template/slice';
import downloadFileFromBase64 from 'utils/downloadFileFromBase64';
import htmlToString from 'utils/htmlToString';
import addMetaToPDF from 'utils/addMetaToPDF';
import findTemplate from 'utils/findTemplate';
import { ICV } from 'models/cv';
import TemplateStorage from 'components/TemplateStorage';

function DownloadTemplate() {
  const hiddenTemplateRef = useRef<HTMLDivElement | null>(null);
  const dataForTemplate: ICV | null = useSelector(selectDataForTemplate);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (!isNil(dataForTemplate)) {
        /*
        * TODO: this is temporary solution,
        * we should wait some time to transform image in template to base64 for generating pdf correctly,
        * needs to be changed to some lifecycle approach
        * */
        setTimeout(async () => {
          await handleDownloadPDF(dataForTemplate.cvName);
          // clear state after downloading pdf is required
          dispatch(actions.dataForTemplateReceived(null));
        }, 300);
      }
    })();
  }, [dataForTemplate]);

  /**
   * @description
   * downloadFromTemplate will findHiddenTemplate by class name,
   * convert HTMLElement to string and make POST request to fetch PDF file,
   * and based on response (content, contentType, name) we will download PDF
   * */
  async function handleDownloadPDF(name: string) {
    const downloadFromTemplate = compose(
      async (str: string) => {
        const data = await cvApi.downloadPDF({ html: str, name });
        downloadFileFromBase64(data);
      },
      htmlToString,
      addMetaToPDF,
      findTemplate
    );

    await downloadFromTemplate(hiddenTemplateRef);
  }

  return (
    <div>
      {
        !isNil(dataForTemplate) &&
          <div
            style={{ visibility: 'hidden' }}
            ref={hiddenTemplateRef}
          >
            <TemplateStorage
              cv={dataForTemplate as ICV}
              forDownload
            />
          </div>
      }
    </div>
  );
}

export default DownloadTemplate;
