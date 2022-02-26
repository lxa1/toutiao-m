import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//  载入全局样式
import './styles/index.less'
// 载入vant组件库
import Vant from 'vant';
import 'vant/lib/index.css';
// 引入flexible
import 'amfe-flexible'
import './utils/dayjs'
Vue.config.productionTip = false;
Vue.use(Vant);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
