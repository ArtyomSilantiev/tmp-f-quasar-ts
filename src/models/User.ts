import axios, { AxiosResponse } from 'axios';
import Form from '@/lib/form';

/*
  H
*/

export enum UserRole {
  Guest = 'guest',
  User = 'user',
  Admin = 'admin'
}

export interface User {
  id: string;
  role: UserRole;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  createdAt: Date;
  isActivated: boolean;
}

export interface UserAuthInfo {
  isAuth: boolean;
  user: User;
}

export interface UserFetchParams {
  page?: string | number;
  pageSize?: string | number;
  sortBy?: string | null;
  sortDesc?: string | null;
  // filter's
  id?: string | null;
  email?: string | null;
  role?: string | null;
  name?: string | null;
}

export interface UserFetchResult {
  page: number;
  size: number;
  rows: User[];
  totalRows: number;
}

/*
  API
*/

export function getById (userId: number | string): Promise<AxiosResponse<User>> {
  return axios.get('/api/user/byid/' + userId);
}

export async function getAuthInfo (): Promise<AxiosResponse<UserAuthInfo>> {
  return {
    data: {
      isAuth: true,
      user: {
        id: '1',
        role: UserRole.Admin,
        email: 'admin@example.com',
        firstName: 'Admin',
        lastName: 'Power'
      }
    }
  } as AxiosResponse;
  // return axios.get('/api/user');
}

export function logout (): Promise<AxiosResponse<unknown>> {
  return axios.post('/api/user/logout');
}

export function getResetPasswordCodeInfo (resetCode: string): Promise<AxiosResponse<unknown>> {
  return axios.get('/api/user/reset_password_info?code=' + resetCode);
}

export function adminFetchUsers (params?: UserFetchParams): Promise<AxiosResponse<UserFetchResult>> {
  return axios.get('/api/admin/user/list', { params: params || null });
}

export function adminGetUserById (userId: string): Promise<AxiosResponse<User>> {
  return axios.get('/api/admin/user/byid/' + userId);
}

/*
  FORMS
*/

export class FormUserLogin extends Form <Promise<AxiosResponse<{
  token: string;
  user: User;
}>>> {
  public model = {
    email: '',
    password: ''
  };
  protected async submitAction () {
    return {
      data: {
        token: Date.now().toString(36),
        user: {
          id: '1',
          role: UserRole.Admin,
          email: 'admin@example.com',
          firstName: 'Admin',
          lastName: 'Power'
        }
      }
    } as AxiosResponse;
    // return axios.post('/api/user/login', this.model);
  }
}

export class FormUserCreate extends Form <Promise<AxiosResponse<unknown>>> {
  public model = {
    email: '',
    password: '',
    passwordConfirmation: '',
    city: '',
    recaptchaToken: ''
  };
  protected submitAction () {
    return axios.post('/api/user/post', this.model);
  }
}

export class FormUserRequestPasswordResetLink extends Form <Promise<AxiosResponse<unknown>>> {
  public model = {
    email: ''
  };
  protected submitAction () {
    return axios.post('/api/user/request_password_reset_link', this.model);
  }
}

export class FormUserResetPassword extends Form <Promise<AxiosResponse<unknown>>> {
  public model = {
    resetPasswordCode: '',
    password: '',
    passwordConfirmation: ''
  };
  protected submitAction () {
    return axios.post('/api/user/reset_password', this.model);
  }
}

export class FormUserUploadAvatar extends Form <Promise<AxiosResponse<unknown>>> {
  public model = {
    avatarFile: new Blob()
  };
  protected submitAction () {
    const form = new FormData();
    form.append('avatarFile', this.model.avatarFile);
    return axios.post('/api/user/upload_avatar', form);
  }
}

export class FormUserPasswordChange extends Form <Promise<AxiosResponse<unknown>>> {
  public model = {
    oldPassword: '',
    newPassword: '',
    newPasswordConfirmation: ''
  };
  protected submitAction () {
    return axios.post('/api/user/change_password', this.model);
  }
}

export class FormUserSettingsUpdate extends Form <Promise<AxiosResponse<unknown>>> {
  public model = {
    firstName: '',
    lastName: '',
    city: ''
  };
  protected submitAction () {
    return axios.post('/api/user/settings_update', this.model);
  }
}

export class FormAdminUserChange extends Form <Promise<AxiosResponse<unknown>>> {
  public model = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    city: ''
  };
  protected submitAction () {
    return axios.post('/api/admin/user/change', this.model);
  }
}
