// 回复请求模块
import request from '@/utils/request'
// 获取回复
export const getComments = params => request({
  url: '/v1_0/comments',
  method: 'GET',
  params,
})
// 对评论或者回复点赞
export const addLikeComment = target => request({
  url: '/v1_0/comment/likings',
  method: 'POST',
  data: {
    target,
  }
})
// 取消对评论或者回复点赞
export const deleteLikeComment = target => request({
  url: `/v1_0/comment/likings/${target}`,
  method: 'DELETE',
})

// 对文章进行评论或对评论进行回复
export const PostComment = data => request({
  url: '/v1_0/comments',
  method: 'POST',
  data,
})
