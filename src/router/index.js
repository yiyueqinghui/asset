import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/',
      component:()=>import('@/page/index'),
      children:[
        {
          meta:'首页',
          path:'',
          component:()=>import('@/page/home')
        },
        {
          meta:'员工个人',
          path:'staff',
          component:()=>import('@/page/staff')
        }
      ]
    },
    {
      meta:'资产管理',
      path:'/asset',
      component:()=> import('@/page/index'),     //按需加载组件
      children:[
        {
          meta:'资产首页',
          path:'',
          component:()=>import('@/page/asset/index')
        },
        {
          meta:'资产退库',
          path:'back',
          component:()=>import('@/page/asset/back')
        },
        {
          meta:'汽车管理',
          path:'car',
          component:()=>import('@/page/asset/car')
        },
        {
          meta:'票据管理',
          path:'invoice',
          component:()=>import('@/page/asset/invoice')
        },
        {
          meta:'门禁卡管理',
          path:'card',
          component:()=>import('@/page/asset/card')
        },
        {
          meta:'ICP管理',
          path:'icp',
          component:()=>import('@/page/asset/icp')
        },
        {
          meta:'商标管理',
          path:'brand',
          component:()=>import('@/page/asset/brand')
        },
        {
          meta:'汽车管理',
          path:'workplace',
          component:()=>import('@/page/asset/workplace')
        },
        {
          meta:'资产入库',
          path:'storage',
          component:()=>import('@/page/asset/asset')
        },
        {
          meta:'票据管理',
          path:'receive',
          component:()=>import('@/page/asset/receive')
        },
        {
          meta:'资产借用&归还',
          path:'borrow',
          component:()=>import('@/page/asset/borrow')
        },
        {
          meta:'资产调拨',
          path:'allot',
          component:()=>import('@/page/asset/allot')
        },
        {
          meta:'租赁管理',
          path:'rent',
          component:()=>import('@/page/asset/rent')
        },
        {
          meta:'维保信息变更',
          path:'changeInfo',
          component:()=>import('@/page/asset/changeInfo')
        },
        {
          meta:'办公职场管理',
          path:'office',
          component:()=>import('@/page/asset/workplace')
        }
        // ,{
        //   meta:'资产调拨',
        //   path:'',
        //   component:()=>import('@/page/first/tab')
        // },
        // {
        //   path:'chart',
        //   component:()=>import('@/page/first/chart')
        // }
      ]
    },
    {
      meta:'系统管理',
      path:'/system',
      redirect:'',
      component:()=> import('@/page/index'),     //按需加载组件
      children:[
        {
          meta:'系统首页',
          path:'/system',
          component:()=>import('@/page/system/index')
        },
        {
          meta:'组织结构',
          path:'organization',
          component:()=>import('@/page/system/organization')
        },
        {
          meta:'角色管理',
          path:'roles',
          component:()=>import('@/page/system/roles')
        },
        {
          meta:'用户管理',
          path:'user',
          component:()=>import('@/page/system/user')
        },
        {
          meta:'新版用户管理',
          path:'new-user',
          component:()=>import('@/page/system/newUser')
        },
        {
          meta:'新版角色管理',
          path:'new-role',
          component:()=>import('@/page/system/newRoles')
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
