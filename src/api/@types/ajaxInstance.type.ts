import fetchRequest from "../instances/fetchRequest";
import xmlHttpRequest from "../instances/xmlHttpRequest";

export type RequestParams<T> = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  headers: { [key: string]: any };
  body?: T;
};

export type AjaxInstance = typeof fetchRequest | typeof xmlHttpRequest;
