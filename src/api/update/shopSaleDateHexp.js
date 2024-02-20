import request from "@/utils/request";

const api_name = "/update";

export default {
  ShopSaleDateHexp(data) {
    return request({
      url: `${api_name}/ShopSaleDateHexp`,
      method: "post",
      data: data,
    });
  },
  getShopSaleDateHexpList(data) {
    return request({
      url: `${api_name}/getShopSaleDateHexpList`,
      method: "post",
      data: data,
    });
  },
};
