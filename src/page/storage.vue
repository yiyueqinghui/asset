<template>
    <div id="storage">
      <EditorInfo :edit-date="formData.editDate"></EditorInfo>
      <el-form :inline="true" :model="formData"  label-width="auto"  class="demo-form-inline self-input">
        <el-row class="dialog_subtitle">基本信息</el-row>
        <el-row>
          <el-col :sm="8" class="category">
            <el-form-item label="资产类型">
              <treeselect v-model="value" :multiple="false" :options="options" />
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <SelfInput  labelName="资产名称" keyName="name" :val="formData.name" :required="true"  @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-col :sm="8">
            <SelfInput  labelName="资产编码" keyName="assetNo" :val="formData.assetNo" :required="true" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-col :sm="8">
            <SelfInput  labelName="规格型号" keyName="model" :val="formData.model" :required="true" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-col :sm="8">
            <SelfInput  labelName="SN号" keyName="serialNo" :val="formData.serialNo" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-col :sm="8">
            <SelfInput  type="3" labelName="购入时间" keyName="purchaseDate" :val="formData.purchaseDate" :required="true" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-col :sm="8">
            <SelfInput type="2" labelName="所属机构" :selectList="orgList"  keyName="blongOrg" :val="formData.blongOrg" :required="true" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-col :sm="8">
            <SelfInput labelName="发票号码" keyName="invoice" :val="formData.invoice" :required="true" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-col :sm="8">
            <SelfInput type="5" labelName="实付金额" keyName="amount" :val="formData.amount" :required="true" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-col :sm="8">
            <SelfInput type="2" labelName="使用机构" :selectList="orgList" keyName="useOrg" :val="formData.useOrg" :required="true" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-col :sm="8">
            <SelfInput labelName="使用人" keyName="usePerson" :val="formData.usePerson" :required="true" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-col :sm="8">
            <SelfInput  labelName="存放地点"  keyName="storedPosition" :val="formData.storedPosition" :required="true" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <SelfInput type="4" labelName="备注"  keyName="memo" :val="formData.memo" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
        </el-row>
        <el-row style="text-align:left">
            <el-button @click="reset">重置</el-button>
            <el-button type="primary" @click="confirmBtn" v-loading.fullscreen.lock="fullscreenLoading">确 定</el-button>
        </el-row>
      </el-form>
    </div>
</template>

<script>
    import EditorInfo from '../components/common/editorInfo'
    import SelfInput from '../components/common/selfInput'
    import Treeselect from '@riophae/vue-treeselect'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    export default {
      data(){
        return {
          formData:{
            "editDate":'',
            "allocation": "调拨记录",
            "status": "资产状态",
            "usageId": "使用记录",
            "serialNo": "SN号",
            "model": "规格型号",
            "category": "资产类别",
            "name": "资产名称",
            "storedPosition": "存放地点",
            "assetNo": "资产编码",
            "amount": "实付金额",
            "purchaseDate": "",
            "memo": "资产备注",
            "source": "资产来源",
            "invoice": "发票号码",

            "blongOrg":"",
            "useOrg":""
          },
          categoryList:[],
          orgList:[],
          fullscreenLoading:false,
          value: null,
          // define options
          options: [
            {
              id: 'a',
              label: 'a',
              children: [ {
                id: 'aa',
                label: 'aa',
              }, {
                id: 'ab',
                label: 'ab',
              } ],
            }, {
              id: 'b',
              label: 'b',
            }, {
              id: 'c',
              label: 'c',
            }
          ]
        }
      },
      methods:{
        init(){

        },
        changeFormVal([key,val]){
          console.log(key,val);
          this.formData[key] = val;
          console.log(this.formData);
        },
        reset(){

        },
        confirmBtn(){

        }

      },
      components:{
        EditorInfo,
        SelfInput,
        Treeselect
      },
      created(){
        // this.formData.editDate = this.$Store.formatDate();
        // console.log(this.formData.editDate);
      },
      mounted(){
        this.$nextTick(()=>{

        })
      }
    }
</script>

<style>
  .vue-treeselect__control{
    width: 180px;
    height: 40px;
    line-height: 40px;
  }
  .category{
    height: 62px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

</style>
