import { requestGet, requestPost } from '@/plugins/request';

export interface DocTableListType {
  pageNum: number;
  pageSize: number;
  searchItem: string;
  typeCode: string;
}

// 获取文档列表
export const getDocTableList = async (params: DocTableListType) => {
  return requestPost('/cityos2-boot/document/page', params, {
    skipErrorHandler: true,
    getResponse: true,
  });
};

interface DocData {
  name: string;
  typeCode: string;
  url: string;
}

// 新增文档数据
export const addDocData = async (
  params: {
    name: string;
    typeCode: string;
    url: string;
  },
  options?: { [key: string]: any },
): Promise<DocData> =>
  requestPost('/cityos2-boot/document/add', params, options);

// 获取用户信息
export const getUserInfo = async () =>
  requestGet('/cityos2-boot/system/current-user', {
    skipErrorHandler: true,
    getResponse: true,
    requestInterceptors: [
      (config) => {
        console.log(config, '9999999');
        return config;
      },
    ],
    responseInterceptors: [
      (response) => {
        console.log(response, 'responseresponse');
        return Promise.resolve(response);
      },
    ],
  });
