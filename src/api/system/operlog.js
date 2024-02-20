import request from '@/utils/request'

/*
菜单管理相关的API请求函数
*/
const api_name = '/admin/system/sysOperLog'

export default {
  index(page,pageSize,SysOperLogQueryVo) {
    return request({
      url: `${api_name}/${page}/${pageSize}`,
      method: "post",
      data: SysOperLogQueryVo
    })
  }
}
