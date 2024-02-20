import request from '@/utils/request'

//常量
const api_name = '/admin/system/sysUser/'


export default{


    /**
     * 更新用户状态
     * @param {*} id
     * @param {*} status
     * @returns
     */
    updateStatus(id,status){

      return request({
        url: `${api_name}/updateStatus/${id}/${status}`,
        method: 'get'
      })
    },


    /**
     * 获取用户列表
     * @param {*} page
     * @param {*} limit
     * @param {*} searchObj
     * @returns
     */
    getPageList(page,limit,searchObj){

      return request({

        url: `${api_name}/list/${page}/${limit}`,
        method: 'get',
        params: searchObj

      })
    },

    /**
     * 保存用户
     * @param {*} user
     * @returns
     */
    saveUser(user){

      return request({

        url: `${api_name}/save`,
        method: 'post',
        data: user

      })

    },

    /**
     * 根据id查询
     * @param {*} id
     * @returns
     */
    getById(id){

      return request({

        url: `${api_name}/getUser/${id}`,
        method: 'post'

      })

    },

    /**
     * 修改用户
     * @param {*} user
     * @returns
     */
    updateUser(user){
      return request({
        url: `${api_name}/update`,
        method: 'post',
        data: user
      })

    },
  /**
   * 转移员工
   * @param user
   * @returns {*}
   */
    transferUser(user){
      return request({
        url: `${api_name}/transferUser`,
        method:'post',
        data: user
      })
    },
    /**
     * 根据id删除用户
     * @param {*} id
     * @returns
     */
    removeUser(id){

      return request({

        url: `${api_name}/remove/${id}`,
        method: 'delete',
      })


    },
  resetPassword(userId){
      return request({
        url: `${api_name}/resetPassword`,
        method:"put",
        params:{userId}
      })
  }

}
