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
          // this.$axios.Home.detail(data).then((res)=>{
          //   console.log(res);
          //   this.status = res.status;
          // })

          let loginData = {
            grant_type:'password',
            username:'od59Ov8r8pVOZpNc0ggk_Zceek5E',
            password:"AJq3mp1xdfxmOPYmYmsJ+qpiiQ//izukhM1Ol2jlPosjkYajNAE47k81ql+ULlcucQ=="
          }

          let icpData = {"icpMemo":"备注chaizcxx","initialRegDate":"2019-06-10","url":"http://abc.com","icpAttachment":"附件","company":"公司名称","validDate":"2019-06-10","websiteName":"网站名称","managementLicenseNo":"1122334","annualInspection":"20"};
          // let icpData = "{\"icpMemo\":\"备注chaizc\",\"initialRegDate\":\"2019-06-10\",\"url\":\"http://abc.com\",\"icpAttachment\":\"附件\",\"company\":\"公司名称\",\"validDate\":\"2019-06-10\",\"websiteName\":\"网站名称\",\"managementLicenseNo\":\"11223344\",\"annualInspection\":\"20\"}"
          let test = JSON.stringify(icpData);
          console.log(typeof test);

          icpData = JSON.stringify(JSON.stringify(icpData))
          console.log(typeof icpData);

          console.log(icpData);

          this.$axios.Home.getToken(loginData).then(res=>{
            console.log(res);
            localStorage.setItem('token',res.access_token);

            this.$axios.Home.icp(icpData).then(response=>{
              console.log(response);
            })


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
