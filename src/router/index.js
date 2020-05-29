import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home'
import Design from '../pages/Home/design/index.vue'
import Shouye from '../pages/Home/shouye/index.vue'
import Gongyingshang from "../pages/Home/gongying/index.vue"
import Guochanhua from "../pages/Home/guochanhua/index.vue"
import Wuzi from '../pages/Home/wuzi/index.vue'
import Xitong from '../pages/Home/xitong/index.vue'
import Xuanxing from '../pages/Home/xuanxing'
import Youxuan from '../pages/Home/xuanxing/youxuan/index.vue'
import Tongxing from '../pages/Home/xuanxing/tongxing/index.vue'
import Tidai from '../pages/Home/xuanxing/tidai/index.vue'
import Fenlei from '../pages/Home/xuanxing/fenlei/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "design"
  },
  {

    path: "/",
    component: Home,

    children: [{
        path: "design",
        component: Design
      },
      {
        path: "shouye",
        component: Shouye
      },
      {
        path: "gongying",
        component: Gongyingshang
      },
      {
        path: "guochanhua",
        component: Guochanhua
      }, {
        path: "wuzi",
        component: Wuzi
      },
      {
        path: "xitong",
        component: Xitong
      },

      {
        path: "/",
        component: Xuanxing,
        children: [{
            path: "youxuan",
            component: Youxuan
          },
          {
            path: "tongxing",
            component: Tongxing
          },
          {
            path: "tidai",
            component: Tidai
          },
          {
            path: "fenlei",
            component: Fenlei
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
