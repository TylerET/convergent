export interface Auth0User {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: string;
}

export interface User {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: string;
  events: number[];
  userId?: number;
}
