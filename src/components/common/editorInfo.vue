<template>
    <div id="editorInfo">
      <el-form class="formInfo"   :model="formData"  label-width="80px" label-position="left">
        <el-row class="dialog_subtitle">{{textObj.title}}</el-row>
        <el-row class="creatorInfo">
          <el-col :span="6" :sm="6" style="padding-right: 20px;">
            <el-form-item label="姓名">
              <el-input v-model="formData.name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :sm="6" >
            <el-form-item label="所在机构" style="padding-right: 20px;">
              <el-input v-model="formData.blongOrg" :disabled="true" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :sm="6">
            <el-form-item label="所在部门" style="padding-right: 20px;">
              <el-input v-model="formData.blongDep" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :sm="6" >
            <el-form-item :label="textObj.label" style="padding-right: 20px;">
              <el-input v-if="visible" v-model="formData.editDate" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
</template>

<script>
    export default {
      props:{
        editDate:{
          type:String,
          default:''
        },
        textObj:{
          type:Object,
          default:function(){
            return {
              title:'录入人信息',
              label:'录入时间'
            }
          }
        }
      },
      data(){
        return {
          formData:{
            name:'',
            blongOrg:'',
            blongDep:'',
            editDate:''
          },
          visible:true
        }
      },
      methods:{
        updateDate(date){
          this.formData.editDate = date;
          this.visible = false;
          this.visible = true;
        }
      },
      mounted(){
        this.formData = Object.assign({},this.$Store.editorInfo);
        this.formData.editDate = this.editDate;
        console.log(this.editDate);

      }

    }
</script>

<style lang="less" >
   #editorInfo{
     height: 100px;
     overflow: hidden;
     .formInfo{
       .el-form-item label:after {
         content: " ";
         display: inline-block;
         width: 100%;
       }

       .el-form-item__label {
         text-align: justify
       }
       /* 这里去除必选字段的*,这个符号会造成一定影响,去掉之后我用了li列表进行定位,在前面加上" * ". */
       .el-form-item.is-required .el-form-item__label:before {
         content: none !important;
       }
     }
   }
</style>
