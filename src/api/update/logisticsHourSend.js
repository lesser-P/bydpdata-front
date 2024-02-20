import request from "@/utils/request";

const api_name = "/update";

export default {
  LogisticsHourSend(data) {
    return request({
      url: `${api_name}/LogisticsHourSend`,
      method: "post",
      data: data,
    });
  },
  getLogisticsHourSendList(data) {
    return request({
      url: `${api_name}/getLogisticsHourSendList`,
      method: "post",
      data: data,
    });
  },
};
