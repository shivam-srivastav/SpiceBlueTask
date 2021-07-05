import { server_url, access_token } from "../../config";

const callAPI = async function (method, url, data = {}) {
  const options = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: access_token,
    },
  };

  if (method !== "get") {
    options.body = JSON.stringify(data);
  }
  return fetch(server_url + url, options).then((res) => res.json());
};
export const login = (data) => callAPI("post", `/login`, data);
export const getUser = (data = {}) => callAPI("get", "/user", data);
export const addingTask = (data) =>
  callAPI("post", "/task/lead_6996a7dcdddc4af3b4f71ccb985cea38", data);
export const getAllTask = (data = {}) =>
  callAPI("get", "/task/lead_6996a7dcdddc4af3b4f71ccb985cea38", data);
export const getSingleTask = (data = {}) =>
  callAPI("get", `/task/lead_6996a7dcdddc4af3b4f71ccb985cea38/${data}`, data);
export const updateTask = (data = {}) =>
  callAPI("put", `/task/${data.lead_id}/${data.task_id}`, data.req);
export const deleteTask = (data = {}) =>
  callAPI("delete", `/task/${data.lead_id}/${data.task_id}`, data);
export const assignedUser = (data = {}) => callAPI("get", "/team", data);
