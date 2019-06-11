<template>
   <div id="login" v-loading="loading">
     <el-form  class="loginInfo"  :model="login">
       <el-form-item>
         <h4>用户登录</h4>
       </el-form-item>
       <el-form-item >
         <el-input v-model="login.username" placeholder="请输入用户名"></el-input>
       </el-form-item>
       <el-form-item >
         <el-input v-model="login.password" show-password placeholder="请输入密码"></el-input>
       </el-form-item>
       <!--<el-form-item class="forgetPas">-->
           <!--<router-link to="/" >忘记密码?</router-link>-->
       <!--</el-form-item>-->
       <el-form-item>
         <el-button :type="login.username && login.password ? 'primary':'info'" style="width: 100%;" @click="submitForm">登录</el-button>
       </el-form-item>
     </el-form>
   </div>
</template>

<script>
  export default {
    name: "login",
    data(){
       return {
         login:{
           grant_type:'password',
           username:'od59Ov8r8pVOZpNc0ggk_Zceek5E',
           password:"AJq3mp1xdfxmOPYmYmsJ+qpiiQ//izukhM1Ol2jlPosjkYajNAE47k81ql+ULlcucQ=="
         },
         loading:false
       }
    },
    methods:{
      submitForm(){
        if(!this.login.username || !this.login.password) return;
        this.loading = true;
        this.$axios.Home.getToken(this.login).then(res=>{
          localStorage.setItem('token',res.access_token);
          window.location.href = "#/";
          this.loading = false;
        })
      }
    }
  }
</script>

<style lang="less">
   @color:#94cbcf;
   #login{
     width:100%;
     height: 100%;
     background:@color;
     .loginInfo{
       width: 400px;
       padding:20px 40px;
       background-color:#ffffff;
       -webkit-border-radius: 10px;
       -moz-border-radius: 10px;
       border-radius: 10px;
       position: absolute;
       top: 50%;
       left: 50%;
       transform:translate(-50%,-70%);
       h4{
         text-align: center;
         font-size: 20px;
       }
       input,button{
         -webkit-border-radius: 20px;
         -moz-border-radius: 20px;
         border-radius: 20px;
       }
       .forgetPas{
         text-align: right;
         margin-bottom: 10px;
         a{
           color: #808080;
           font-size: 16px;
           &:hover{
             color:@color;
           }
         }
       }
       .register{
         text-align:center;
         color: #808080;
         font-size: 16px;
         margin-bottom: 0px;
         span{
           font-size: 16px;
           a{
             font-size: 16px;
             color:@color;
           }
         }
       }
     }
   }
</style>
