import request from '@/utils/request.js'
// 获取新闻文章推荐
export const getArticles = params => request({
  url: '/v1_0/articles',
  method: 'GET',
  params
})
// 获取文章详情
export const getArticleById = articleId => request({
  url: `/v1_0/articles/${articleId}`,
  method: 'GET',
})
// 收藏文章
export const addCollect = target => request({
  url: "/v1_0/article/collections",
  method: 'POST',
  data: {
    target,
  }
})
// 取消收藏
export const deleteCollect = target => request({
  url: `/v1_0/article/collections/${target}`,
  method: 'DELETE',
})
// 点赞
export const addLike = target => request({
  url: "/v1_0/article/likings",
  method: 'POST',
  data: {
    target,
  }
})
// 取消点赞
export const deleteLike = target => request({
  url: `/v1_0/article/likings/${target}`,
  method: 'DELETE',
})
