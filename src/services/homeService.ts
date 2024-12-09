import axiosClient from '.';

const routeName = process.env.NEXT_PUBLIC_API_1 + '/StatisticalControler';
const routeDevName = process.env.NEXT_PUBLIC_API_1 + '/api/v1';
const homeService = {
  statistical: (data: {}, tokenAxios?: any) => {
    var link = `${routeDevName}`;
    return axiosClient.get(`${link}/Statistical/overview`, {
      params: data,
      cancelToken: tokenAxios,
    });
  },
  requestWithdraw: (data: {}, tokenAxios?: any) => {
    var link = `${routeName}/request-withdraw`;
    return axiosClient.get(link, {
      cancelToken: tokenAxios,
      // headers: {
      //   MenuKey: data.MenuKey || "",
      // },
    });
  },
  topShop: (data: {}, tokenAxios?: any) => {
    var link = `${routeName}/top-shop`;
    return axiosClient.get(link, {
      params: data,
      cancelToken: tokenAxios,
      // headers: {
      //   MenuKey: data.MenuKey || '',
      // },
    });
  },
};

export default homeService;
