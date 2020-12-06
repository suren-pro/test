import { Company } from './company.model';
import { Login } from './login.model';
import { Test } from './test.model';

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  login: Login;
  phone: string;
  role: string;   // 'admin' or 'user'
  tests?: Test[];
  profilePic?: string;
  // company?: Company;
}
