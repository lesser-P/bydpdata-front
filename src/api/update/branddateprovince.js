import request from "@/utils/request";

const api_name = "/update";

export default {
  BrandDateProvince(data) {
    return request({
      url: `${api_name}/BrandDateProvince`,
      method: "post",
      data: data,
    });
  },
  getBrandDateProvinceList(data) {
    return request({
      url: `${api_name}/getBrandDateProvinceList`,
      method: "post",
      data: data,
    });
  },
};
