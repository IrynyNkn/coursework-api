export const jwtSecret = process.env.JWT_SECRET;

export const roles = ['user', 'manager', 'admin'];

export const apiUrl = 'http://localhost:5050';

export type UserRoleLabelType = 'USER' | 'ADMIN' | 'MANAGER';
export type UserRoleType = 'user' | 'admin' | 'manager';

export const UserRoles: {[key in UserRoleLabelType]: UserRoleType} = {
  USER: 'user',
  ADMIN: 'admin',
  MANAGER: 'manager'
}