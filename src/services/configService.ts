import axiosClient from '.';

const routerName = process.env.NEXT_PUBLIC_API_1 + '/api/v1/Configuration';

const configService = {
  solcial: (data?: {}, tokenAxios?: any) => {
    var link = `${routerName}/social`;
    return axiosClient.get(link, {
      cancelToken: tokenAxios,
      // headers: {
      //   MenuKey: data.MenuKey || "",
      // },
    });
  },
  configSocial: (
    data: {
      id?: Number;
      link: string;
    }[],
    tokenAxios?: any,
  ) => {
    var link = `${routerName}/config-social`;
    return axiosClient.post(link, data, {
      cancelToken: tokenAxios,
      // headers: {
      //   MenuKey: data.MenuKey || "",
      // },
    });
  },
  getConfigFinance: (data?: {}, tokenAxios?: any) => {
    var link = `${routerName}/config-finance/get`;
    return axiosClient.get(link, {
      cancelToken: tokenAxios,
      // headers: {
      //   MenuKey: data.MenuKey || "",
      // },
    });
  },
  setConfigFinance: (
    data: {
      depositMin: number;
      depositMax: number;
      withdrawnActive: boolean;
      withdrawnMin: number;
      withdrawnMax: number;
      withdrawnTurnPerDay: number;
      withdrawnTimeStart?: string;
      withdrawnTimeEnd?: string;
    },
    tokenAxios?: any,
  ) => {
    var link = `${routerName}/config-finace`;
    return axiosClient.post(link, data, {
      cancelToken: tokenAxios,
      // headers: {
      //   MenuKey: data.MenuKey || "",
      // },
    });
  },
  getConfigWallet: (data?: {}, tokenAxios?: any) => {
    var link = `${routerName}/config-wallet/get`;
    return axiosClient.post(link, data, {
      cancelToken: tokenAxios,
      // headers: {
      //   MenuKey: data.MenuKey || "",
      // },
    });
  },
  setConfigWallet: (
    data: {
      id: Number;
      name: string;
      address: string;
    }[],
    tokenAxios?: any,
  ) => {
    var link = `${routerName}/config-wallet`;
    return axiosClient.post(link, data, {
      cancelToken: tokenAxios,
      // headers: {
      //   MenuKey: data.MenuKey || "",
      // },
    });
  },
  getCurrencies: (
    data?: {
      keyword?: string | null;
      page?: Number | null;
      pageSize?: Number | null;
    },
    tokenAxios?: any,
  ) => {
    var link = `${routerName}/currencies`;
    return axiosClient.get(link, {
      params: data,
      cancelToken: tokenAxios,
      // headers: {
      //   MenuKey: data.MenuKey || "",
      // },
    });
  },
};

export default configService;
