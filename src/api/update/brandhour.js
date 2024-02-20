import request from "@/utils/request";

const api_name = "/update";

export default {
  BrandHour(data) {
    return request({
      url: `${api_name}/BrandHour`,
      method: "post",
      data: data,
    });
  },
  getBrandHourList(data) {
    return request({
      url: `${api_name}/getBrandHourList`,
      method: "post",
      data: data,
    });
  },
};
