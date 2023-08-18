import {
  CanvasObjectType,
  ResponseTypeCustom,
  TemplateType,
} from '@/types/types';
import axiosClient from './axiosClient';
import { AxiosResponse } from 'axios';

class TemplateApi {
  add(list: CanvasObjectType[], name: string | undefined) {
    let _list = JSON.stringify(list);

    const url = 'template/add';
    return axiosClient.post(url, {
      list: _list,
      name,
    });
  }

  getList(
    page?: number,
    limit?: number,
  ): Promise<AxiosResponse<ResponseTypeCustom & { list: TemplateType[] }>> {
    const url = `template/list`;

    return axiosClient.get(url);
  }
}

const templateApi = new TemplateApi();
export default templateApi;
