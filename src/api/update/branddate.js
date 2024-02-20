import request from "@/utils/request";

const api_name = "/update";

export default {
  BrandDate(data) {
    return request({
      url: `${api_name}/BrandDate`,
      method: "post",
      data: data,
    });
  },
  getBrandDateList(data) {
    return request({
      url: `${api_name}/getBrandDateList`,
      method: "post",
      data: data,
    });
  },
};
