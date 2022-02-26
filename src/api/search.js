// 搜索相关请求模块
import request from '@/utils/request';
// 获取搜索联想词
export const getSearchSuggestions = data => request({
  url: '/v1_0/suggestion',
  method: 'GET',
  params: {
    q: data
  }
})
// 获取搜索结果
export const getSearchResults = params => request({
  url: '/v1_0/search',
  method: 'GET',
  params
})
