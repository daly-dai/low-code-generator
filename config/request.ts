import { notification } from 'antd';
import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  RequestConfig,
  RequestError,
} from '@umijs/max';

import { history } from '@umijs/max';

notification.config({
  maxCount: 3,
});

// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  data: any;
  code: number;
  msg?: string;
}

const codeMessage: Record<number, string> = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const LOGIN_CODE = [101503, 401];

// 获取token
const getToken = () => {
  const token = localStorage.getItem('token');
  return token;
};

// 异常处理
const errorHandler = (error: RequestError) => {
  const { message, response, config } = error as AxiosError;
  const { code, msg } = error as unknown as ResponseStructure;

  if (response?.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status } = response;
    notification.error({
      message: errorText,
      description: `请求错误 ${status}: ${config.url}`,
    });

    return Promise.reject(error);
  }

  if (code && !config) {
    // if (code === 401) return Promise.reject(error)
    const errorText = codeMessage[code] || msg || message;
    notification.error({
      message: code,
      description: errorText,
    });

    return Promise.reject(error);
  }

  if (message) {
    notification.error({
      message: '网络异常',
      description: message,
    });

    return Promise.reject(error);
  }

  notification.error({
    message: '网络异常',
    description: '您的网络发生异常，无法连接服务器',
  });

  console.log('errorHandler', error);
  return Promise.reject(error);
};

export const request: RequestConfig = {
  // 请求拦截器
  requestInterceptors: [
    [
      (config: AxiosRequestConfig) => {
        // 拦截请求配置，进行个性化处理。
        const headers = config.headers || {};

        return {
          ...config,
          headers: { Authorization: getToken() || '', ...headers },
        };
      },
      (error: RequestError) => {
        console.log(error, 'requestError');
        return Promise.reject(error);
      },
    ],
  ],
  // 响应拦截器
  responseInterceptors: [
    (response: AxiosResponse) => {
      // 拦截响应数据，进行个性化处理
      const { data }: { data: ResponseStructure } = response;

      // message.error(`${data.msg}！`);
      if (LOGIN_CODE.includes(data.code)) {
        // 未登录
        localStorage.remove('accessToken');
        history.push('/login');
      }

      if (Object.prototype.toString.call(data) === '[object Blob]')
        return response;

      if (data.success || data.code === 200) {
        return response.data;
      }

      // rome-ignore lint/suspicious/noExplicitAny: <explanation>
      const error: any = new Error(data.msg);
      error.name = 'BizError';
      error.message = data.msg;
      error.code = data.code;
      throw error; // 抛出自制的错误
    },
    [(response) => response, (error: RequestError) => errorHandler(error)],
  ],
};
