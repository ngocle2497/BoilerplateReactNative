export type FormLoginType = {
  email: string;
  password: string;
};

export interface LoginState {
  loading: boolean;
  count: number;
}
