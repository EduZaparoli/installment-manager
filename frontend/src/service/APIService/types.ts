export interface APIResponse<APIResponse> {
  data: APIResponse;
  message: string;
  status: string;
}

export interface AccessToken {
  access_token: string
}

export interface User {
  email: string;
  password: string;
}