import request from "@/utils/request";

const api_name = "/fncc-group-sale-month";

export default {
  addMonthSale(data) {
    return request({
      url: `${api_name}/addMonthSale`,
      method: "post",
      data: data,
    });
  },
  getGroupSalePage(data) {
    return request({
      url: `${api_name}/getMonthSale`,
      method: "post",
      data: data,
    });
  },
  deleteGroupSale(id) {
    return request({
      url: `${api_name}/deleteMonthSale?id=${id}`,
      method: "delete",
    });
  },
  updateGroupSale(data) {
    return request({
      url: `${api_name}/updateMonthSale`,
      method: "put",
      data: data,
    });
  },
};
