<template>
    <div id="organization">
       <el-row style="height: 100%;" v-if="treeShow">
         <el-col :span="4" :sm="4">
           <el-tree
             ref="tree"
             :data="data"
             node-key="id"
             highlight-current
             :current-node-key="currentKey"
             :default-expanded-keys="defaultExpandIds"
             @node-click="checkedNode"
             :props="{label:'name'}">
           </el-tree>
         </el-col>
         <el-col  :span="18" :sm="18" class="detail">
           <el-row >
             <el-dropdown trigger="hover" style="margin-right: 10px;" @command="addBtn">
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
             <el-button   type="primary" @click="changeTree" icon="el-icon-edit">修改</el-button>
             <el-button  type="primary" @click="deleteTree" icon="el-icon-edit"  >删除</el-button>
           </el-row>
           <el-row class="header">
              <i class="org_icon"></i>{{treeNav}}
           </el-row>
           <el-row class="headerInfo">
             <i class="el-icon-s-home"></i> 基本信息
           </el-row>
            <table class="basicTab">
              <tr>
                <td>{{this.changeName}}编码</td>
                <td>{{ basicInfo.dep_number }}</td>
              </tr>
              <tr>
                <td>{{this.changeName}}名称</td>
                <td>{{ basicInfo.name }}</td>
              </tr>
            </table>
         </el-col>
       </el-row>

      <el-dialog :title="dialogTitle" width="960px" :visible.sync="dialogFormVisible">
        <el-form :inline="true" :model="formData" label-width="auto" v-if="dialogFormVisible"  class="demo-form-inline self-input border">
          <el-row>
              <el-col :sm="12">
                <SelfInput  :labelName="this.typeName+'编码'"   keyName="code" :val="formData.code"  @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="12">
                <SelfInput  :labelName="this.typeName+'全称'"   keyName="label" :val="formData.label"  @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
          </el-row>
          <el-row v-if="this.createType >= 3">
            <el-col :sm="12" v-if="formData.blongCompany">
              <SelfInput  labelName="所属公司"   keyName="blongCompany" :val="formData.blongCompany"  @changeFormVal="changeFormVal" :disabled="true"></SelfInput>
            </el-col>
            <el-col :sm="12" v-if="formData.blongDepart">
              <SelfInput  labelName="上级部门"   keyName="blongDepart" :val="formData.blongDepart"  @changeFormVal="changeFormVal" :disabled="true"></SelfInput>
            </el-col>
          </el-row>
          <el-row  v-else>
            <el-col :sm="12" v-if="formData.blongCompany" >
              <SelfInput  labelName="上级公司"   keyName="blongCompany" :val="formData.blongCompany"  @changeFormVal="changeFormVal" :disabled="true"></SelfInput>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改-->
      <el-dialog v-if="visible" title="修改" width="960px" :visible.sync="visible">
        <el-form :inline="true" :model="form" label-width="auto" v-if="visible"  class="demo-form-inline self-input border">
          <el-row>
            <el-col :sm="12">
              <SelfInput  :labelName="this.changeName+'编码'"   keyName="dep_number" :val="form.dep_number"  @changeFormVal="changeModifyForm"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput  :labelName="this.changeName+'全称'"   keyName="name" :val="form.name"  @changeFormVal="changeModifyForm"></SelfInput>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="confirmChange">确 定</el-button>
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
           treeShow:false,
           data: [ ],
           treeNav:'',
           treeDetail:{ },
           currentKey:'',
           defaultExpandIds:[],
           firstLevelId:[],
           basicInfo:{},
           type:1,
           formData:{
              type:'',
              code:'',
              label:'',
              blongCompany:'',
              blongDepart:''
           },
           form:{},
           visible:false,
           createType:0,
           dialogFormVisible:false
         }
      },
      methods:{
        addBtn(type){
          this.resetData();
          let firstLevelId = [];
          this.data.forEach(item=>{
            firstLevelId.push(item.id);
          })
          this.firstLevelId = firstLevelId;

          this.createType = type;
          this.formData.type = this.createType >=3?'2':'1';
          let currentKey = this.$refs.tree.getCurrentKey();
          console.log('当前节点',currentKey);
          this.currentKey = currentKey;
          if(currentKey){
            let currentData = this.$refs.tree.getCurrentNode();
            this.formData.id = currentData.id;
            if(this.firstLevelId.indexOf(currentKey) == -1){   //非顶级
              let parentData = this.getParentData(currentKey);
              this.formData.blongCompany = parentData.blongCompany;
              this.formData.blongDepart = parentData.blongDepart;

              if(this.createType == 2 || this.createType ==4 ){
                this.formData.parent_id = currentData.id;
              }else{
                this.formData.parent_id = currentData.parent_id;
              }

            }else{
              if(this.createType == 2 || this.createType ==4){   //顶级
                this.formData.blongCompany = this.$refs.tree.getCurrentNode().name;
                this.formData.parent_id = currentData.id;
              }
            }
          }else{
            this.currentKey = '';
            if(this.data.length != 0){
              this.$message({
                message: '请先选择一个公司或部门！',
                type: 'warning'
              });
              return;
            }
          }

          console.log(this.formData);
          this.dialogFormVisible = true;
        },
        resetData(){
          let data = Object.assign({},this.formData);
          Object.keys(data).forEach(item=>{
            data[item] = '';
          })
          this.formData = data;
        },
        getParentData(id){
          let that = this;
          let uperInfo = {
            blongCompany:'',
            blongDepart:''
          };
          if(this.createType == 1 || this.createType == 3){
            search(id);      //新建同级
          }else{
            let data = this.$refs.tree.getCurrentNode();
            if(data.type == '1'){
              uperInfo.blongCompany = data.label;
            }else{
              search(id);      //新建下级
              uperInfo.blongDepart = data.label;
            }

          }
          console.log(uperInfo);

          return uperInfo;

          function search(currentId){
            let parentData = that.$refs.tree.getNode(currentId).parent.data;
            var currentId = parentData.id;
            if(parentData.type === '1'){
              uperInfo.blongCompany = parentData.label
            }else if(parentData.type === '2'){
              uperInfo.blongDepart = parentData.label
            }

            if(uperInfo.blongCompany){
              return
            }else if(that.firstLevelId.indexOf(currentId) >=0){
              return
            }else{
              search(currentId);
            }
          }


        },
        changeFormVal([key,val]){
          this.formData[key] = val;
        },
        changeModifyForm([key,val]){
          this.form[key] = val;
        },
        confirm(){
          let data = {
            dep_number:this.formData.code,
            name: this.formData.label,
            group_type:this.formData.type
          }
          if(this.formData.parent_id) data['parent_id'] = this.formData.parent_id

          this.$axios.System.org('POST',data).then(res=>{
            this.$message.success('新增成功！')
            this.getTreeData(this.formData.id);
          })

          this.dialogFormVisible = false;
        },
        changeTree(){
          let checkedData = this.$refs.tree.getCurrentNode();
          if(!checkedData){
            this.$message({
              message: '请先选择一个公司或部门！',
              type: 'warning'
            });
            return;
          }
          this.form = Object.assign({},checkedData)
          console.log(this.form);
          this.visible = true;
        },
        confirmChange(){
          if(this.form.parent_id == 0) delete this.form.parent_id;
          this.$axios.System.org('PUT',this.form).then(res=>{
            this.$message.success('修改成功！')
            this.getTreeData(this.form.id);
            this.visible = false;
          })
        },
        deleteTree(){
          let checkedData = this.$refs.tree.getCurrentNode();
          if(!checkedData){
            this.$message.warning('请先选择一个公司或部门！');
            return;
          }else{
            if(checkedData.parent_id == 0) delete checkedData.parent_id;
            this.$axios.System.org('DELETE',checkedData).then(res=>{
              this.$message.success('删除成功！')
              console.log(checkedData);
              this.getTreeData(checkedData.parent_id);
            })
          }
        },
        checkedNode(data){
          this.currentKey = data.id;
          this.type = data.type;
        },
        getTreeData(current_id){
          this.$axios.System.org('GET',{}).then((res)=>{
            this.data = res.data.tree;
            this.basicInfo = {...this.data[0]};
            this.treeNav = this.data[0].name;
            if(!current_id) current_id = this.data[0].id;   //默认展开第一个
            // this.currentKey = current_id;
            this.defaultExpandIds = [];
            this.defaultExpandIds.push(current_id);
            this.treeShow = true;
          })

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
        changeName:function(){
          if(this.type == 1){
            return '公司'
          }else{
            return '部门'
          }
          console.log(this.type);
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
      watch:{
        currentKey(val,oldVal){
          if(oldVal === '') return;
          this.treeNav = '';
          let firstLev = [];
          this.data.forEach(item=>{
            firstLev.push(item.id)
          })
          let arr = [];
          let data = this.$refs.tree.getCurrentNode();
          console.log(data);
          this.basicInfo = Object.assign({},data);
          this.type = data.group_type;
          while (data){
            arr.unshift(data.name);
            if(firstLev.indexOf(data.id)>=0)  break;
            data = this.$refs.tree.getNode(data.id).parent.data;
          }
          this.treeNav = arr.join('/');
          console.log(this.treeNav);
        }
      },
      components:{
        SelfInput
      },
      mounted(){
        this.$nextTick(()=>{
          this.getTreeData();
        })
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
