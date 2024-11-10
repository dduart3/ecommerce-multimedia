import { ILoginData, IRegisterData } from "../interfaces/Auth";

export enum AuthOperationResult {
  SUCCESS = "SUCCESS",
  INVALID_EMAIL_FORMAT = "INVALID_EMAIL_FORMAT",
  NAME_TOO_SHORT = "NAME_TOO_SHORT",
  NAME_TOO_LONG = "NAME_TOO_LONG",
  INVALID_PASSWORD_FORMAT = "INVALID_PASSWORD_FORMAT",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  EMAIL_IN_USE = "EMAIL_IN_USE",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  INVALID_NAME_FORMAT = "INVALID_NAME_FORMAT",
  UNKNOW_ERROR = "UNKNOWN_ERROR",
  INVALID_PASSWORD_CONFIRMATION = "INVALID_PASSWORD_CONFIRMATION",
}

export const AuthOperationResultMessage = {
  [AuthOperationResult.SUCCESS]: 'Operación exitosa',
  [AuthOperationResult.INVALID_EMAIL_FORMAT]: 'Por favor, ingresa un correo electrónico válido',
  [AuthOperationResult.INVALID_PASSWORD_CONFIRMATION]: 'Las contraseñas no coinciden',
  [AuthOperationResult.INVALID_PASSWORD_FORMAT]: 'La contraseña debe tener al menos 6 caracteres, debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial',
  [AuthOperationResult.EMAIL_IN_USE]: 'Este correo electrónico ya se encuentra registrado',
  [AuthOperationResult.USER_NOT_FOUND]: 'Usuario no encontrado',
  [AuthOperationResult.INVALID_CREDENTIALS]: 'Usuario o contraseña incorrectos',
  [AuthOperationResult.NAME_TOO_SHORT]: 'Nombre y apellido deben tener al menos 2 caracteres',
  [AuthOperationResult.NAME_TOO_LONG]: 'Nombre y apellido no pueden tener más de 30 caracteres',
  [AuthOperationResult.INVALID_NAME_FORMAT]: 'Nombre y apellido solo pueden contener letras',
  [AuthOperationResult.UNKNOW_ERROR]: 'Ha ocurrido un error desconocido, por favor espera unos minutos e inténtalo de nuevo',
} 

export function validateRegisterData(registerData: IRegisterData): AuthOperationResult {
  const { email, password, confirmPassword, firstName, lastName } = registerData;
  
  const validateNameResult = validateName(firstName, lastName) ;
  if (validateNameResult !== AuthOperationResult.SUCCESS){
    return validateNameResult;
  }

  const isEmailValid = validateEmail(email);
  if (!isEmailValid){
    return AuthOperationResult.INVALID_EMAIL_FORMAT;
  }

  const isPasswordValid = validatePassword(password);
  if (!isPasswordValid){
    return AuthOperationResult.INVALID_PASSWORD_FORMAT;
  }

  const isPasswordConfirmed = validatePasswordConfirmation(password, confirmPassword);
  if (!isPasswordConfirmed){
    return AuthOperationResult.INVALID_PASSWORD_CONFIRMATION;
  }
  
  return AuthOperationResult.SUCCESS;
}

export function validateLoginData(loginData: ILoginData): AuthOperationResult {
  const isEmailValid = validateEmail(loginData.email);
  if (!isEmailValid){
    return AuthOperationResult.INVALID_EMAIL_FORMAT;
  }
  
  const isPasswordValid = validatePassword(loginData.password);
  if (!isPasswordValid){
    return AuthOperationResult.INVALID_PASSWORD_FORMAT;
  }
  
  return AuthOperationResult.SUCCESS;
}

function validateEmail(email: string): boolean {
  const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailValidationRegex.test(email);
  return isEmailValid;
}

function validatePassword(password: string): boolean {
  const passwordValidationRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
  const isPasswordValid = passwordValidationRegex.test(password);
  return isPasswordValid;
}

function validatePasswordConfirmation(password: string, confirmPassword: string): boolean {
  return password === confirmPassword;
}

function validateName(firstName: string, lastName: string): AuthOperationResult {
  const nameValidationRegex = /^[A-Za-z]+$/;
  
  if (!firstName || firstName.length < 2 || firstName.length > 30){
    return AuthOperationResult.NAME_TOO_SHORT;
  }
  
  if (!lastName || lastName.length < 2 || lastName.length > 30){
    return AuthOperationResult.NAME_TOO_LONG;
  }
  
  if (!nameValidationRegex.test(firstName) || !nameValidationRegex.test(lastName)){
    return AuthOperationResult.INVALID_NAME_FORMAT;
  }
  
  return AuthOperationResult.SUCCESS;
}