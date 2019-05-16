<template>
    <div class="uploadExcel">
      <el-dialog title="批量导入模板" :visible.sync="visible" :before-close="close">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip" style="margin-top: 20px;">请选择要导入的资产数据文件(Excel格式)(推荐下载导入模板，填写后上传)</div>

        </el-upload>
        <!--<div slot="footer" class="dialog-footer">-->
          <!--<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
        <!--</div>-->
      </el-dialog>
    </div>
</template>

<script>
    export default {
      data(){
        return {
          visible:false,
          fileList: []
        }
      },
      methods:{
        submitUpload() {
          this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
        close(){
          this.$emit('close');
          this.visible = false;
        }
      },
      mounted(){
        this.visible = true;
      }
    }
</script>

<style scoped>

</style>
