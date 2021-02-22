import {
  ICV,
  IEducation,
  ILanguage,
  IProject,
  ISocialLink,
  Level,
} from '../models/cv';

export class ProjectEntity implements IProject {
  country: string = '';
  name: string = '';
  position: string = '';
  projectDescription: string = '';
  projectEndDate: Date = new Date(Date.now());
  projectStartDate: Date = new Date(Date.now());
  responsibilities: string = '';
  tools: [] = [];
}

export class SocialLinksEntity implements ISocialLink {
  label: string = '';
  link: string = '';
}

export class LanguageEntity implements ILanguage {
  language: string = '';
  spoken: Level = '';
  written: Level = '';
}

export class EducationEntity implements IEducation {
  degree: string = '';
  educationEndDate: Date = new Date(Date.now());
  educationStartDate: Date = new Date(Date.now());
  school: string = '';
}

export class CVEntity implements ICV {
  dateOfBirth: Date = new Date(Date.now());
  education: IEducation[] = [new EducationEntity()];
  email: string = '';
  firstName: string = '';
  jobTitle: string = '';
  lastName: string = '';
  phone: string = '';
  skype: string = '';
  certifications: string = '';
  professionalSummary: string = '';
  os: [] = [];
  others: [] = [];
  vcs: [] = [];
  skills: [] = [];
  frameworksAndLibraries: [] = [];
  programmingLanguages: [] = [];
  technologiesAndDatabases: [] = [];
  projects: IProject[] = [new ProjectEntity()];
  socialLinks: ISocialLink[] = [new SocialLinksEntity()];
  languages: ILanguage[] = [new LanguageEntity()];
  hobby: string = '';
  [key: string]: any;

  constructor(public cvName: string) {}
}
