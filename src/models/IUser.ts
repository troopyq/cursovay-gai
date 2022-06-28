export interface IUser {
  id: string | number;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phone: string;
  date: string;
}

export interface IUserAdmin {
  id: string | number;
  login: string;
  token: string;
}
