import request from '@/utils/request'

/*
菜单管理相关的API请求函数
*/
const api_name = '/admin/system/notic'

export default {
  /**
   * 获取所有公告
   * @param pageSize
   * @param page
   * @returns {*}
   */
  getAll(noticVo) {
    return request({
      url: `${api_name}/getAll`,
      method: "post",
      data: noticVo
    })
  },

  /**
   * 获取当前用户所有公告
   * @param noticVo
   * @returns {*}
   */
  getAllByMember(noticVo){
    return request({
      url: `${api_name}/getAllByMember`,
      method: "post",
      data: noticVo
    })
  },

  /**
   * 获得指定id公告
   * @param id
   * @returns {*}
   */
  getByNoticId(id) {
    return request({
      url: `${api_name}/getNoticById/${id}`,
      method: "get"
    })
  },

  /**
   * 保存公告
   * @param noticVo
   * @returns {*}
   */
  newNotic(noticVo){
    return request({
      url: `${api_name}/newNotic`,
      method: "post",
      data: noticVo
    })
  },
  /**
   * 删除公告
   * @param id
   * @returns {*}
   */
  deleteNotic(id){
    return request({
      url: `${api_name}/deleteNotic/${id}`,
      method: "delete",
    })
  },

  /**
   * 修改公告
   * @param noticVo
   * @returns {*}
   */
  updateNotic(noticVo){
    return request({
      url: `${api_name}/updateNotic`,
      method: "put",
      data: noticVo
    })
  },

  /**
   * 发布公告
   * @param id
   * @returns {*}
   */
  publish(id){
    return request({
      url: `${api_name}/publish/${id}`,
      method: "post"
    })
  },

  /**
   * 展示最新公告
   * @returns {*}
   */
  getNewNotic(){
    return request({
      url: `${api_name}/getNew`,
      method: "get"
    })
  },

  /**
   * 带参查询
   * @param sysNotic
   * @returns {*}
   */
  getNoticByQuery(sysNotic){
    return request({
      url: `${api_name}/query`,
      method: "post",
      data: sysNotic
    })
  }

}
