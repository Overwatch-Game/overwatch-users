import * as bcrypt from 'bcrypt';

import { UserRole } from '../src/user/enum/user-role.enum';

export const authMock = {
  email: 'diego@mail.com',
  password: 'password',
};

export const authJWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImVtYWlsIjoiZGllZ29AbWFpbC5jb20iLCJpYXQiOjE2OTQ4MTYwMjMsImV4cCI6MTY5NDkwMjQyM30.kj0Cela46NkAxz6oajD5pRkQAGobcbLo2wzL4tGNbos';

export const authReadMock = {
  accessToken: authJWT,
};

export const authSignUpMock = {
  firstName: 'Diego 2',
  lastName: 'Sogamoso 2',
  email: 'diego@mail.com',
  phone: '3223344323',
  nickname: 'jeik321-x2',
  password: 'password',
  role: UserRole.ADMIN,
};

export const userAuthMockRead = {
  id: 5,
  email: 'diego@mail.com',
  password: bcrypt.hashSync('password', 10),
};

export const userAuthMockBadPasswordRead = {
  id: 5,
  email: 'diego@mail.com',
  password: bcrypt.hashSync('1234', 10),
};
