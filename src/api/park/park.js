import request from "@/utils/request";

const api_name = "/fncc-park-space-info";

export default {
  addParkSpaceInfo(data) {
    return request({
      url: `${api_name}/addParkSpaceInfo`,
      method: "post",
      data: data,
    });
  },
  deleteParkSpaceInfo(id) {
    return request({
      url: `${api_name}/deleteParkSpaceInfo?id=${id}`,
      method: "delete",
    });
  },
  getParkSpaceInfo(data) {
    return request({
      url: `${api_name}/getParkSpaceInfo`,
      method: "post",
      data: data,
    });
  },
  updateParkSpaceInfo(data) {
    return request({
      url: `${api_name}/updateParkSpaceInfo`,
      method: "post",
      data: data,
    });
  },
  addTeam(data) {
    return request({
      url: `${api_name}/addTeam`,
      method: "post",
      data: data,
    });
  },
  getTeamList() {
    return request({
      url: `${api_name}/getTeam`,
      method: "get",
    });
  },
  deleteTeam(id) {
    return request({
      url: `${api_name}/deleteTeam?id=${id}`,
      method: "delete",
    });
  },
  updateTeamInfo(data) {
    return request({
      url: `${api_name}/updateTeam`,
      method: "put",
      data: data,
    });
  },
};
