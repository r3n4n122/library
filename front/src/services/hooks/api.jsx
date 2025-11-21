import axios from "axios";
export const baseUrl = "http://api.localhost:3000/api/v1";
export const request = () =>
  axios.create({
    baseURL: baseUrl,
  }
);

const cancel = {};
const controller = new AbortController();

export const GetInstance = (params = {}, route = "") => {

  if (cancel[route]) {
    cancel[route].abort();
  }

  cancel[route] = controller;

  return request().get(`${route}${params?.id ? `/${params?.id}` : ""}`, {
    params: {
      ...params,
    },
  });
};

export const PostInstance = (params = {}, route = "") => {

  if (cancel[route]) {
    cancel[route].abort();
  }

  cancel[route] = controller;

  return request().post(
    `${route}${params?.id ? `/${params?.id}` : ""}`,
    params
  );
};


