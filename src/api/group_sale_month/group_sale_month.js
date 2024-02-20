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
};
