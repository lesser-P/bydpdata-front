import request from '@/utils/request'
import de from 'element-ui/src/locale/lang/de'

/*
菜单管理相关的API请求函数
*/
const api_name = '/admin/system/target'

export default {
    getAllTarget(targetVo){
      return request({
        url: `${api_name}/getAllTarget`,
        method: "post",
        data: targetVo
      })
    },
    saveTarget(sysTarget){
      return request({
        url:`${api_name}/newTarget`,
        method:"post",
        data:sysTarget
      })
    },
  getTargetById(id){
      return request({
        url:`${api_name}/getTarget/${id}`,
        method:"get"
      })
  },
  updateTarget(sysTarget){
      return request({
        url:`${api_name}/updateTarget`,
        method:"put",
        data:sysTarget
      })
  },
  deleteTarget(id){
      return request({
        url:`${api_name}/deleteById/${id}`,
        method:"delete"
      })
  },
  getAssProject(targetId){
      return request({
        url:`${api_name}/assProject/${targetId}`,
        method:"get"
      })
  }
}
