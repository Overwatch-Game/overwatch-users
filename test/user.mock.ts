import { UserRole } from '../src/user/enum/user-role.enum';

export const userMockByEmail = {
  id: 5,
  email: 'diego@mail.com',
  password: 'password',
};

export const userMock = {
  id: 5,
  firstName: 'Diego 2',
  lastName: 'Sogamoso 2',
  email: 'diego@mail.com',
  phone: '3223344323',
  nickname: 'jeik321-x2',
  isEnabled: true,
  password: 'password',
  role: UserRole.ADMIN,
};

export const userMockEntity = {
  id: 5,
  firstName: 'Diego 2',
  lastName: 'Sogamoso 2',
  email: 'diego@mail.com',
  phone: '3223344323',
  nickname: 'jeik321-x2',
  isEnabled: true,
  password: 'password',
  roleId: 1,
};

export const userMockRead = {
  id: 5,
  firstName: 'Diego 2',
  lastName: 'Sogamoso 2',
  email: 'diego@mail.com',
  phone: '3223344323',
  nickname: 'jeik321-x2',
  isEnabled: true,
};
