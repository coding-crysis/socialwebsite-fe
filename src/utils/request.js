import * as axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
  timeout: 100000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  error => {
    // Do something with request error
    console.error(error); // for debug
    Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => response,
  /**
   * The following comment indicates that the request status is indicated by a custom code in the response.
   * When the code returns the following, it indicates that there is a problem with the permissions, log out and return to the login page.
   * If you want to use xmlhttprequest to identify the status code, the logic can be written in the following error.
   * The following code is a sample, please modify it in combination with self-generated requirements, if you don't need it, you can delete it.
   */
  response => {
    if (response.request.status === 500) {
      return response;
    } else if (response.request.status === 401) {
      return Promise.reject();
    } else if (
      response.request.status === 400 ||
      response.request.status === 402 ||
      response.request.status === 403 ||
      response.request.status === 422
    ) {
      return Promise.reject(JSON.parse(response.request.response));
    }

    // FIXME: removed JSON.parse as it was not able to parse the response
    // console.log(response);
    const res = response.data;
    if (res.code !== 20000) {
      return Promise.reject("error");
    } else {
      return response.data;
    }
  },
  error => {
    console.error("err" + error); // for debug

    return Promise.reject(error);
  }
);

export default service;
