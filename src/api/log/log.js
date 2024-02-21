import request from "@/utils/request";

const api_name = "/fncc-request-body";

export default {
  getRequestBody(data) {
    return request({
      url: `${api_name}/getRequestList`,
      method: "post",
      data: data,
    });
  },
};
