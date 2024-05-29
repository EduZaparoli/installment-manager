export interface APIResponse<APIResponse> {
  data: APIResponse;
  error?: string;
  message?: string;
  statusCode?: number;
}

export interface AccessToken {
  access_token: string;
  error?: string;
  message?: string;
  statusCode?: number;
}

export interface User {
  email: string;
  password: string;
}

export interface RegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ResetPassword {
  email: string;
  newPassword: string;
}