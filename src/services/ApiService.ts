import { HttpService } from "./HttpService";
import { ActionRequest, MutateRequest, SearchRequest } from "@/interfaces";

import { injectable } from "inversify";
import { AxiosRequestConfig } from "axios";
import "reflect-metadata";
import { SearchResponse } from "@/interfaces/search";
import { MutateResponse } from "@/interfaces/mutate";
import { ActionResponse } from "@/interfaces/action";

export interface IApiService<T> {
  search(searchRequest: SearchRequest): Promise<SearchResponse<T>>;
  mutate(mutateRequest: MutateRequest[]): Promise<MutateResponse<T>>;
  executeAction(actionRequest: ActionRequest): Promise<ActionResponse>;
}

export
@injectable()
class ApiService<T> extends HttpService implements IApiService<T> {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  protected async request<ResponseType>(
    config: AxiosRequestConfig,
  ): Promise<ResponseType> {
    try {
      const response = await this.axiosInstance(config);
      return response.data;
    } catch (error) {
      console.error(
        `API Request failed: ${config.method} ${config.url}`,
        error,
      );
      throw error;
    }
  }

  public async search(search: SearchRequest): Promise<SearchResponse<T>> {
    return this.request<SearchResponse<T>>({
      method: "POST",
      url: "/search",
      data: { search },
    });
  }

  public async mutate(mutations: MutateRequest[]): Promise<MutateResponse<T>> {
    return this.request<MutateResponse<T>>({
      method: "POST",
      url: "/mutate",
      data: { mutate: mutations },
    });
  }

  public async executeAction(
    actionRequest: ActionRequest,
  ): Promise<ActionResponse> {
    return this.request<ActionResponse>({
      method: "POST",
      url: `/actions/${actionRequest.action}`,
      data: actionRequest.params,
    });
  }
}
