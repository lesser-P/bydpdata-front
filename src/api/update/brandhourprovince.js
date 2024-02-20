import request from "@/utils/request";

const api_name = "/update";

export default {
  BrandHourProvince(data) {
    return request({
      url: `${api_name}/BrandHourProvince`,
      method: "post",
      data: data,
    });
  },
  getBrandHourProvinceList(data) {
    return request({
      url: `${api_name}/getBrandHourProvinceList`,
      method: "post",
      data: data,
    });
  },
};
