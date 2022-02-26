// 封装axios请求模块
import axios from 'axios'
// 获取容器当中的数据
import store from '@/store'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/'
})
// 请求拦截器
request.interceptors.request.use(function (config) {
  // config 本次请求的配置对象
  const {
    user
  } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }

  // 每次拦截请求无比要return出配置对象
  return config
}, function (error) {
  return Promise.reject(error)
})
export default request
