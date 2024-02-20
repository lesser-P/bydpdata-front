import request from '@/utils/request'
import de from 'element-ui/src/locale/lang/de'
import * as url from 'url'

/*
菜单管理相关的API请求函数
*/
const api_name = '/admin/system/task'

export default {
  getinfo(taskVo){
    return request({
      url:`${api_name}/pageTask`,
      method:"post",
      data:taskVo
    })
  },
  createTask(sysTask){
    return request({
      url:`${api_name}/createtask`,
      method:"post",
      data:sysTask
    })
  },
  deleteTask(taskId){
    return request({
      url:`${api_name}/deletetask/${taskId}`,
      method:"delete"
    })
  },
  assEmp(taskId){
    return request({
      url:`${api_name}/getEmp/${taskId}`,
      method:"get"
    })
  },
  updateTask(sysTask){
    return request({
      url:`${api_name}/updatetask`,
      method:"put",
      data:sysTask
    })
  },
  updateStatus(taskId,status){
    return request({
      url:`${api_name}/updateStatus/${taskId}/${status}`,
      method: "put"
    })
  },
  getTaskInfo(taskId){
    return request({
      url:`${api_name}/getDetails/${taskId}`,
      method:"get"
    })
  },
  empTask(taskVo){
    return request({
      url:`${api_name}/empTask`,
      method:"post",
      data:taskVo
    })
  },
}
