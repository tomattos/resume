export interface ICV {
  [key: string]: any;
  creationDate?: Date;
  cvName: string;
  jobTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  skype: string;
  phone: string;
  professionalSummary: string;
  skills: [];
  programmingLanguages: [];
  frameworksAndLibraries: [];
  technologiesAndDatabases: [];
  certifications: string;
  vcs: [];
  others: [];
  os: [];
  education: IEducation[];
  socialLinks: ISocialLink[];
  languages: ILanguage[];
  hobby: string;
  projects: IProject[];
}

export interface ICVDocument {
  jsonData: ICV;
  id: number;
  userId: number;
  folderId: number;
  original: boolean;
  accessLevel: AccessLevel;
}

export interface IEducation {
  school: string;
  degree: string;
  educationStartDate: Date;
  educationEndDate: Date;
}

export interface ISocialLink {
  link: string;
  label: string;
}

export interface ILanguage {
  language: string;
  spoken: Level | undefined;
  written: Level | undefined;
}

export interface IProject {
  name: string;
  country: string;
  projectStartDate: Date;
  projectEndDate: Date;
  projectDescription: string;
  position: string;
  responsibilities: string;
  tools: [];
}

export type Template = IProject | ISocialLink | IEducation | ILanguage;
export type Level =
  | 'beginner'
  | 'elementary'
  | 'intermediate'
  | 'upper-intermediate'
  | 'advanced'
  | 'proficiency'
  | '';
export type AccessLevel = 'PUBLIC' | 'PRIVATE';
