import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      component:()=> import('@/page/index')     //按需加载组件
    },
    {
      path: '/home',
      name: 'Home',
      component:()=> import('@/page/home')
    }
  ]
})
