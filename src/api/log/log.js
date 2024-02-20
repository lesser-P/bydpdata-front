import request from "@/utils/request";

const api_name = "/fncc-log-info";

export default {
  getLogInfo(page) {
    return request({
      url: `${api_name}/getLogInfo?page=${page}`,
      method: "get",
    });
  },
};
