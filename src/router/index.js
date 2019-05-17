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
          component:()=>import('@/page/asset/car')
        },
        {
          path:'/invoice',
          component:()=>import('@/page/asset/invoice')
        },
        {
          path:'/card',
          component:()=>import('@/page/asset/card')
        },
        {
          path:'/icp',
          component:()=>import('@/page/asset/icp')
        },
        {
          path:'/brand',
          component:()=>import('@/page/asset/brand')
        },
        {
          path:'/workplace',
          component:()=>import('@/page/asset/workplace')
        },
        {
          path:'/wareHousing',
          component:()=>import('@/page/asset/asset')
        },
        {
          path:'/receive',
          component:()=>import('@/page/asset/receive')
        },
        {
          path:'/borrow',
          component:()=>import('@/page/asset/borrow')
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
