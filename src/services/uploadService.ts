import axiosClient from '.';

const routerMedia = process.env.NEXT_PUBLIC_API_UPLOAD

const uploadServices = {
  upload(files: any[]) {
    const dataFile = new FormData();
    files.forEach((file) => {
      return dataFile.append('files', file);
    });

    return axiosClient.post(`${routerMedia}/api/v1/Uploads`, dataFile, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'text/plain',
      },
    });
  },
};

export default uploadServices;
