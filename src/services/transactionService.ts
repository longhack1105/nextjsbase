import axiosClient from '.';

const routerName = process.env.NEXT_PUBLIC_API_1 + '/api/v1';
const transactionService = {
  getDeposit: (
    data: {
      method?: number;
      limit: number;
      page: number;
      keyword?: string;
      MenuKey?: string;
      from?: string | null;
      to?: string | null;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routerName}/Transaction/deposit`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  depositApporve: (
    data: {
      uuid?: string;
      MenuKey?: string;
      approve?: boolean;
      note?: string | null;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routerName}/Transaction/deposit-approve`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  withdrawApporve: (
    data: {
      uuid?: string;
      MenuKey?: string;
      approve?: boolean;
      note?: string | null;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routerName}/Transaction/withdraw-approve`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  getWitdraw: (
    data: {
      method?: number;
      limit: number;
      page: number;
      keyword?: string;
      MenuKey?: string;
      from?: string | null;
      to?: string | null;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routerName}/Transaction/withdraw`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  getTransaction: (
    data: {
      method?: number;
      limit: number;
      page: number;
      keyword?: string;
      MenuKey?: string;
      from?: string | null;
      to?: string | null;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routerName}/Transaction`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  depositHistories: (
    data: {
      method?: number;
      limit: number;
      page: number;
      keyword?: string;
      MenuKey?: string;
      from?: string | null;
      to?: string | null;
      state?: number | null;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routerName}/Transaction/deposit-histories`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  withdrawHistories: (
    data: {
      method?: number;
      limit: number;
      page: number;
      keyword?: string;
      MenuKey?: string;
      from?: string | null;
      to?: string | null;
      state?: number | null;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routerName}/Transaction/withdraw-histories`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  changeBalance: (
    data: {
      amount?: number;
      type: number;
      typeUnclear: number;
      walletType?: string;
      note?: string;
      uuid?: string | null;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routerName}/Members/change-balance`, data, {
      cancelToken: tokenAxios,
      headers: {},
    });
  },
};
export default transactionService;
