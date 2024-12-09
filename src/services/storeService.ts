import axiosClient from ".";

const routeName = process.env.NEXT_PUBLIC_API_1 + "/Shops";

const storeService = {
  getAll: (
    data: {
      MenuKey?: string;
      limit: number;
      page: number;
      keyword?: string | null;
      state: number | null;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/list`, data, {
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
  changeFollow: (
    data: {
      uuid?: string;
      count?: number;
      MenuKey?: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/change-flower`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || "",
      },
    });
  },
  changeLevel: (
    data: {
      uuid?: string;
      levelUuid?: string;
      MenuKey?: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/change-level`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || "",
      },
    });
  },
  rating: (
    data: {
      uuid: string;
      rating?: string;
      MenuKey?: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.put(`${routeName}/${data.uuid}/rating`, null, {
      params: data,
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
  shoppingGoodsDetail: (
    data: {
      MenuKey?: string;
      uuid?: string | null;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/shopping-goods/${data?.uuid}`, data, {
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
  changeSuggest: (
    data: {
      uuid?: number;
      state?: number;
      MenuKey?: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.put(
      `${routeName}/shopping-goods/${data?.uuid}/suggest`,
      data,
      {
        cancelToken: tokenAxios,
        headers: {
          MenuKey: data.MenuKey || "",
        },
      }
    );
  },
  changeItem: (
    data: {
      uuid?: number;
      state?: number;
      MenuKey?: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.put(
      `${routeName}/shopping-goods/${data?.uuid}/item-type`,
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
    return axiosClient.put(
      data?.state == 2
        ? `${routeName}/censorships/${data?.uuid}/refuse-state`
        : `${routeName}/censorships/${data?.uuid}/accept-state`,
      data,
      {
        cancelToken: tokenAxios,
        headers: {
          MenuKey: data.MenuKey || "",
        },
      }
    );
  },
  paymentProcedureList: (
    data: {
      limit: number;
      page: number;
      keyword?: string;
      state?: number;
      timeSubmitFrom?: string | null;
      timeSubmitTo?: string | null;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/payment-procedure-list`, data, {
      cancelToken: tokenAxios,
      // headers: {
      //   MenuKey: data.MenuKey || "",
      // },
    });
  },
  detail: (
    data: {
      uuid?: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.get(`${routeName}/${data?.uuid}`, {
      cancelToken: tokenAxios,
      // headers: {
      //   MenuKey: data.MenuKey || "",
      // },
    });
  },
  detailCensorships: (
    data: {
      uuid?: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.get(`${routeName}/censorships/${data?.uuid}`, {
      cancelToken: tokenAxios,
      // headers: {
      //   MenuKey: data.MenuKey || "",
      // },
    });
  },
};

export default storeService;
