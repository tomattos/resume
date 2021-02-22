import { Role } from './auth';

export interface IUser {
  email: string;
  fullName: string;
  id: number;
  userRole: Role;
  hasCv: boolean;
}
