import axiosClient from '.';

const routeName = process.env.NEXT_PUBLIC_BASE_API_1 + '/Account';

const exampleService = {
  example: (data?: any, tokenAxios?: any) => {
    return axiosClient.post(`${routeName}`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
};

export default exampleService;
