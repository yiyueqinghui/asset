<template>
  <div class="container">
    <!--侧边导航 -->
    <section  class="asideNav" :style="{width:animateWidth+'px',height:screenHeight+'px'}">
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
    <!--右侧主体 -->
    <section class="rightContainer" :style="{paddingLeft:animateWidth+'px'}">
      <!--头部-->
      <header class="header" :style="{height:headerHeight+'px',lineHeight:headerHeight+'px'}">
        <el-row>
          <el-col :span="4" :sm="4" style="text-align: left;">
            <i :class="[collapse?'el-icon-s-unfold':'el-icon-s-fold','fold-icon']" @click="foldSlider"></i>
          </el-col>
          <el-col :span="20" :sm="20">
            <el-dropdown >
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span>王小虎</span>
          </el-col>
        </el-row>
      </header>
      <!--主体内容-->
      <section class="content" :style="{height:containerHeight+'px',minHeight:containerHeight+'px'}">
         <router-view></router-view>
      </section>
    </section>
  </div>


</template>


<script>
  import {TweenLite} from "gsap";
  export default {
    data() {
      return {
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
        ],
        slideWidth:200,
        screenHeight:0,
        headerHeight:50,
        containerHeight:0,
        wrapClass:{
          wrapClass:true
        },
        collapse:false
      }
    },
    methods:{
      adjustScreen(){
        this.screenHeight = document.documentElement.clientHeight;
        this.containerHeight = this.screenHeight - this.headerHeight;
        let screenWidth = document.documentElement.clientWidth;
        console.log(screenWidth);
        this.collapse = screenWidth>=768? false:true;
      },
      init(){
        this.adjustScreen();
        window.onresize = this.adjustScreen;
      },
      tabindex(...args){
        let index  = args.join('-');
        if(typeof index != 'string') index = index.toString();
        return index;
      },
      foldSlider(){
        this.collapse = !this.collapse;
      }

    },
    watch:{
      collapse(newValue){
        let slideWidth = newValue?64:200;
        TweenLite.to(this.$data, .5, { slideWidth:slideWidth });
      }
    },
    computed:{
      animateWidth: function() {
        return this.slideWidth.toFixed(0);
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.init();
      })
    }
  };
</script>

<style lang="less">
  @slideWidth:200px;

  .container{
    height:100%;
    border: 1px solid #eee;
    box-sizing: border-box;
    overflow: hidden;
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
    .rightContainer{
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 100;
      header {
        padding:0 20px;
        background-color: #B3C0D1;
        color: #333;
        text-align: right;
        box-sizing: border-box;
        .fold-icon{
          font-size: 20px;
        }
      }
      .content{
        padding:10px 20px 0 20px;
        width:100%;
        overflow-y: auto;
        overflow-x:auto;
        background-color: #ecf0f5;
        padding-left: 20px;
      }
    }



  }
  .el-scrollbar__wrap{
    overflow-x:hidden;
  }




</style>
