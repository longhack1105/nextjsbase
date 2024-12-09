import axiosClient from ".";

// const routeName = process.env.NEXT_PUBLIC_API_BASE + "/api/v1/Notification";
const routeName = process.env.NEXT_PUBLIC_API_1 + "/Notification";

const notifyService = {
  list: (
    data: {
      Limit?: number;
      Page?: number;
      State?: number | null;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.get(`${routeName}/list`, {
      params: data,
      cancelToken: tokenAxios,
    });
  },
  detail: (
    data: {
      uuid: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.get(`${routeName}/${data.uuid}`, {
      params: data,
      cancelToken: tokenAxios,
    });
  },
};

export default notifyService;
