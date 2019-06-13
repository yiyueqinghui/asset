<template>
  <div class="container">
    <!--侧边导航 -->
    <slide-nav :screenHeight="screenHeight" :animateWidth="animateWidth" :collapse="collapse"></slide-nav>
    <!--右侧主体 -->
    <section class="rightContainer" :style="{paddingLeft:animateWidth+'px'}">
      <!--头部-->
      <header class="header" :style="{height:headerHeight+'px',lineHeight:headerHeight+'px'}">
        <el-row>
          <div style="display: inline-block;float: left;">
            <i :class="[collapse?'el-icon-s-unfold':'el-icon-s-fold','fold-icon']" @click="foldSlider"></i>
          </div>
          <div style="display: inline-block;float: left;">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item v-for="(item,index) in titleNav" :key="index">{{item}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div style="display: inline-block;float:right;">
            <el-dropdown >
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span>流年</span>
          </div>
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
  import slideNav from '../components/slideNav'
  export default {
    data() {
      return {
        slideWidth:200,
        screenHeight:0,
        headerHeight:50,
        containerHeight:0,
        wrapClass:{
          wrapClass:true
        },
        collapse:false,
        titleNav:['首页']
      }
    },
    methods:{
      adjustScreen(){
        this.screenHeight = document.documentElement.clientHeight;
        this.containerHeight = this.screenHeight - this.headerHeight;
        let screenWidth = document.documentElement.clientWidth;
        console.log(screenWidth);
        this.collapse = screenWidth>=768? false:true;

        localStorage.setItem('baseApi',process.env.API_ROOT)
      },
      init(){
        this.adjustScreen();
        window.onresize = this.adjustScreen;
      },
      foldSlider(){
        this.collapse = !this.collapse;
      }

    },
    watch:{
      collapse(newValue){
        let slideWidth = newValue?64:200;
        TweenLite.to(this.$data, .5, { slideWidth:slideWidth });
      },
      $route: {
        handler:function(val, oldVal){
          let arr = [];
          val.matched.forEach(item=>{
            if(item.meta && typeof item.meta == 'string'){
              arr.push(item.meta);
            }
          })
          this.titleNav = arr;
        },
        deep: true
      }
    },
    computed:{
      animateWidth:function(){
        return this.slideWidth.toFixed(0);
      }
    },
    components:{
      slideNav
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

    .rightContainer{
      width: 100%;
      height: 100%;
      position: relative;
      header {
        padding:0 20px;
        background-color: #B3C0D1;
        color: #333;
        text-align: right;
        box-sizing: border-box;
        .fold-icon{
          font-size: 20px;
          padding-right: 20px;
        }
        .el-breadcrumb{
          line-height: 50px;
          font-size: 15px;
          .el-breadcrumb__separator{
            margin: 0 5px;
            color: #606266;
          }
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




</style>
