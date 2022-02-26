import dayjs from 'dayjs'
import Vue from 'vue'
// 加载中文语言包
import 'dayjs/locale/zh-cn'
// 加载相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 配置使用中文语言包
dayjs.locale('zh-cn')
// 配置使用处理相对事件的插件
dayjs.extend(relativeTime)
// 测试dayjs
// console.log(dayjs().format('YYYY-MM-DD'));

// 全局过滤器，处理相对时间
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
