import request from "@/utils/request";

const api_name = "/fncc-channel-info";

export default {
  addChannelInfo(data) {
    return request({
      url: `${api_name}/addChannelInfo`,
      method: "post",
      data: data,
    });
  },
  deleteChannelInfo(id) {
    return request({
      url: `${api_name}/deleteChannelinfo?channelId=${id}`,
      method: "post",
      data: id,
    });
  },
  getChannelInfo(data) {
    return request({
      url: `${api_name}/getChannelInfo`,
      method: "post",
      data: data,
    });
  },
  getChannelList() {
    return request({
      url: `${api_name}/getChannelList`,
      method: "get",
    });
  },
  updateChannelinfo(data) {
    return request({
      url: `${api_name}/updateChannelinfo`,
      method: "post",
      data: data,
    });
  },
};
