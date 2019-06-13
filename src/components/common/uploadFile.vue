<template>
    <div class="uploadfile">
      <el-upload
        class="upload-demo"
        action='/upload-api/api/file/upload'
        :data="{module:uploadData.name}"
         name="fileName"
        :headers="headers"
        :on-success="uploadSuccess"
        :multiple="false"
        :limit="1">
        <el-button size="small" type="primary">上传附件</el-button>
      </el-upload>
    </div>
</template>

<script>
    export default {
      props:{
        uploadData:{
          type:Object,
          default:function(){
            return {
              name:'file',
              url:''
            }
          }
        }
      },
      data(){
        return {
          headers:{},
          uploadStatus:'default'
        }
      },
      methods:{
        uploadSuccess(res){
           console.log(res);
           if(res.code == '0'){
             this.uploadStatus = '0';
             this.$emit('uploadSuccess',[res,this.uploadData.name]);
           }else{
             this.uploadStatus = '1';
             this.$message({
               message:'上传失败！',
               type:'warning'
             })
           }
        }
      }

    }
</script>

<style lang="less">
  .uploadfile{
     width:300px;
    .upload-demo{
      display: inline-block;
      .el-upload{
        margin-right: 100px;
      }
    }
    .el-upload-list{
      display: inline-block;
      vertical-align: top;
    }
  }

</style>
