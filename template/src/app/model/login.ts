export type FormLoginType = {
  name: string;
  password: string;
  rePassword: string;
};

export interface LoginState {
  loading: boolean;
  count: number;
}
