import type { RequestParams } from "../@types/ajaxInstance.type";

async function parseResponse<T>(response: Response) {
  const { status } = response;

  let data;

  try {
    data = await response.json();
  } catch (e) {
    data = {};
  }

  return {
    status,
    data,
  } as {
    status: number;
    data: T;
  };
}

async function request<Res = any, Req = any>(params: RequestParams<Req>) {
  const { method, url, headers, body } = params;

  const config = {
    method,
    headers: new Headers(headers),
    body: undefined,
    data: body,
  } as RequestInit;

  if (body && method !== "GET") {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(url, {
    ...config,
  });

  return await parseResponse<Res>(response);
}

async function get<Res, Req = unknown>(
  url: string,
  body?: Req,
  headers: { [key: string]: any } = {}
) {
  const response = await request<Res, Req>({
    url,
    body,
    headers,
    method: "GET",
  });

  return response;
}

async function post<Res, Req = unknown>(
  url: string,
  body?: Req,
  headers: { [key: string]: any } = {}
) {
  const response = await request<Res, Req>({
    url,
    body,
    headers,
    method: "POST",
  });

  return response;
}

async function put<Res, Req = unknown>(
  url: string,
  body?: Req,
  headers: { [key: string]: any } = {}
) {
  const response = await request<Res, Req>({
    url,
    body,
    headers,
    method: "PUT",
  });

  return response;
}

async function patch<Res, Req = unknown>(
  url: string,
  body?: Req,
  headers: { [key: string]: any } = {}
) {
  const response = await request<Res, Req>({
    url,
    body,
    headers,
    method: "PATCH",
  });

  return response;
}

async function deleteRequest<Res, Req = unknown>(
  url: string,
  body?: Req,
  headers: { [key: string]: any } = {}
) {
  const response = await request<Res, undefined>({
    url,
    headers,
    method: "DELETE",
  });

  return response;
}

export default {
  get,
  post,
  put,
  patch,
  delete: deleteRequest,
};
