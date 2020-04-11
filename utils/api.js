const DOMAIN = 'https://app.itasksapp.com/api'
//const DOMAIN = 'http://192.168.1.108:32111/api'

const Account = {
  getList: DOMAIN + '/task/getList', //【查询分页数据】
  login: DOMAIN + '/account/mini-login', //【登录】
  findAllByParentId: DOMAIN + '/task/findAllByParentId', //【查询完整任务】
  updateState: DOMAIN + '/task/updateState', //【更新任务状态】
  findByInviteCode: DOMAIN + '/task/findByInviteCode/', //【邀请码查询任务】
  joinByInviteCode: DOMAIN + '/user-group/joinByInviteCode', //【根据邀请码加入任务】
  myInfo: DOMAIN + '/users/myInfo', //【设置页信息(用户信息)】
  createTask: DOMAIN + '/task/createTask', //【发布项目】
  uploadPic: DOMAIN + '/file/uploadPic', //【上传任务封面】
  createUsers: DOMAIN + '/im/createUsers', //【网易云创建用户】
  findByTaskId: DOMAIN + '/user-group/findByTaskId', //【获取任务成员】
  deleteList: DOMAIN + '/task/delete', //【删除任务】
}

module.exports = {
  ...Account,
}