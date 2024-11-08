import { IUser } from "../interfaces/IUser";

export enum OperationResult {
  Success = "OK",
  InvalidEmailFormat = "Formato de correo electrónico inválido",
  NameTooShort = "Nombre y apellido deben tener al menos 2 caracteres",
  NameTooLong = "Nombre y apellido deben tener no pueden tener mas de 30 caracteres",
  InvalidPasswordFormat = "La contraseña debe tener al menos 6 caracteres, debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial"
}

export function validateUserData(userData: Partial<IUser>): OperationResult {
  if (userData.email && validateEmail(userData.email) != OperationResult.Success) {
    return OperationResult.InvalidEmailFormat;
  }

  if (userData.firstName && userData.firstName.length < 2) {
    return OperationResult.NameTooShort;
  }

  if (userData.lastName && userData.lastName.length < 2) {
    return OperationResult.NameTooShort;
  }
  
  return OperationResult.Success;
}

export function validateEmail(email: string): OperationResult {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if(!isEmailValid) return OperationResult.InvalidEmailFormat;
    return OperationResult.Success;
}

export function validatePassword(password: string): OperationResult {
  const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password);
  
  if(!isPasswordValid) return OperationResult.InvalidPasswordFormat
  return OperationResult.Success;
}
