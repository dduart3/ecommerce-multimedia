import { ILoginData, IRegisterData } from "../interfaces/Auth";

export enum AuthOperationResult {
  SUCCESS = "SUCCESS",
  INVALID_EMAIL_FORMAT = "INVALID_EMAIL_FORMAT",
  NAME_TOO_SHORT = "NAME_TOO_SHORT",
  NAME_TOO_LONG = "NAME_TOO_LONG",
  INVALID_PASSWORD_FORMAT = "INVALID_PASSWORD_FORMAT",
  WRONG_CREDENTIALS = "WRONG_CREDENTIALS",
  EMAIL_IN_USE = "EMAIL_IN_USE",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  INVALID_NAME_FORMAT = "INVALID_NAME_FORMAT",
}

export const AuthErrorMessages = {
  [AuthOperationResult.SUCCESS]: 'Operación exitosa',
  [AuthOperationResult.INVALID_EMAIL_FORMAT]: 'Por favor, ingresa un correo electrónico válido',
  [AuthOperationResult.INVALID_PASSWORD_FORMAT]: 'La contraseña debe tener al menos 6 caracteres, debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial',
  [AuthOperationResult.EMAIL_IN_USE]: 'Este correo electrónico ya se encuentra registrado',
  [AuthOperationResult.USER_NOT_FOUND]: 'Usuario no encontrado',
  [AuthOperationResult.WRONG_CREDENTIALS]: 'Usuario o contraseña incorrectos',
  [AuthOperationResult.NAME_TOO_SHORT]: 'Nombre y apellido deben tener al menos 2 caracteres',
  [AuthOperationResult.NAME_TOO_LONG]: 'Nombre y apellido no pueden tener más de 30 caracteres',
  [AuthOperationResult.INVALID_NAME_FORMAT]: 'Nombre y apellido solo pueden contener letras',
} 

export function validateRegisterData(registerData: IRegisterData): AuthOperationResult {
  const { email, password, firstName, lastName } = registerData;
  
  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  const validateNameResult = validateName(firstName, lastName) ;
  
  if (!isEmailValid) {
    return AuthOperationResult.INVALID_EMAIL_FORMAT;
  }

  if (!isPasswordValid) {
    return AuthOperationResult.INVALID_PASSWORD_FORMAT;
  }

  if (validateNameResult !== AuthOperationResult.SUCCESS) {
    return validateNameResult;
  }
  return AuthOperationResult.SUCCESS;
}

export function validateLoginData(loginData: ILoginData): AuthOperationResult {
  const isEmailValid = validateEmail(loginData.email);
  const isPasswordValid = validatePassword(loginData.password);

  if (!isEmailValid) {
    return AuthOperationResult.INVALID_EMAIL_FORMAT;
  }

  if (!isPasswordValid) {
    return AuthOperationResult.INVALID_PASSWORD_FORMAT;
  }
  
  return AuthOperationResult.SUCCESS;
}

export function validateEmail(email: string): boolean {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return isEmailValid;
}

export function validatePassword(password: string): boolean {
  const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password);
  return isPasswordValid;
}

export function validateName(firstName: string, lastName: string): AuthOperationResult {
  const nameRegex = /^[A-Za-z]+$/;
  
  if (!firstName || firstName.length < 2 || firstName.length > 30) {
    return AuthOperationResult.NAME_TOO_SHORT;
  }

  if (!lastName || lastName.length < 2 || lastName.length > 30) {
    return AuthOperationResult.NAME_TOO_LONG;
  }

  if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
    return AuthOperationResult.INVALID_NAME_FORMAT;
  }

  return AuthOperationResult.SUCCESS;
}

