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
};
