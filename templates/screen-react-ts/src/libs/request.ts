import { extend } from 'umi-request';
import { isDev, isMock } from '@/utils/env';

const errorHandler = (error: { response: Response }): Promise<Response> => {
  const { response } = error;
  return Promise.reject(response);
};

const request = extend({
  prefix:
    isDev && isMock
      ? ''
      : '',
  errorHandler,
});

request.interceptors.response.use(async (response) => {
  const data = await response.clone().json();
  if (data.success === false) {
    return Promise.reject(response);
  }
  return response;
});

export default request;
