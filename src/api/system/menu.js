import request from '@/utils/request'

/*
菜单管理相关的API请求函数
*/
const api_name = '/admin/system/sysMenu'

export default {


  /**
   * 查看某个角色的权限列表
   * @param {*} roleId 
   * @returns 
   */
  toAssign(roleId) {
    return request({
      url: `${api_name}/toAssign/${roleId}`,
      method: 'get'
    })
  },

  /**
   * 给某个角色授权
   * @param {*} assginMenuVo 
   * @returns 
   */
  doAssign(assginMenuVo) {
    return request({
      url: `${api_name}/doAssign`,
      method: "post",
      data: assginMenuVo
    })
  },


  /*
  获取权限(菜单/功能)列表
  */
  findNodes() {
    return request({
      url: `${api_name}/findNodes`,
      method: 'get'
    })
  },

  
 /**
  * 根据id删除菜单
  * @param {*} id 
  * @returns 
  */
  removeById(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: "delete"
    })
  },

  /**
   * 新建菜单
   * @param {*} sysMenu 
   * @returns 
   */
  save(sysMenu) {
    return request({
      url: `${api_name}/save`,
      method: "post",
      data: sysMenu
    })
  },

  /**
   * 更新菜单
   * @param {*} sysMenu 
   * @returns 
   */
  updateById(sysMenu) {
    return request({
      url: `${api_name}/update`,
      method: "put",
      data: sysMenu
    })
  }
}