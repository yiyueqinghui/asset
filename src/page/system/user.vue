<template>
    <div id="user">
      <el-form :inline="true">
        <el-form-item class="search">
            <el-select  v-model="searchKey" placeholder="" style="width: 110px;">
              <el-option
                v-for="item in searchKeyList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <!--下拉选择 -->
            <el-select v-if="this.selectArr.indexOf(this.searchKey)>=0" :clearable="true" v-model="searchVal" placeholder="请选择" style="width:200px;left: -12px;">
              <el-option
                v-for="(item,index) in searchValList"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <!--机构以及资产类别选择-->
            <treeselect v-if="this.searchKey === 'dep_group_type' "
                        v-model="searchVal"
                        :multiple="false"
                        placeholder="请选择..."
                        :show-count="false"
                        :options="departList" />
      </el-form-item>
        <el-form-item>
          <el-button  type="primary" @click="search"  icon="el-icon-search">查寻</el-button>
          <el-button  type="primary" @click="edit(1)"  icon="el-icon-plus">新增</el-button>
          <el-button  type="primary" @click="edit(2)" icon="el-icon-edit"  >修改</el-button>
          <el-button  type="primary" @click="deleteData()" icon="el-icon-edit"  >删除</el-button>
          <el-button  type="primary" @click="batchAuth" icon="el-icon-edit"  >用户授权</el-button>
          <el-button v-if="false" type="primary"  icon="el-icon-download"  >导出</el-button>
        </el-form-item>
      </el-form>
      <el-col :span="24" :sm="24" >
           <el-table :data="employeeList"  @selection-change="handleSelectionChange" ref="multipleTable"  border stripe fit style="overflow-x: auto;margin-top: 20px;">
             <el-table-column type="selection" width="55">
             </el-table-column>
             <el-table-column type="index" label="序号" width="60" align="center">
             </el-table-column>
             <el-table-column  label="员工姓名"  prop="name"  align="center">
             </el-table-column>
             <el-table-column  label="工号" prop="job_number"  align="center">
             </el-table-column>
             <el-table-column  label="头像"  align="center">
               <template slot-scope="scope">
                  <img v-if="scope.row.avatar_attachment_url"  class="avatar_pic" :src="scope.row.avatar_attachment_url"    />
               </template>
             </el-table-column>
             <el-table-column  label="性别" prop="gender_zh"  align="center">
             </el-table-column>
             <el-table-column  label="所属部门" prop="dep_group_type_zh"  align="center">
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
             <el-table-column  label="在职状态" prop="job_status_zh"  align="center">
             </el-table-column>
             <el-table-column  label="是否启用" prop="active_zh"  align="center">
             </el-table-column>
           </el-table>

           <!--分页-->
           <el-row>
             <el-pagination
               background
               @size-change="handleSizeChange"
               @current-change="handleCurrentPage"
               :current-page="currentPage"
               :page-sizes="[10,30,50]"
               :page-size="currentPageSize"
               layout="total, sizes, prev, pager, next, jumper"
               :total="total">
             </el-pagination>
           </el-row>
         </el-col>
      <el-dialog v-if="dialogVisible"
        :close-on-click-modal="false" :close-on-press-escape="false"
        :title="title"
        :visible.sync="dialogVisible"
        width="960px"
        top="30px">
        <el-form :inline="true"  :model="employeeInfo"  label-width="auto"  class="demo-form-inline self-input border">
          <el-row>
            <el-col :sm="12">
              <SelfInput  labelName="员工编号" :required="true"  keyName="job_number" :val="employeeInfo.job_number" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
            <el-col :sm="12" v-if="dialogVisible">
              <SelfInput  labelName="员工姓名" :required="true"  keyName="name" :val="employeeInfo.name" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput  type="2" :selectList="grenderList" labelName="性别" :required="true"  keyName="gender" :val="employeeInfo.gender" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput  type="2" :selectList="jobStatusList" labelName="在职状态" :required="true"  keyName="job_status" :val="employeeInfo.job_status" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput  type="2" :selectList="activeStatusList" labelName="是否启用" :required="true"  keyName="active" :val="employeeInfo.active" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput  labelName="移动电话" :required="true"  keyName="mobile" :val="employeeInfo.mobile" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput  labelName="身份证号"   keyName="id_card" :val="employeeInfo.id_card" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput  labelName="个人邮箱"   keyName="email" :val="employeeInfo.email" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput  labelName="集团邮箱" :required="true"  keyName="company_email" :val="employeeInfo.company_email" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput  labelName="职位名称"  keyName="job_title" :val="employeeInfo.job_title" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput  labelName="办公地点" keyName="office" :val="employeeInfo.office" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput type="6" :select-list="departList"  labelName="所在部门" keyName="dep_id" :val="employeeInfo.dep_id" @changeFormVal="changeAllotVal"></SelfInput>
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
      <!--授权、修改权限-->
      <el-dialog v-if="dialogAuthVisible" :close-on-click-modal="false" :close-on-press-escape="false"
       title="用户授权"
       :visible.sync="dialogAuthVisible"
       width="960px"
       top="30px">
        <el-form :model="userAuthData" :inline="true">
          <el-row>
            <el-form-item label="授权员工">
              <el-input type="text" :value="userAuthData.idNames" :disabled="true"/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="成员权限" class="transfer">
              <el-transfer
                v-model="userAuthData.RoleIdParam"
                :data="roleList"
                :titles="['角色列表', '已授权角色']"
                :props="{
                  key: 'id',
                  label: 'name'
                }">
              </el-transfer>
            </el-form-item>
          </el-row>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAuthVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmAuth">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    import SelfInput from '../../components/common/selfInput'
    import Avatar from '../../components/common/avatar'
    import Treeselect from '@riophae/vue-treeselect'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    export default {
      name: "user",
      data(){
        return {
          searchKey:'name',
          searchKeyList: [
            {
              value:'name',
              label:'员工姓名'
            },
            {
              value:'dep_group_type',
              label:'所属部门'
            }
          ],
          searchVal:'',
          searchValList:[],
          selectArr:['name'],
          treeArr:['dep_group_type'],

          data: [],
          defaultProps:{ label:'name' },
          treeShow:false,
          currentKey:1,
          multipleSelection:[],
          currentPage:1,
          currentPageSize:10,
          total:50,
          employeeList:[],
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
          genderList:[],
          departList:[],
          uploadData:{
            name:'file'
          },
          dialogAuthVisible:false,
          userAuthData:{
            RoleIdParam:[],
            idNames:'',
            ids:[]
          },
          roleList:[]
        }
      },
      methods:{
        init(){
          this.fetchData();
        },
        uploadSuccess(res){
          let uuid = res[0].uuid;
          this.employeeInfo['avatar'] = uuid;
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
          // console.log(this.multipleSelection);
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.currentPageSize = val;
          this.fetchData();
        },
        handleCurrentPage(val) {
          console.log(`当前页: ${val}`);
          this.currentPage = val;
          this.fetchData();
        },
        checkedNode(data){
          this.employeeInfo.dep_id = data.id;
        },
        confirm(){
          this.dialogVisible = false;
        },
        changeAllotVal([key,val]){
          this.employeeInfo[key] = val;
        },
        fetchData(data){
          data = data || {};
          let defaultData = {
            page:this.currentPage,
            per_page:this.currentPageSize
          }
          data = Object.assign(defaultData,data);

          console.log(data);
          this.$axios.Asset.user('GET',data).then(res=>{
            this.employeeList = res.data;
            this.total = res.meta.total
          })
        },

        search(){
          let data = {}
          data[this.searchKey] = this.searchVal;
          this.fetchData(data);
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
        },
        batchAuth(){
          this.userAuthData = this.$Store.resetForm(this.userAuthData);

          //传递用户数据
          let selectedUsers = this.multipleSelection;
          if(selectedUsers.length === 0){
            this.$message.warning('请选择一个用户进行授权！')
            return;
          }else if(selectedUsers.length === 1){
            let names = [];
            selectedUsers.forEach(item=>{
              this.userAuthData.ids.push(item.id);
              names.push(item.name);
            })
            this.userAuthData.idNames = names.join(' 、');
          }else{
            this.$message.warning('每次只能对一个用户进行授权！')
            return;
          }

          // 角色列表
          let userData = {id:selectedUsers[0].id};
          this.$axios.System.userRole('GET',userData).then(res=>{
            let data = res.data;
            data.forEach(item=>{
              this.userAuthData.RoleIdParam.push(item.id);
            })
            this.dialogAuthVisible = true;
          })

        },
        confirmAuth(){
          this.userAuthData.ids.forEach(item=>{
            let data = {
              ids:this.userAuthData.RoleIdParam,
              id:item
            }
            this.$axios.System.userRole('POST',data).then(res=>{
              this.$message.success('授权成功！')
              this.dialogAuthVisible = false;
            })
          })
        }
      },
      watch:{
        searchKey:{
          handler(val,oldVal){
            console.log(val);
            this.searchVal = '';
            let dictionary = this.$Store.data.dictionary;
            if(val === 'name') this.searchValList = this.userList;
            else this.searchVal = null;
          }
        },
        userAuthData:{
          handler(val,oldVal){
            console.log(val);
          },
          deep:true
        }
      },
      components:{
        SelfInput,
        Avatar,
        Treeselect
      },
      created(){
        this.$Store.getDepartmentList().then((data)=>{
          this.departList = data;
        })

        this.$Store.getUserList().then((data)=>{
          this.userList = data;
          this.searchValList = data;
        })

        this.$axios.System.org('GET',{}).then((res)=>{
          this.data = res.data.tree;
          this.treeShow = true;
          this.employeeInfo.dep_id = this.data[0].id;
        })

        //角色列表
        this.$axios.Asset.role('GET',{}).then(res=>{
          this.roleList = res.data;
        })

        this.grenderList = this.$Store.data.dictionary.genderList;

        this.jobStatusList = this.$Store.data.dictionary.jobStatusList;

        this.activeStatusList = this.$Store.data.dictionary.activeStatusList;




      },
      mounted(){
        this.init();
      }


    }
</script>

<style >
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
  .avatar_pic{
    width: 30px;
    height: 30px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
  .transfer .el-checkbox{
    display: block;
  }

</style>
