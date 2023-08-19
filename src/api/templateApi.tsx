import {
  CanvasObjectType,
  DrawnObject,
  ResponseTypeCustom,
  TemplateType,
} from '@/types/types';
import axiosClient from './axiosClient';
import { AxiosResponse } from 'axios';

class TemplateApi {
  add(
    list: CanvasObjectType[],
    name: string | undefined,
    description?: string,
  ) {
    let _list = JSON.stringify(list);

    const url = 'template/add';
    return axiosClient.post(url, {
      list: _list,
      name,
      description,
    });
  }

  getList(
    page?: number,
    limit?: number,
  ): Promise<AxiosResponse<ResponseTypeCustom & { list: TemplateType[] }>> {
    const url = `template/list`;

    return axiosClient.get(url);
  }

  getById(templateId: string): Promise<
    AxiosResponse<
      ResponseTypeCustom & {
        template: TemplateType & {
          DrawnObjects: Omit<DrawnObject, 'ChangeLog' | 'PaperId'>[];
        };
      }
    >
  > {
    const url = `template/${templateId}`;
    return axiosClient.get(url);
  }
}

const templateApi = new TemplateApi();
export default templateApi;
