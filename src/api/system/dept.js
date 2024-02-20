import request from '@/utils/request'
import de from 'element-ui/src/locale/lang/de'

/*
菜单管理相关的API请求函数
*/
const api_name = '/admin/system/dept'

export default {
  getAllMemberByDept() {
    return request({
      url: `${api_name}/getAllMemberByDept`,
      method: "get"
    })
  },
  getAllTeam(){
    return request({
      url: `${api_name}/getAllTeamByDept`,
      method: "get"
    })
  },
  getList(){
    return request({
      url: `${api_name}/getList`,
      method: "get",
    })
  },
  getDeptMember(deptId,page,pageSize){
    return request({
      url: `${api_name}/getAllByDept/${deptId}/${page}/${pageSize}`,
      method: "get",
    })
  },
  updateDept(deptVo){
    return request({
      url: `${api_name}/update`,
      method: "put",
      data: deptVo
    })
  },
  getByName(deptName){
    return request({
      url: `${api_name}/getByName/${deptName}`,
      method: "get"
    })
  },
  getAllDept(){
    return request({
      url: `${api_name}/getAllDept`,
      method: "get",
    })
  }
}
