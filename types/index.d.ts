import { Dispatch, SetStateAction, ReactNode } from "react";

export interface IFormData {
  [key: string]: string | number;
}

export interface IContextProviderProps {
  children: ReactNode;
}

export interface IQuestionnaireData {
  [key: string]: {
    [key: string]: string;
  };
}

export interface INutritionist {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  createdAt: string;
  photo: string;
  linkToken: string;
  status: number;
}

export interface IFoodItem {
  cals: number;
  carbs: number;
  course: string;
  createdAt: string;
  fat: number;
  id: number;
  image_url: string;
  mealId: string;
  recipeId: number;
  protein: number;
  recipe: {
    id: number;
    calories: number;
    carbohydrates: number;
    carbohydratesPercentage: number;
    createdAt: string;
    fat: number;
    fatPercentage: number;
    id: number;
    image_url: string;
    ingredients: {};
    method: string;
    name: string;
    nutritionistId: number;
    protein: number;
    proteinPercentage: number;
  };
  quantity: number;
  serving: string;
  swapers: any[];
  title: string;
}

export interface IMeal {
  createdAt: string;
  day: number;
  id: number;
  food_items: IFoodItem[];
  programId: number;
  week: number;
}

export interface IProgram {
  cals: number;
  carbs: number;
  consumer_programs: { consumerId: number; programId: number };
  createdAt: string;
  description: string;
  fats: number;
  id: number;
  meals: IMeal[];
  name: string;
  nutritionistId: number;
  preference: string;
  protein: number;
  total_recipes: number;
  weeks: number;
}

export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  photo: string;
  createdAt: string;
  requested_nutritionists: INutritionist[];
  questionnaire: {
    consumerId: number;
    createdAt: string;
    date: string;
    date_of_birth: string;
    email: string;
    height: number;
    home_phone_number: string;
    id: number;
    lowest_height: number;
    lowest_weight: number;
    name: string;
    questionnaire_options: {
      id: number;
      question: string;
      answer: string;
      questionnairyId: number;
      details: string;
      additional_question: string;
      additional_answer: string;
    }[];
    weight: number;
    work_phone_number: string;
  };
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
  program: IProgram;
}

export interface IConsumerDetails {
  waist: number;
  hip: number;
  forearm: number;
  wrist: number;
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
  isUserLoading: boolean;
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
}

export interface IAlert {
  type: string;
  message: string;
}

export interface IAlertProps {
  alerts: IAlert[];
}

export interface IAlertContext {
  setAlerts: Dispatch<SetStateAction<IAlert[]>>;
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

export interface IAxiosError {
  message: string;
}
