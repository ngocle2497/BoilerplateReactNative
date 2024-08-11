export const rxEmail =
  /^[a-zA-Z0-9]+([%^&=+,.\\-][a-zA-Z0-9]+)*@[a-zA-Z]+(\\.[a-zA-Z]+)*(\\.[a-zA-Z]{2,3})$/g;

export const rxPassword =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)(?!.*['"]).{8,}$/;

export const rxNumber = /[^\d]+/g;
