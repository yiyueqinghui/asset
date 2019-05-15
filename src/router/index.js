import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/staff',
      component:()=> import('@/page/index'),     //按需加载组件
      children:[
        {
          path:'/staff',
          component:()=>import('@/page/staff')
        },
        {
          path:'/car',
          component:()=>import('@/page/assetManage/car')
        },
        {
          path:'/wareHousing',
          component:()=>import('@/page/assetManage/wareHousing')
        },
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
