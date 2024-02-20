import request from "@/utils/request";

const api_name = "/update";

export default {
  GoodsSaleDateHexp(date) {
    return request({
      url: `${api_name}/GoodsSaleDateHexp`,
      method: "post",
      data: date,
    });
  },
  getGoodsSaleDateHexpList(data) {
    return request({
      url: `${api_name}/getGoodsSaleDateHexpList`,
      method: "post",
      data: data,
    });
  },
};
