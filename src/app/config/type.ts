export interface ResponseBase<T> {
  code: number;

  msg?: string | undefined | null;

  data?: T;

  status: boolean;
}
export interface ResponseError {
  data: any;

  status: number;

  header: any;
}

export interface ErrorAxios {
  response?: ResponseError;

  request?: any;

  message?: string;

  config: any;
}
export interface Colors {
  primary: string,
  primaryDarker: string;
  line: string;
  text: string;
  card: string;
  background: string,
  border: string;
  button: string;
  white: string;
  transparent: string;
  lighterGrey: string;
}
export interface FontSize {
  FONT_4: number;
  FONT_5: number;
  FONT_6: number;
  FONT_7: number;
  FONT_8: number;
  FONT_9: number;
  FONT_10: number;
  FONT_11: number;
  FONT_12: number;
  FONT_13: number;
  FONT_14: number;
  FONT_15: number;
  FONT_16: number;
  FONT_17: number;
  FONT_18: number;
  FONT_19: number;
  FONT_20: number;
  FONT_21: number;
  FONT_22: number;
  FONT_23: number;
  FONT_24: number;
  FONT_25: number;
  FONT_26: number;
  FONT_27: number;
  FONT_28: number;
  FONT_29: number;
  FONT_30: number;
  FONT_31: number;
  FONT_32: number;
}
export interface FontFamily {
  primary: string;
  secondary: string
}
export interface Spacing {
  none: number;
  tiny: number;
  smaller: number;
  small: number;
  medium: number;
  mediumPlush: number;
  large: number;
  huge: number;
  massive: number;
}
export interface AppTheme {
  dark: boolean;
  colors: Colors;
  fontSize: FontSize;
  fontFamily: FontFamily;
  spacing: Spacing
}
