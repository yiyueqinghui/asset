<template>
    <div id="user">
       <el-row style="height: 100%;" class="userManage">
         <el-col :span="4" :sm="4" class="treeColumn">
           <el-tree
             ref="tree"
             :data="data"
             node-key="id"
             highlight-current
             :current-node-key="currentKey"
             @node-click="checkedNode">
           </el-tree>
         </el-col>
         <el-col :span="20" :sm="20" class="employeeZone">
           <el-row>
             <el-button   type="primary" @click="edit(1)"  icon="el-icon-plus">新增</el-button>
             <el-button  type="primary" @click="edit(2)" icon="el-icon-edit"  >修改</el-button>
             <el-button  type="primary" @click="deleteData()" icon="el-icon-edit"  >删除</el-button>
             <el-button  type="primary"  icon="el-icon-download"  >导出</el-button>
           </el-row>

           <el-table :data="employeeList"  @selection-change="handleSelectionChange" ref="multipleTable"  border stripe fit style="overflow-x: auto;margin-top: 20px;">
             <el-table-column type="selection" width="55">
             </el-table-column>
             <el-table-column type="index" label="序号" width="60" align="center">
             </el-table-column>
             <el-table-column  label="登录名称" prop="username"  align="center">
             </el-table-column>
             <el-table-column  label="员工姓名"  prop="name"  align="center">
             </el-table-column>
             <el-table-column  label="工号" prop="job_number"  align="center">
             </el-table-column>
             <el-table-column  label="头像" prop="avatar"  align="center">
             </el-table-column>
             <el-table-column  label="性别" prop="gender"  align="center">
             </el-table-column>
             <el-table-column  label="所属公司" prop="blongCompany"  align="center">
             </el-table-column>
             <el-table-column  label="所属部门" prop="blongDepart"  align="center">
             </el-table-column>
             <el-table-column  label="移动电话" width="120" prop="mobile"  align="center">
             </el-table-column>
             <el-table-column  label="身份证" prop="id_card"  align="center">
             </el-table-column>
             <el-table-column  label="个人邮箱" width="140" prop="email"  align="center">
             </el-table-column>
             <el-table-column  label="集团邮箱" width="170" prop="company_email"  align="center">
             </el-table-column>
             <el-table-column  label="职位名称" prop="job_title"  align="center">
             </el-table-column>
             <el-table-column  label="办公地点" prop="office"  align="center">
             </el-table-column>
             <el-table-column  label="在职状态" prop="job_status"  align="center">
             </el-table-column>
             <el-table-column  label="是否启用" prop="active"  align="center">
             </el-table-column>
           </el-table>
           <!--分页-->
           <el-row>
             <el-pagination
               background
               @size-change="handleSizeChange"
               @current-change="handleCurrentPage"
               :current-page="currentPage"
               :page-sizes="[5,10,30,50]"
               :page-size="5"
               layout="total, sizes, prev, pager, next, jumper"
               :total="total">
             </el-pagination>
           </el-row>
         </el-col>
       </el-row>
      <el-dialog
        :close-on-click-modal="false" :close-on-press-escape="false"
        :title="title"
        :visible.sync="dialogVisible"
        width="960px"
        top="80px">
        <el-form :inline="true" v-if="dialogVisible" :model="employeeInfo"  label-width="auto"  class="demo-form-inline self-input border">
          <el-row>
            <el-col :sm="12">
              <SelfInput v-if="dialogVisible" labelName="员工编号" :required="true"  keyName="job_number" :val="employeeInfo.job_number" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput v-if="dialogVisible" labelName="员工姓名" :required="true"  keyName="name" :val="employeeInfo.name" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput v-if="dialogVisible" type="1" :selectList="sexList" labelName="性别" :required="true"  keyName="gender" :val="employeeInfo.gender" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput v-if="dialogVisible" type="1" :selectList="companyList" labelName="在职状态" :required="true"  keyName="job_status" :val="employeeInfo.job_status" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput v-if="dialogVisible" type="1" :selectList="departList" labelName="是否启用" :required="true"  keyName="active" :val="employeeInfo.active" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput v-if="dialogVisible" labelName="移动电话" :required="true"  keyName="mobile" :val="employeeInfo.mobile" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput v-if="dialogVisible" labelName="身份证号"   keyName="id_card" :val="employeeInfo.id_card" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput v-if="dialogVisible" labelName="个人邮箱"   keyName="email" :val="employeeInfo.email" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput v-if="dialogVisible" labelName="集团邮箱" :required="true"  keyName="company_email" :val="employeeInfo.company_email" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput v-if="dialogVisible" labelName="职位名称"  keyName="job_title" :val="employeeInfo.job_title" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput v-if="dialogVisible" labelName="办公地点" keyName="office" :val="employeeInfo.office" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput v-if="dialogVisible" labelName="登录姓名" keyName="username" :val="employeeInfo.username" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="10">
              <SelfInput v-if="dialogVisible" labelName="部门" keyName="dep_id" :val="employeeInfo.dep_id" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <el-form-item label="头像上传">
                <Avatar :upload-data="uploadData" v-on:uploadSuccess="uploadSuccess"></Avatar>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmBtn">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    import SelfInput from '../../components/common/selfInput'
    import Avatar from '../../components/common/avatar'
    export default {
      name: "user",
      data(){
        return {
          data: [
            {
              id: 1,
              label: '一级公司 1',
              code:'001',
              type:'1',
              children: [{
                id: 4,
                label: '二级部门 1-1',
                code:'002',
                type:'2',
                children: [{
                  id: 9,
                  label: '三级部门 1-1-1',
                  code:'003',
                  type:'2',
                }, {
                  id: 10,
                  label: '三级部门 1-1-2',
                  code:'004',
                  type:'2',
                }]
              }]
            }

          ],
          currentKey:1,
          multipleSelection:[],
          currentPage:1,
          total:50,
          employeeList:[

          ],
          dialogVisible:false,
          employeeInfo:{
            avatar:'',
            active:'',
            job_status:'',
            mobile:'',
            office:'',
            gender:'',
            id_card:'',
            job_title:'',
            company_email:'',
            email:'',
            job_number:'',
            name:'',
            username:'',
            dep_id:''
          },
          title:'新增',
          sexList:[
            {
              code:1,
              value:'男'
            },
            {
              code:2,
              value:'女'
            }
          ],
          companyList:[
            {
              code:1,
              value:'公司一'
            },
            {
              code:2,
              value:'公司二'
            }
          ],
          departList:[
            {
              code:1,
              value:'部门一'
            },
            {
              code:2,
              value:'部门二'
            }
          ],
          uploadData:{
            name:'file'
          }
        }
      },
      methods:{
        init(){
          this.fetchData();
        },
        uploadSuccess(res){
          let uuid = res[0].uuid;
          console.log('uuid == ' + uuid);
          this.employeeInfo['avatar'] = uuid;
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
          // console.log(this.multipleSelection);
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentPage(val) {
          console.log(`当前页: ${val}`);
          this.currentPage = val;
        },
        checkedNode(data){
          console.log(data);
        },
        confirm(){
          this.dialogVisible = false;
        },
        changeAllotVal([key,val]){
          this.employeeInfo[key] = val;
        },
        fetchData(){
          this.$axios.Asset.user('GET',{}).then(res=>{
            console.log(" result ==++++====" + JSON.stringify(res.data));
            this.employeeList = res.data;
            this.total = res.meta.total
          })
        },
        // 新增,修改
        edit(type){
          this.title = type == 1 ? '新增':'修改';
          // this.employeeInfo = this.$Store.resetForm(this.formData);
          if(type === 2){
            console.log(JSON.stringify(this.multipleSelection));
            if(this.multipleSelection.length === 1){
              this.employeeInfo = Object.assign({},this.multipleSelection[0]);
              console.log(JSON.stringify(this.formData));
              // this.validDate = this.formData.validDate.split('-');
            }else{
              this.$message({
                message:'请选择一条要修改的数据',
                type:'warning'
              })
              return;
            }
          }
          this.dialogVisible = true;
        },
        confirmBtn(){
          let id = this.employeeInfo.id;
          let data = this.employeeInfo;
          if(this.title == '新增'){
            // TODO 暂且用于测试
            data.asset_ids = [1]
            this.$axios.Asset.user('POST',data).then(res=>{
              // this.tipMessage('新增成功！');
              this.$message({
                message:'新增成功！',
                type:'success'
              })
              this.fetchData();
              this.dialogVisible = false;
            })
          }else{
            this.$axios.Asset.user('PUT',data).then(res=>{
              console.log(res);
              this.$message({
                message:'修改成功！',
                type:'success'
              })
              this.fetchData();
              this.dialogVisible = false;
            }).catch(error=>{
              // TODO error result
            })
          }
        },
        deleteData(){
          if(this.multipleSelection.length === 0){
            this.$message({
              message:'请选择一条要删除的数据',
              type:'warning'
            })
            return;
          }else{
            let data = this.multipleSelection;
            let deleteNum = 0;
            data.forEach(item=>{
              this.$axios.Asset.user('DELETE',item).then(res=>{
                deleteNum+=1;
                if(data.length === deleteNum){
                  this.tipMessage('删除成功！');
                  this.fetchData();
                }
              })
            })
          }
        },
        tipMessage(msg,type){
          type = type ? type : 'success';
          this.$message({
            message:msg,
            type:type,
            duration:1500
          })
        }
      },
      watch:{
        employeeInfo:{
          handler:function(val,oldVal){
            console.log(val);
          },
          deep:true
        }
      },
      mounted(){
        this.init();

      },
      components:{
        SelfInput,
        Avatar
      }

    }
</script>

<style>
  #user{
    height: 100%;
  }
  #user .userManage{
    height: 100%;
  }
  #user .treeColumn{
    padding-right: 10px;
  }
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
  .employeeZone{
    height: 100%;
    padding-left: 20px;
    border-left: 1px solid #bed3cf;

  }

</style>
