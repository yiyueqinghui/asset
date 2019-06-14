<template>
    <div id="home">
      <el-row class="module">
        <el-col class="card" :span="8" v-for="(item,index) in data" :key="index">
          <el-card class="box-card" >
            <router-link :to="item.url">
              {{item.name}}
            </router-link>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
      data(){
        return {
          data:[
            {
              name:'资产入库',
              url:'/storage'
            },
            {
              name:'资产领用',
              url:'/'
            },
            {
              name:'资产调拨',
              url:'/'
            },
            {
              name:'资产借用',
              url:'/'
            },
            {
              name:'资产归还',
              url:'/'
            },
            {
              name:'数据统计',
              url:'/'
            }

          ]

        }
      }
    }
</script>

<style lang="less">
  #home{
    width: 900px;
    height: 100%;
    line-height: 100%;
    margin: 0 auto;
    position: relative;
    .module{
      width: 100%;
      position: absolute;
      top: 40%;
      transform: translateY(-50%);
      .card{
        text-align: center;
        margin:20px 0;
        .box-card {
          display:inline-block;
          width:200px;
          height:150px;
          line-height: 150px;
          text-align: center;
          font-weight:500;
          -webkit-border-radius: 20px;
          -moz-border-radius: 20px;
          border-radius: 20px;
          background:url('../assets/img/home-bg.jpg') no-repeat left center;
          -webkit-background-size: 100% 100%;
          background-size: 100% 100%;
          .el-card__body{
            padding: 0!important;
          }
          a{
            font-size: 18px;
            color: #ffffff;
          }
        }
      }

    }

  }



</style>
