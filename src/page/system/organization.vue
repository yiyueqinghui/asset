<template>
    <div id="organization">
       <el-row style="height: 100%;">
         <el-col :span="4" :sm="4">
           <el-tree
             ref="tree"
             :data="data"
             node-key="id"
             highlight-current
             :current-node-key="currentKey">
           </el-tree>
         </el-col>
         <el-col  :span="18" :sm="18" class="detail">
           <el-row >
             <el-dropdown trigger="hover" style="margin-left: 10px;" @command="addBtn">
               <el-button type="primary">
                  新建
               </el-button>
               <el-dropdown-menu slot="dropdown">
                 <el-dropdown-item  command="1">新建同级公司</el-dropdown-item>
                 <el-dropdown-item  command="2">新建下级公司</el-dropdown-item>
                 <el-dropdown-item  command="3">新建同级部门</el-dropdown-item>
                 <el-dropdown-item  command="4">新建下级部门</el-dropdown-item>
               </el-dropdown-menu>
             </el-dropdown>
             <el-button class="btns"  type="primary" icon="el-icon-edit">修改</el-button>
             <el-button class="btns" type="primary" icon="el-icon-edit"  >删除</el-button>
           </el-row>
           <el-row class="header">
              <i class="org_icon"></i>佳禾集团/集团总部/管理层
           </el-row>
           <el-row class="headerInfo">
             <i class="el-icon-s-home"></i> 基本信息
           </el-row>
            <table class="basicTab">
              <tr>
                <td>部门编码</td>
                <td>{{ basicInfo.code }}</td>
              </tr>
              <tr>
                <td>部门编码</td>
                <td>{{ basicInfo.code }}</td>
              </tr>
            </table>
         </el-col>
       </el-row>

      <el-dialog :title="dialogTitle" width="960px" :visible.sync="dialogFormVisible">
        <el-form :model="formData" label-width="auto"  class="demo-form-inline self-input border">
          <el-row>
              <el-col :sm="12">
                <SelfInput  :labelName="this.typeName+'编码'"   keyName="code" :val="formData.code"  @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="12">
                <SelfInput  :labelName="this.typeName+'全称'"   keyName="name" :val="formData.label"  @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
          </el-row>
          <el-row v-if="this.createType >= 3">
            <el-col :sm="12">
              <SelfInput  labelName="所属公司"   keyName="blongCompany" :val="formData.blongCompany"  @changeFormVal="changeFormVal" :disabled="true"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput  labelName="上级部门"   keyName="blongDepart" :val="formData.blongDepart"  @changeFormVal="changeFormVal" :disabled="true"></SelfInput>
            </el-col>
          </el-row>
          <el-row  v-else>
            <el-col :sm="12" >
              <SelfInput  labelName="上级公司"   keyName="blongCompany" :val="formData.blongCompany"  @changeFormVal="changeFormVal" :disabled="true"></SelfInput>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>


    </div>
</template>

<script>
    import SelfInput from '../../components/common/selfInput'
    export default {
      name: "organization",
      data(){
         return {
           // type 1 公司   2 部门
           data: [
             {
               id: 1,
               label: '一级公司 1',
               code:'001',
               type:'1',
               children: [{
                 id: 4,
                 parentId:1,
                 label: '二级部门 1-1',
                 code:'002',
                 type:'2',
                 children: [{
                   id: 9,
                   parentId:4,
                   label: '三级部门 1-1-1',
                   code:'003',
                   type:'2',
                 }, {
                   id: 10,
                   parentId:4,
                   label: '三级部门 1-1-2',
                   code:'004',
                   type:'2',
                 }]
               }]
             }
           ],
           currentKey:0,
           basicInfo:{
             code:'001',
             name:'管理层',
             blongCompany:'xxxx',
             upDepart:'xxxx',
             employee:100
           },
           type:1,
           formData:{
              type:'',
              code:'',
              label:'',
              blongCompany:'',
              blongDepart:''
           },
           createType:0,
           dialogFormVisible:false

         }
      },
      methods:{
        addBtn(type){
          this.createType = type;
          this.formData.type = this.createType >=3?'1':'2';
          let currentKey = this.$refs.tree.getCurrentKey();

          let parentData = this.getParentData(currentKey);
          console.log(parentData);
          this.formData.blongCompany = parentData.blongCompany;
          this.formData.blongDepart = parentData.blongDepart;

          console.log(this.formData);

          this.dialogFormVisible = true;
        },
        getParentData(id){
          let that = this;
          let uperInfo = {
            blongCompany:'',
            blongDepart:''
          };
          search(id);
          return uperInfo;

          function search(currentId){
            let parentData = that.$refs.tree.getNode(currentId).parent.data;
            console.log(parentData);
            let level = parentData.$treeNodeId;
            console.log(level);
            var currentId = parentData.id;
            if(parentData.type === '1'){
              uperInfo.blongCompany = parentData.label
            }else if(parentData.type === '2'){
              uperInfo.blongDepart = parentData.label
            }

            if(uperInfo.blongCompany){
              return
            }else if(level == 1){
              return
            }else{
              search(currentId);
            }
          }


        },

        changeFormVal([key,val]){
          console.log(val);
          this.formData[key] = val;
        }
      },
      computed:{
        typeName:function(){
          let name = '';
          if(Number(this.createType) >= 3){
            name = '部门'
          }else{
            name = '公司'
          }
          return name;
        },
        dialogTitle:function(){
          let type = this.createType;
          if(type === '1'){
            return '新建同级公司'
          }else if(type === '2'){
            return '新建下级公司'
          }else if(type === '3'){
            return '新建同级部门'
          }else if(type === '4'){
            return '新建下级部门'
          }
        }
      },
      components:{
        SelfInput
      }
    }
</script>

<style>
  .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
    background-color:#409EFF;
    color: #ffffff;
  }
  .el-tree{
    background: transparent!important;
  }
  .el-tree-node__label{
    font-size: 17px;
  }
  #organization{
    height: 100%;
  }
  #organization .header{
    margin-top: 20px;
    padding:10px 0;
    border-top: 1px solid #bed3cf;
    border-bottom:1px solid #bed3cf;
    font-size: 17px;
  }
  #organization .btns{
    margin-left: 10px;
  }
  #organization .headerInfo{
    margin: 10px 0;
    font-size: 17px;
  }
  #organization .detail{
    height: 100%;
    padding-left: 20px;
    border-left: 1px solid #bed3cf;
  }
  #organization .org_icon{
    display: inline-block;
    width: 35px;
    height: 25px;
    background:url("../../assets/img/org_icon.png") no-repeat center center;
    background-color: #ffb319;
    vertical-align: top;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    margin-right: 10px;
  }
  .basicTab{
    width: 300px;
    padding-left: 20px;
    border-collapse: collapse;
    text-align: center;
    background-color:rgb(227,242,249);
  }
  .basicTab tr td{
    padding:10px 0;
    border: 1px solid gray;
  }
  .basicTab tr td:nth-of-type(1){
    width: 100px;
  }

</style>
