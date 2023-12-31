import { Axios, AxiosResponse } from 'axios';
import axiosClient from './axiosClient';
import { Paper, ResponseTypeCustom } from '@/types/types';

class PaperApi {
  getList(): Promise<
    AxiosResponse<ResponseTypeCustom & { paperList: Paper[] }>
  > {
    const url = 'paper/list';
    return axiosClient.get(url);
  }

  create(
    templateId?: string,
  ): Promise<AxiosResponse<ResponseTypeCustom & { newPaper: Paper }>> {
    const url = 'paper/add';
    return axiosClient.post(url, {
      templateId,
    });
  }

  getOneById(
    paperId: string,
  ): Promise<AxiosResponse<ResponseTypeCustom & { paper: Paper }>> {
    const url = `paper/${paperId}`;
    return axiosClient.get(url);
  }
}

const paperApi = new PaperApi();

export default paperApi;
