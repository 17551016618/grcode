import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入element组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入vant组件库
import Vant from 'vant';
import 'vant/lib/index.css';

// 引入樣式
import './assets/el-css.css'
import './assets/reset-css.css'
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Vant);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
