const API_VERSION = '/api/v1/';

const ApiEndPoint = {
  LOGIN: '',
  REFRESH_TOKEN: '',
} as const;

const configApi = () => {
  const apiOb: any = {} as any;
  Object.keys(ApiEndPoint).forEach(x => {
    const valueApi = ApiEndPoint[x as keyof typeof ApiEndPoint];
    apiOb[x] = API_VERSION + valueApi;
  });
  return apiOb;
};

type ApiConstantsType<T> = {
  [a in keyof T]: string;
};

export const ApiConstants = configApi() as ApiConstantsType<typeof ApiEndPoint>;
