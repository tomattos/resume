import { ICV } from './cv';

export interface ITemplate {
  id: number;
  component: string;
  name: string;
}

export interface ITemplateProps {
  data: ICV | undefined;
  forDownload: boolean;
}
