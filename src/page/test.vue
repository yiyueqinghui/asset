<template>
    <div id="home" >
       <p>首页{{msg}},请求状态 {{status }}</p>
       <div style="width:200px;height:100px;background: #000;"></div>
       <el-button @click="zoom">缩放</el-button>
    </div>
</template>

<script>
    export default {
      name: "home",
      data(){
        return {
          msg:'',
          status:0,
          show:false
        }
      },
      methods:{
        init(){
          this.msg = this.$Store.test;
          let data = {
            id:1
          }
          this.$axios.Home.detail(data).then((res)=>{
            console.log(res);
            this.status = res.status;
          })
        },
        zoom(){

        }
      },
      created(){
        this.init();
      }

    }
</script>

<style scoped lang="less">
  @color:red;

  #home{
    color:@color;
  }


</style>
