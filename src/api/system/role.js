import request from '@/utils/request'

//常量
const api_name = 'admin/system/sysRole'


export default{


    /**
     * 根据用户ID获取角色数据
     * @param {*} userId
     * @returns
     */
    getRolesByUserId(userId){
        return request({

            url: `${api_name}/toAssign/${userId}`,
            method: 'get'
        })
    },


    /**
     * 用户分配角色
     * @param {*} assginRoleVo
     * @returns
     */
    assignRoles(assginRoleVo){
        return request({
            url: `${api_name}/doAssign`,
            method: 'post',
            data: assginRoleVo
        })
    },
  assignMember(assginMemberVo){
      return request({
        url: `${api_name}/`,
        method: 'post',
        data: assginMemberVo
      })
  },
    /**
     * 获取角色列表
     * @param {*} page
     * @param {*} limit
     * @param {*} searchObj
     * @returns
     */
    getPageList(page,limit,searchObj){

        return request({
            // 接口路径
            //url: '/admin/system/sysRole/'+page+"/"+limit,
            url: `${api_name}/${page}/${limit}`,
            // 提交方式
            method: 'get',
            // 参数
            params:searchObj
        })
    },
    /**
     * 根据id删除数据
     * @param {*} id
     * @returns
     */
    removeRoleId(id){

        return request({
            // 接口路径
            //url: '/admin/system/sysRole/'+page+"/"+limit,
            url: `${api_name}/remove/${id}`,
            // 提交方式
            method: 'delete'
        })
    },


    /**
     * 添加角色
     * @param {*} role
     * @returns
     */
    saveRole(role){

        return request({
            // 接口路径
            //url: '/admin/system/sysRole/'+page+"/"+limit,
            url: `${api_name}/save`,
            // 提交方式
            method: 'post',
            // 传递json
            data: role
        })

    },

    /**
     * 根据id查询
     * @param {*} id
     * @returns
     */
    getRoleById(id){
        return request({

            // 接口路径
            url: `${api_name}/findRoleById/${id}`,
            method: `post`

        })
    },

    /**
     * 修改角色
     * @param {*} role
     * @returns
     */
    updateRole(role){

        return request({
            // 接口路径
            url: `${api_name}/update`,
            // 提交方式
            method: 'post',
            // 传递json
            data: role
        })
    },

    /**
     * 批量删除
     * @param {*} idList
     * @returns
     */
    batchRemove(idList){
        return request({
            // 接口路径
            url: `${api_name}/batchRemove`,
            // 提交方式
            method: 'delete',
            // 传递json
            data: idList
        })
    }

}
