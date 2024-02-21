import request from "@/utils/request";
const api_name = "/fncc-back-user";

export default {
  addUser(data) {
    return request({
      url: `${api_name}/addUser`,
      method: "post",
      data: data,
    });
  },

  getUserList() {
    return request({
      url: `${api_name}/getListUser`,
      method: "get",
    });
  },

  deleteUserById(id) {
    return request({
      url: `${api_name}/deleteUser?userid=${id}`,
      method: "delete",
    });
  },

  resetPassword(id) {
    return request({
      url: `${api_name}/resetPassword?userid=${id}`,
      method: "put",
    });
  },
};
