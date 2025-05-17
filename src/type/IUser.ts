export interface User {
  name: string;
  email: string;
  userType:string;
}

export interface IChangePassword{
  oldPassword:string;
  newPassword:string;
} 