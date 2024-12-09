import axiosClient from '.';

const routeName = process.env.NEXT_PUBLIC_API_BASE_1 + '/api/v1/Statistical';
const routeNameTrande = process.env.NEXT_PUBLIC_API_BASE_1 + '/api/v1/Transaction';

const statisticalService = {
  statistical: (data?: {}, tokenAxios?: any) => {
    return axiosClient.get(`${routeName}`, {
      cancelToken: tokenAxios,
    });
  },
  list: (
    data: {
      from?: string | null;
      to?: string | null;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.get(`${routeName}/list`, {
      params: data,
      cancelToken: tokenAxios,
    });
  },
  trade: (data?: {}, tokenAxios?: any) => {
    return axiosClient.get(`${routeName}/trade`, {
      params: data,
      cancelToken: tokenAxios,
    });
  },
  tradeList: (
    data: {
      from?: string | null;
      to?: string | null;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.get(`${routeName}/trade/list`, {
      params: data,
      cancelToken: tokenAxios,
    });
  },
  profit: (data?: {}, tokenAxios?: any) => {
    return axiosClient.get(`${routeName}/profit`, {
      params: data,
      cancelToken: tokenAxios,
    });
  },
  profitList: (
    data: {
      limit?: number | null;
      page?: number | null;
      from?: string | null;
      to?: string | null;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.get(`${routeName}/profit/list`, {
      params: data,
      cancelToken: tokenAxios,
    });
  },
  finance: (data?: {}, tokenAxios?: any) => {
    return axiosClient.get(`${routeName}/finance`, {
      params: data,
      cancelToken: tokenAxios,
    });
  },
  depositHistories: (
    data: {
      limit?: number | null;
      page?: number | null;
      keyword?: string | null;
      from?: string | null;
      to?: string | null;
      method?: number | null;
      state?: number | null;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routeNameTrande}/deposit-histories`, data, {
      cancelToken: tokenAxios,
    });
  },
  withdrawHistories: (
    data: {
      limit?: number | null;
      page?: number | null;
      keyword?: string | null;
      from?: string | null;
      to?: string | null;
      method?: number | null;
      state?: number | null;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routeNameTrande}/withdraw-histories`, data, {
      cancelToken: tokenAxios,
    });
  },
};

export default statisticalService;
