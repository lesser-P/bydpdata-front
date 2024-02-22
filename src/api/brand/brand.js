import request from "@/utils/request";
const api_name = "/fncc-brand-info";

export default {
  addBrandInfo(data) {
    return request({
      url: `${api_name}/addBrandInfo`,
      method: "post",
      data: data,
    });
  },
  deleteBrandInfoById(id) {
    return request({
      url: `${api_name}/deleteBrandInfo?brandId=${id}`,
      method: "post",
    });
  },
  getBrandInfoList() {
    return request({
      url: `${api_name}/getBrandInfo`,
      method: "get",
    });
  },
  getBrandInfoPage(data) {
    return request({
      url: `${api_name}/getBrandInfo`,
      method: "post",
      data: data,
    });
  },
  updateBrandInfo(data) {
    return request({
      url: `${api_name}/updateBrandInfo`,
      method: "post",
      data: data,
    });
  },
};
