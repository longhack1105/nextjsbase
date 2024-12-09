import axiosClient from ".";

const routeName = process.env.NEXT_PUBLIC_API_1 + "/Transactions";

const depositService = {
  getDeposit: (
    data: {
      MenuKey?: string;
      limit: number;
      page: number;
      keyword?: string | null;
      state: number | null;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/deposit`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || "",
      },
    });
  },
  getWithdraw: (
    data: {
      MenuKey?: string;
      limit: number;
      page: number;
      keyword?: string | null;
      state: number | null;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/withdraw`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || "",
      },
    });
  },
  getTranfer: (
    data: {
      MenuKey?: string;
      limit: number;
      page: number;
      keyword?: string | null;
      timeFrom?: string | null;
      timeTo?: string | null;
      type?: number | null;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || "",
      },
    });
  },
  changeState: (
    data: {
      uuid?: number;
      state?: number;
      MenuKey?: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/update-state`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || "",
      },
    });
  },
  blackList: (
    data: {
      uuid?: number;
      MenuKey?: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.put(`${routeName}/${data?.uuid}/black-list`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || "",
      },
    });
  },
  storeManager: (
    data: {
      MenuKey?: string;
      limit: number;
      page: number;
      keyword?: string | null;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/management-list`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || "",
      },
    });
  },
  shoppingGoods: (
    data: {
      MenuKey?: string;
      limit: number;
      page: number;
      keyword?: string | null;
      productType?: number | null;
      itemType?: number | null;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/shopping-goods`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || "",
      },
    });
  },
  changeStateGoods: (
    data: {
      uuid?: number;
      state?: number;
      MenuKey?: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.put(
      `${routeName}/shopping-goods/${data?.uuid}/state`,
      data,
      {
        cancelToken: tokenAxios,
        headers: {
          MenuKey: data.MenuKey || "",
        },
      }
    );
  },
  review: (
    data: {
      MenuKey?: string;
      limit: number;
      page: number;
      keyword?: string | null;
      state?: number | null;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/censorships`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || "",
      },
    });
  },
  stateReview: (
    data: {
      MenuKey?: string;
      uuid: string;
      state?: number;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/deposit/change-state`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || "",
      },
    });
  },
  stateReviewWithdraw: (
    data: {
      MenuKey?: string;
      uuid: string;
      state?: number;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/withdraw/change-state`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || "",
      },
    });
  },
};

export default depositService;
