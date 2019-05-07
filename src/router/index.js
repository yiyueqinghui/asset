import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/tab',
      component:()=> import('@/page/index'),     //按需加载组件
      children:[
        {
          path:'/tab',
          component:()=>import('@/page/first/tab')
        },
        {
          path:'/chart',
          component:()=>import('@/page/first/chart')
        }
      ]
    },
    {
      path:'/login',
      component:()=>import('@/page/login')
    },
    {
      path:'/test',
      component:()=>import('@/page/test')
    }
  ]
})
