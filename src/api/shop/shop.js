import request from "@/utils/request";

const api_name = "/fncc-shop-info";

export default {
  addShopInfo(shopInfo) {
    return request({
      url: `${api_name}/addShopInfo`,
      method: "post",
      data: shopInfo,
    });
  },
  deleteShopInfo(id) {
    return request({
      url: `${api_name}/deleteShopInfo?id=${id}`,
      method: "delete",
    });
  },
  getShopInfo(data) {
    return request({
      url: `${api_name}/getShopInfo`,
      method: "post",
      data: data,
    });
  },
  updateShopInfo(data) {
    return request({
      url: `${api_name}/updateShopInfo`,
      method: "post",
      data: data,
    });
  },
};
