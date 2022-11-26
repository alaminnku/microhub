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
  createdAt: string;
  consumer?: {
    activity_level: string;
    allergies: string[];
    bmi: number;
    body_fat: {
      BODY_FAT: number;
      BODY_FAT_PCT: number;
      LEAN_BODY_MASS: number;
    };
    body_frame: string;
    createdAt: string;
    daily_targets: {
      daily_calorie: number;
      daily_carbs: number;
      daily_fat: number;
      daily_protein: number;
    };
    favorite_foods: string[];
    gender: string;
    healthy_weight: number;
    height: number;
    id: number;
    least_favorite_foods: string[];
    preferences: string;
    tdee: number;
    userId: number;
    weight: number;
  };
}

export interface IConsumerDetails {
  gender: string;
  weight: number;
  height: number;
  allergies: string;
  preferences: string;
  activity_level: string;
  favorite_foods: string;
  least_favorite_foods: string;
}

export interface IUserContext {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
}

interface IBooleanStateProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface IMobileMenuProps extends IBooleanStateProps {}

export interface IMobileNavProps extends IBooleanStateProps {}

export interface ISubmitButtonProps {
  text: string;
  isLoading: boolean;
  handleClick: (e: FormEvent<Element>) => Promise<void>;
}

export interface IBackButton {
  url: string;
}
