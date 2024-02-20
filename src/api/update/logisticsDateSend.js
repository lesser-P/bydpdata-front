import request from "@/utils/request";

const api_name = "/update";

export default {
  LogisticsDateSend(data) {
    return request({
      url: `${api_name}/LogisticsDateSend`,
      method: "post",
      data: date,
    });
  },
  getLogisticsDateSendList(data) {
    return request({
      url: `${api_name}/getLogisticsDateSendList`,
      method: "post",
      data: data,
    });
  },
};
