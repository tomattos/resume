import fileDownload from 'js-file-download';

type Props = {
  content: string,
  contentType: string,
  name: string
};

const downloadFileFromBase64 = ({
  content,
  contentType = 'application/pdf',
  name = 'template.pdf'
}: Props): void => {
  fetch(`data:${contentType};base64,${content}`)
    .then((res) => res.blob())
    .then((res) => {
      fileDownload(res, name);
    });
};

export default downloadFileFromBase64;
