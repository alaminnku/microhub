import { Dispatch, SetStateAction, ReactNode } from "react";

export interface IFormData {
  [key: string]: string | number;
}

export interface IContextProviderProps {
  children: ReactNode;
}

export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  photo: string;
  age?: number;
}

export interface IUserContext {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
}
