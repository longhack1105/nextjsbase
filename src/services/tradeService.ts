import axiosClient from '.';

const routerName = process.env.NEXT_PUBLIC_API_1 + '/api/v1/Trade';

const tradeService = {
  open: (
    data: {
      limit: number;
      page: number;
      keyword?: string | null;
      from?: string | null;
      to?: string | null;
      symbolCode?: string;
      orderType?: number | null;
    },
    tokenAxios?: any,
  ) => {
    var link = `${routerName}/open`;
    return axiosClient.post(link, data, {
      cancelToken: tokenAxios,
      // headers: {
      //   MenuKey: data.MenuKey || "",
      // },
    });
  },
  close: (
    data: {
      limit: number;
      page: number;
      keyword?: string | null;
      from?: string | null;
      to?: string | null;
      symbolCode?: string;
      orderType?: number | null;
    },
    tokenAxios?: any,
  ) => {
    var link = `${routerName}/close`;
    return axiosClient.post(link, data, {
      cancelToken: tokenAxios,
      // headers: {
      //   MenuKey: data.MenuKey || "",
      // },
    });
  },
  order: (
    data: {
      limit: number;
      page: number;
      keyword?: string | null;
      from?: string | null;
      to?: string | null;
      symbolCode?: string;
      orderType?: number | null;
    },
    tokenAxios?: any,
  ) => {
    var link = `${routerName}/order`;
    return axiosClient.post(link, data, {
      cancelToken: tokenAxios,
      // headers: {
      //   MenuKey: data.MenuKey || "",
      // },
    });
  },
  adjust: (
    data: {
      limit: number;
      page: number;
      keyword?: string | null;
      from?: string | null;
      to?: string | null;
      state?: number | null;
      directionType?: number | null;
    },
    tokenAxios?: any,
  ) => {
    var link = `${routerName}/adjust`;
    return axiosClient.post(link, data, {
      cancelToken: tokenAxios,
      // headers: {
      //   MenuKey: data.MenuKey || "",
      // },
    });
  },
  adjustCancel: (
    data: {
      uuid: string;
    },
    tokenAxios?: any,
  ) => {
    var link = `${routerName}/adjust/cancel/${data.uuid}`;
    return axiosClient.post(link, data, {
      cancelToken: tokenAxios,
      // headers: {
      //   MenuKey: data.MenuKey || "",
      // },
    });
  },
  adjustAdd: (
    data: {
      symbolCode: string;
      directionType: number;
      point: number;
      timeStart: string;
      cycle: number;
      horizontalCycle: number;
      returnCycle: number;
    },
    tokenAxios?: any,
  ) => {
    var link = `${routerName}/adjust/add`;
    return axiosClient.post(link, data, {
      cancelToken: tokenAxios,
      // headers: {
      //   MenuKey: data.MenuKey || "",
      // },
    });
  },
};

export default tradeService;
