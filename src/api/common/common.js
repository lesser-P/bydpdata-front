import request from "@/utils/request";

export default {
  // 获得token
  getToken(key) {
    return request({
      url: `/gettoken?key=${key}`,
      method: "get",
    });
  },

  // 健康检查
  healthCheck() {
    return request({
      url: `/healthCheck`,
      method: "get",
    });
  },

  // 登陆
  login(data) {
    return request({
      url: `/login`,
      method: "post",
      data: data,
    });
  },

  // 上传图片
  uploadImage(data) {
    return request({
      url: `/upload`,
      data: data,
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
