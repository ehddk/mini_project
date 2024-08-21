import type { RequestParams } from "../@types/ajaxInstance.type";

const setHeaders = (xhr: XMLHttpRequest, headers: { [key: string]: any }) => {
  Object.entries(headers).forEach((entry) => {
    const [name, value] = entry;

    xhr.setRequestHeader(name, value);
  });
};
// function parseResponse<Res>({ status, responseText }: XMLHttpRequest): {
function parseResponse<Res>(xhr: XMLHttpRequest): {
  status: number;
  data: Res;
} {
  const { status, responseText } = xhr;

  let data;
  if (status !== 204) {
    data = JSON.parse(responseText);
  }

  return {
    status,
    data,
  };
}

function request<Res, Req>(
  params: RequestParams<Req>
): Promise<{ status: number; data: Res }> {
  const { method, url, headers, body } = params;

  const xhr = new XMLHttpRequest();

  xhr.open(method, url);

  setHeaders(xhr, headers);

  xhr.send(JSON.stringify(body));

  return new Promise<{
    status: number;
    data: Res;
  }>((resolve, reject) => {
    xhr.onerror = () => {
      reject(new Error("HTTP Error"));
    };

    xhr.ontimeout = () => {
      reject(new Error("Timeout Error"));
    };

    xhr.onload = () => resolve(parseResponse<Res>(xhr));
  });
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
