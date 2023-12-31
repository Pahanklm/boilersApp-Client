import { FieldErrors, UseFormRegister } from 'react-hook-form'

export interface IInputs {
  name: string
  email: string
  password: string
}

export interface IAuthPageInput {
  register: UseFormRegister<IInputs>
  errors: FieldErrors<IInputs>
}

export interface ISignUpFx {
  url: string
  username: string
  password: string
  email: string
  registrationCity: string
  registrationStreet: string
}

export interface ISignInFx {
  url: string
  username: string
  password: string
}

export interface IUser {
  username: string
  userID: number | string
  email: string
}