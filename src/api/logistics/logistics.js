import request from "@/utils/request";

const api_name = "/fncc-logistics-info";

export default {
  addLogisticsInfo(data) {
    return request({
      url: `${api_name}/addLogisticsInfo`,
      method: "post",
      data: data,
    });
  },
  deleteLogisticsInfo(id) {
    return request({
      url: `${api_name}/deleteLogisticsInfo?id=${id}`,
      method: "delete",
    });
  },
  getLogisticsInfo(data) {
    return request({
      url: `${api_name}/getLogisticsInfo`,
      method: "post",
      data: data,
    });
  },
  logisticsList() {
    return request({
      url: `${api_name}/logisticsList`,
      method: "get",
    });
  },
  updateLogisticsInfo(data) {
    return request({
      url: `${api_name}/updateLogisticsInfo`,
      method: "post",
      data: data,
    });
  },
};
