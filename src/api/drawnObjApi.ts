import { DrawnObject, ResponseTypeCustom } from '@/utils/types';
import { AxiosResponse } from 'axios';
import axiosClient from './axiosClient';

class DrawnObjApi {
  addOne({
    value,
    paperId,
  }: {
    value: string;
    paperId: string;
  }): Promise<AxiosResponse<ResponseTypeCustom>> {
    const url = `drawnObj/${paperId}/add`;
    return axiosClient.post(url, {
      value,
    });
  }

  getAllByPaperId(
    paperId: string,
  ): Promise<
    AxiosResponse<ResponseTypeCustom & { drawnObjList: DrawnObject[] }>
  > {
    const url = `drawnObj/${paperId}/all`;
    return axiosClient.get(url);
  }
}

const drawnObjApi = new DrawnObjApi();
export default drawnObjApi;
