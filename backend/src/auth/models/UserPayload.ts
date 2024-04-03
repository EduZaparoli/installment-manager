export interface UserPayload {
  sub: number;
  email: string;
  password: string;
  iat?: number;
  exp?: number;
}
