<template>
    <div class="uploadfile">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :name="uploadData.name"
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
          headers:{}

        }
      },
      methods:{
        uploadSuccess(){
           this.$emit('uploadSuccess',[]);
        }
      }

    }
</script>

<style scoped>

</style>
