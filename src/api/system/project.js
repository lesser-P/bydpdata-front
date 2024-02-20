import request from '@/utils/request'
import de from 'element-ui/src/locale/lang/de'

/*
菜单管理相关的API请求函数
*/
const api_name = '/admin/system/project'

export default {
  getAllProject(pageSize,page,projectVo){
    return request({
      url:`${api_name}/allProject/${pageSize}/${page}`,
      method:"post",
      data:projectVo
    })
  },
  deleteProjectById(projectId){
    return request({
      url:`${api_name}/deleteById/${projectId}`,
      method:"delete"
    })
  },
  updateProjectById(sysProject){
    return request({
      url:`${api_name}/updateProject`,
      method:"put",
      data:sysProject,
    })
  },
  updateStatus(id,status){
    return request({
      url:`${api_name}/updatestatus/${id}/${status}`,
      method:"put"
    })
  },
  createProject(projectVo){
    return request({
      url:`${api_name}/newProject`,
      method:"post",
      data:projectVo
    })
  },
  uploadFile(file,projectId){
    return request({
      url:`${api_name}/uploadFile/${projectId}`,
      method:"post",
      data:file
    })
  },
  downloadFile(projectId){
    return request({
      url:`${api_name}/downloadFile/${projectId}`,
      method:"get",
      responseType:`blob`
    })
  },
  showDetails(projectId){
    return request({
      url:`${api_name}/getproject/${projectId}`,
      method:"get"
    })
  },
  myProject(pageSize,page,projectVo){
    return request({
      url:`${api_name}/myProject/${pageSize}/${page}`,
      method:"post",
      data:projectVo
    })
  },
  showTeam(projectId){
    return request({
      url:`${api_name}/showTeam/${projectId}`,
      method:"get",
    })
  },
  assginTeam(assTeamVo){
    return request({
      url:`${api_name}/assginTeam`,
      method:"post",
      data:assTeamVo
    })
  }
}
