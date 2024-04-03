export class User {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export class UserLogin {
  id: number;
  email: string;
  password: string;
}
