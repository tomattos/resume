export class FolderEntity {
  name: string = 'untitled folder';
  constructor(public parentId: number) {}
}
