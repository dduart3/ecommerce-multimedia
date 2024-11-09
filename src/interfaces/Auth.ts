export interface IRegisterData {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
}

export interface ILoginData {
    email: string;
    password: string;
}