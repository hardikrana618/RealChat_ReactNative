import axios, {AxiosRequestConfig} from 'axios';
import {Alert} from 'react-native';

import {generateApiHeader} from './helper';
import {PageName, Variables} from '@/config';
import {setAsyncValue} from '@/utils';

export const API = axios.create({
  baseURL: Variables.BASEURL,
  timeout: 10000,
});

// Handle Cookie manualy in header of request
API.defaults.withCredentials = false;

API.interceptors.request.use(
  async config => {
    const auth = await generateApiHeader();
    config.headers = Object.assign(config.headers, auth);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

API.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject({
      message: parseServerErrorText(error),
      data: error?.data,
      status: parseServerErrorStatus(error),
      url: error?.config?.url,
    });
  },
);

// any error message from server will be parsed here
const parseServerErrorText = (error: any): string => {
  return error?.response?.data?.message || error?.message;
};

// any error message from server will be parsed here
const parseServerErrorStatus = (error: any): number => {
  return (
    error?.status || error?.response?.status || error?.response?.data?.code
  );
};

const sessionTimeOut = () => {
  //TODO: Handle session expire once parent login flow is set remove it
  Alert.alert(
    'Session Expired',
    'Your session has ended and for security reasons, we request you to login again',
    [
      {
        text: 'Login again',
        onPress: async () => {
          setAsyncValue(Variables.asyncKeys.USER_TOKEN, null);
        },
      },
    ],
  );
};

/**
 * Handle server errors.
 *
 * @param {any} error - HTTP error from the api response.
 * @returns
 */
const handleServerErrors = async (error: any) => {
  const status = error?.status;
  const message = error?.message ?? 'Something went wrong!';
  switch (status) {
    // If status code is 401 or 403 then either we can refresh the token or we can just logout the user.
    case 401:
    case 403:
      sessionTimeOut();
      return Promise.reject({message: message, status: status});
    case 502: // If status code is 502 then it would be the bad gateway error
      return Promise.reject({
        message: 'bad gateway error',
        status: status,
      });
    default: // If none of above then simply throw the error which we got.
      return Promise.reject({message: message, status: status});
  }
};

export const Request = async (props: RequestProps) => {
  const {url, method, data, formdata, config} = props;
  try {
    var payload: any;
    if (method === 'post') {
      if (formdata && formdata && typeof formdata === 'object') {
        payload = new FormData();
        Object.keys(formdata).forEach(async (item, index, arr) => {
          payload.append(item, formdata[item]);
        });
      } else {
        payload = data;
      }
    }
    const response = await API[method](
      url,
      method === 'get' ? {params: data} : payload,
      config,
    );
    return response.data;
  } catch (e) {
    const res = await handleServerErrors(e);
    return res;
  }
};

interface RequestProps {
  url: string;
  method: 'get' | 'post';
  data?: any;
  formdata?: Object;
  config?: AxiosRequestConfig<any>;
}

export default API;
