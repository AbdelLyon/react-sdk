import "reflect-metadata";
import { Http } from "./Http";
import type { IMutation } from "./inerfaces";
import type { AxiosRequestConfig } from "axios";
import type { DeleteRequest, DeleteResponse } from "../types/delete";
import type { ActionRequest, ActionResponse } from "../types/action";
import type { MutateRequest, MutateResponse } from "../types/mutate";

export abstract class Mutation<T> implements IMutation<T> {
  protected http: Http;
  protected pathname: string;

  constructor(pathname: string) {
    this.http = Http.getInstance();
    this.pathname = pathname;
  }

  public mutate<
    TAttributes,
    TRelations,
    TRelationAttributesMap extends Record<keyof TRelations, unknown>,
  >(
    mutateRequest: MutateRequest<
      TAttributes,
      TRelations,
      TRelationAttributesMap
    >,
    options: Partial<AxiosRequestConfig> = {},
  ): Promise<MutateResponse<T>> {
    return this.http.request<MutateResponse<T>>(
      {
        method: "POST",
        url: `${this.pathname}/mutate`,
        data: mutateRequest,
      },
      options,
    );
  }

  public executeAction(
    actionRequest: ActionRequest,
    options: Partial<AxiosRequestConfig> = {},
  ): Promise<ActionResponse> {
    return this.http.request<ActionResponse>(
      {
        method: "POST",
        url: `${this.pathname}/actions/${actionRequest.action}`,
        data: actionRequest.params,
      },
      options,
    );
  }

  public delete(
    request: DeleteRequest,
    options: Partial<AxiosRequestConfig> = {},
  ): Promise<DeleteResponse<T>> {
    return this.http.request<DeleteResponse<T>>(
      {
        method: "DELETE",
        url: this.pathname,
        data: request,
      },
      options,
    );
  }

  public forceDelete(
    request: DeleteRequest,
    options: Partial<AxiosRequestConfig> = {},
  ): Promise<DeleteResponse<T>> {
    return this.http.request<DeleteResponse<T>>(
      {
        method: "DELETE",
        url: `${this.pathname}/force`,
        data: request,
      },
      options,
    );
  }

  public restore(
    request: DeleteRequest,
    options: Partial<AxiosRequestConfig> = {},
  ): Promise<DeleteResponse<T>> {
    return this.http.request<DeleteResponse<T>>(
      {
        method: "POST",
        url: `${this.pathname}/restore`,
        data: request,
      },
      options,
    );
  }
}
