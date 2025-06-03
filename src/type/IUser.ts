export interface User {
  _id:string;
  name: string;
  email: string;
  userType:string;
}

export interface IChangePassword{
  oldPassword:string;
  newPassword:string;
} 