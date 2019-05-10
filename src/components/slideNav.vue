<template>
  <section class="asideNav" :style="{width:animateWidth+'px',height:screenHeight+'px'}">
    <el-scrollbar style="height: 100%;padding-top:60px;">
      <img class="logo" :src="collapse?'../../static/img/logo-2.png':'../../static/img/logo-1.png'" />
      <el-menu class="el-menu-vertical-demo" :collapse="collapse" default-active="0-0" background-color="#2b3647" text-color="#a0abbf" active-text-color="#ffffff">
        <template v-for="(item,oneId) in tab">
          <router-link to=""  v-if="!item.nav">
            <el-menu-item :index="tabindex(oneId)">
              <!--<i class="el-icon-location"></i>-->
              <i :class="['fa',item.icon,'fa-fw']"></i>
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
          </router-link>
          <el-submenu :index="tabindex(oneId)" v-else>
            <template slot="title">
              <i :class="['fa',item.icon,'fa-fw']"></i>
              <span slot="title">{{item.title}}</span>
            </template>
            <template  v-for="(subNav,subId) in item.nav">
              <el-submenu  :key="subId" :index="tabindex(oneId,subId)" v-if="subNav.nav">
                <template slot="title">
                  <i :class="['fa',item.icon,'fa-fw']"></i>
                  <span>{{subNav.title}}</span>
                </template>
                <router-link v-for="(threeNav,threeId) in subNav.nav" :key="threeId" :to="threeNav.url">
                  <el-menu-item :index="tabindex(oneId,subId,threeId)">
                    <i :class="['fa',item.icon,'fa-fw']"></i>
                    <span slot="title">{{threeNav.title}}</span>
                  </el-menu-item>
                </router-link>
              </el-submenu>
              <router-link v-else :to="subNav.url">
                <el-menu-item :index="tabindex(oneId,subId)">
                  <i :class="['fa',item.icon,'fa-fw']"></i>
                  <span slot="title">{{subNav.title}}</span>
                </el-menu-item>
              </router-link>
            </template>
          </el-submenu>
        </template>
      </el-menu>
    </el-scrollbar>
  </section>
</template>

<script>
  import {TweenLite} from "gsap";
  export default {
    props:{
      screenHeight:{
        type:Number,
        default:0
      },
      collapse:{
        type:Boolean,
        default:false
      },
      animateWidth:{
        type:String
      }
    },
    data(){
      return {
        slideWidth:200,
        tab:[
          {
            title:'导航一',
            icon:'fa-home',
            nav:[
              {
                title:'表格页',
                url:'/tab',
                icon:'fa-home'
              },
              {
                title:'图表页',
                url:'/chart',
                icon:'fa-home'
              },
              {
                title:'选项一',
                icon:'fa-home',
                nav:[
                  {
                    title:'选项1.3.1',
                    url:'/',
                    icon:'fa-home'
                  },
                  {
                    title:'选项1.3.2',
                    url:'/',
                    icon:'fa-home'
                  },
                  {
                    title:'选项1.3.3',
                    url:'/',
                    icon:'fa-home'
                  }
                ]
              }
            ]
          },
          {
            title:'导航一',
            icon:'fa-home',
            nav:[
              {
                title:'选项一',
                url:'/',
                icon:'fa-home'
              },
              {
                title:'选项一',
                url:'/',
                icon:'fa-home'
              },
              {
                title:'选项一',
                url:'/',
                icon:'fa-home'
              }
            ]
          },
          {
            title:'导航三',
            url:'/',
            icon:'fa-home'
          }
        ]
      }
    },
    methods:{
      tabindex(...args){
        let index  = args.join('-');
        if(typeof index != 'string') index = index.toString();
        return index;
      }
    }
  }
</script>

<style scoped lang="less">
  .asideNav {
    width: 200px;
    float: left;
    background-color: #2b3647;
    position: relative;
    z-index: 1000;
    .logo{
      width:auto;
      height:50px;
      position:absolute;
      left:50%;
      top: 0;
      -webkit-transform: translateX(-50%);
      -moz-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      -o-transform: translateX(-50%);
      transform: translateX(-50%);
      z-index:10;
    }
    .el-menu-vertical-demo{
      border-right-width: 0;
      &:not(.el-menu--collapse){
        width: 200px;
        span:hover{
          color:#ffffff;
        }
      }
    }
  }

</style>
