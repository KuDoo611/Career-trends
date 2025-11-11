export interface User {
  userCode: string;
  fullName?: string;
  email?: string;
  password?: string;
  role?: string; // 'Admin' | 'User'
  createdAt?: string;
}