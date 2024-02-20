import request from '@/utils/request'

/*
菜单管理相关的API请求函数
*/
const api_name = '/admin/system/sysLoginLog'

export default {
  index(page,pageSize,SysLoginLogQueryVo) {
    return request({
      url: `${api_name}/${page}/${pageSize}`,
      method: "post",
      data: SysLoginLogQueryVo
    })
  }
}
