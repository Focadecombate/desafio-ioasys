export interface SignupDTO {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
  role?: string;
}
