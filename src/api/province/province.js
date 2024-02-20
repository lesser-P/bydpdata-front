import request from "@/utils/request";

const api_name = "/fncc-province-info";

export default {
  addProvinceInfo(data) {
    return request({
      url: `${api_name}/addProvinceInfo`,
      method: "post",
      data: data,
    });
  },
  deleteProvinceInfo(id) {
    return request({
      url: `${api_name}/deleteProvinceInfo?id=${id}`,
      method: "delete",
    });
  },
  getProvinceInfo(data) {
    return request({
      url: `${api_name}/getProvinceInfo`,
      method: "post",
      data: data,
    });
  },
  getprovinceList() {
    return request({
      url: `${api_name}/provinceList`,
      method: "get",
    });
  },
  updateProvinceInfo(data) {
    return request({
      url: `${api_name}/updateProvinceInfo`,
      method: "post",
      data: data,
    });
  },
};
