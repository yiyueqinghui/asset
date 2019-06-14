import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      meta:'首页',
      path:'/',
      component:()=>import('@/page/home')
    },
    {
      meta:'资产入库',
      path:'/storage',
      component:()=>import('@/page/storage')
    }

  ]
})
