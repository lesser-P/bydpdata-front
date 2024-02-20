import request from '@/utils/request'
import da from 'element-ui/src/locale/lang/da'

/*
菜单管理相关的API请求函数
*/
const api_name = '/admin/system/team'

export default {

  /**
   * 查看所有团队
   * @param data
   * @returns {*}
   */
  getAllTeam(data) {
    return request({
      url: `${api_name}/pageAll`,
      method: 'post',
      data: data
    })
  },

  /**
   * 创建团队
   * @param teamBo
   * @returns {*}
   */
  newTeam(teamBo) {
    return request({
      url: `${api_name}/newTeam`,
      method: "post",
      data: teamBo
    })
  },

  /**
   * 修改团队状态
   * @param teamBo
   * @returns {*}
   */
  updateTeamStatus(teamBo) {
    return request({
      url: `${api_name}/status`,
      method: 'post',
      data:teamBo
    })
  },

  /**
   * 删除团队
   * @param teamBo
   * @returns {*}
   */
  deleteByIds(teamBo) {
    return request({
      url: `${api_name}/deleteByIds`,
      method: "delete",
      data: teamBo
    })
  },

  /**
   * 获取团队中所有成员
   * @param teamid
   * @returns {*}
   */
  getAllMember(teamid) {
    return request({
      url: `${api_name}/allMembers/${teamid}`,
      method: "get",
    })
  },

  /**
   * 退出团队
   * @param userid
   * @param teamid
   * @returns {*}
   */
  memberOut(teamid) {
    return request({
      url: `${api_name}/memberOut/${teamid}`,
      method: "post"
    })
  },
  getTeamById(teamid){
    return request({
      url: `${api_name}/getTeam/${teamid}`,
      method: "get"
    })
  },
  getTeamByUserID(){
    return request({
      url:`${api_name}/getTeamByUserId`,
      method:"get"
    })
  },
  updateTeam(teamBo){
    return request({
      url: `${api_name}/updateTeam`,
      method: 'put',
      data: teamBo
    })
  },
  assignMembers(assginMemberVo){
    return request({
      url:`${api_name}/assignMembers`,
      method:"post",
      data:assginMemberVo
    })
  }
}
