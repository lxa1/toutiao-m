// 用户相关请求模块
import request from '@/utils/request';
// 判断用户手机号和验证码是否正确
export const login = data => request({
  url: 'v1_0/authorizations',
  method: 'POST',
  data
})
// 发送验证码
export const getSmsCode = mobile => request({
  url: `/v1_0/sms/codes/${mobile}`,
  method: 'GET',
})
// 获取用户信息
export const getUserInfo = () => request({
  url: '/v1_0/user',
  method: 'GET',
})
// 获取用户频道
export const getUserChannels = () => request({
  url: '/v1_0/user/channels',
  method: 'GET',
})

// 关注用户
export const addFollow = target => request({
  url: "/v1_0/user/followings",
  method: 'POST',
  data: {
    target,
  }
})
// 取消关注用户
export const deleteFollow = target => request({
  url: `/v1_0/user/followings/${target}`,
  method: 'DELETE',
})
// 获取用户个人信息
export const getUserProfile = () => request({
  url: '/v1_0/user/profile',
  method: 'GET'
})
// 修改用户个人信息
export const editUserProfile = data => request({
  url: '/v1_0/user/profile',
  method: 'PATCH',
  data,
})
// 修改用户头像
export const editUserPhoto = data => request({
  url: '/v1_0/user/photo',
  method: 'PATCH',
  data,
})
