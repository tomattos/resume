import { ICVDocument } from './cv';

export interface IFolder {
  id: number;
  name: string;
  innerFolderList?: IFolder[];
  userCvList?: ICVDocument[];
  parentId?: number;
}

export interface DragAndDropPayload {
  dragProp: any;
  dropProp: any;
}
