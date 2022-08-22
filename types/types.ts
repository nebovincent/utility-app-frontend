import { MouseEventHandler, ReactNode } from "react";

export interface Props {
  onSubmit?: any;
  onChange?: any;
  value?: any;
  onFocus?: any;
  onBlur?: any;
  children?: React.ReactNode;
  className?: {};
  onClick?: any;
  currencyOptions?: string[]; // coming from currency converter
  selectedCurrency?: string; // coming from currency converter
  onChangeCurrency?: any; // coming from currency converter
  amount?: number; // coming from currency converter
  onChangeAmount?: any; // coming from currency converter
  onSaveTodo?: (e: Todo) => void; // coming from addTodo
  onSaveNote?: (e: Note) => void; // coming from addNotes
  allUsers?: allUsersType[];
  user?: editUserType;
  note?: {
    id?: string;
    note?: string;
  };
  todo?: {
    id?: string;
    name?: string;
    description?: string;
    date?: Date;
  };
  allFetchedTodos?: fetchedTodos[];
  onDeleteTodo?: (e: any) => void;
  onDeleteUser?: (e: any) => void;
  onActivateUser?: (e: any) => void;
  onDeactivateUser?: (e: any) => void;
  onMakeUserAdmin?: (id: any, role: any) => void;
  src?: string;
  width?: string;
  quality?: string;
}

export interface Todo {
  user_id?: string;
  name?: string;
  description?: string;
  date?: Date;
}

export interface Note {
  user_id?: string;
  note?: string;
}

export interface RegistrationDetails {
  name?: string;
  email?: string;
  username?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  address?: string;
  password?: string;
}

export interface allUsersType {
  _id?: string;
  name?: string;
  email?: string;
  username?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  address?: string;
  password?: string;
  role?: string;
  isActivated?: boolean;
  __v?: number;
  profilePicture?: string;
} // coming from Auth/Admin/Users

export interface editUserType {
  id?: string;
  name?: string;
  email?: string;
  username?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  address?: string;
} // coming from Pages/Auth/Admin/edit-user

export interface userLoginDetails {
  emailOrUserName?: string;
  password?: string;
}

export interface fetchedTodos {
  _id?: string;
  user_id?: string;
  name?: string;
  description?: string;
  date?: Date;
}

export interface fetchedNotes {
  _id?: string;
  user_id?: string;
  note?: string;
}

export interface authUserProfileDetails {
  name?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: Date;
  profilePicture: string;
}
