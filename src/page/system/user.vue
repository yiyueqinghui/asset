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
             <el-button   type="primary" @click="edit(1)"  icon="el-icon-plus">人员新增</el-button>
             <el-button  type="primary" @click="edit(2)" icon="el-icon-edit"  >修改</el-button>
             <el-button  type="primary" @click="edit(3)" icon="el-icon-edit"  >删除</el-button>
             <el-button  type="primary"  icon="el-icon-download"  >导出</el-button>
           </el-row>

           <el-table :data="employeeList"  @selection-change="handleSelectionChange" ref="multipleTable"  border stripe fit style="overflow-x: auto;margin-top: 20px;">
             <el-table-column type="selection" width="55">
             </el-table-column>
             <el-table-column type="index" label="序号" width="60" align="center">
             </el-table-column>
             <el-table-column  label="员工编号" prop="code"  align="center">
             </el-table-column>
             <el-table-column  label="员工姓名"  prop="name"  align="center">
             </el-table-column>
             <el-table-column  label="性别" prop="sex"  align="center">
             </el-table-column>
             <el-table-column  label="所属公司" prop="blongCompany"  align="center">
             </el-table-column>
             <el-table-column  label="所属部门" prop="blongDepart"  align="center">
             </el-table-column>
             <el-table-column  label="移动电话" width="120" prop="mobile"  align="center">
             </el-table-column>
             <el-table-column  label="身份证号" width="140" prop="identityCard"  align="center">
             </el-table-column>
             <el-table-column  label="个人邮箱" width="140" prop="selfEmail"  align="center">
             </el-table-column>
             <el-table-column  label="集团邮箱" width="170" prop="groupEmail"  align="center">
             </el-table-column>
             <el-table-column  label="职位名称" prop="employeeName"  align="center">
             </el-table-column>
             <el-table-column  label="办公地点" prop="site"  align="center">
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
              <SelfInput v-if="dialogVisible" labelName="员工编号" :required="true"  keyName="code" :val="employeeInfo.code" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput v-if="dialogVisible" labelName="员工姓名" :required="true"  keyName="name" :val="employeeInfo.name" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput v-if="dialogVisible" type="2" :selectList="sexList" labelName="性别" :required="true"  keyName="sex" :val="employeeInfo.sex" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput v-if="dialogVisible" type="2" :selectList="companyList" labelName="所属公司" :required="true"  keyName="blongCompany" :val="employeeInfo.blongCompany" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput v-if="dialogVisible" type="2" :selectList="departList" labelName="所属部门" :required="true"  keyName="blongDepart" :val="employeeInfo.blongDepart" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput v-if="dialogVisible" labelName="移动电话" :required="true"  keyName="mobile" :val="employeeInfo.mobile" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput v-if="dialogVisible" labelName="身份证号"   keyName="identifyCard" :val="employeeInfo.identifyCard" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput v-if="dialogVisible" labelName="个人邮箱"   keyName="selfEmail" :val="employeeInfo.slefEmail" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput v-if="dialogVisible" labelName="集团邮箱" :required="true"  keyName="groupEmail" :val="employeeInfo.groupEmail" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput v-if="dialogVisible" labelName="职位名称"  keyName="employeeName" :val="employeeInfo.employeeName" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput v-if="dialogVisible" labelName="办公地点" keyName="site" :val="employeeInfo.site" @changeFormVal="changeAllotVal"></SelfInput>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    import SelfInput from '../../components/common/selfInput'
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
            {
              code:'001',
              name:'cj',
              sex:'男',
              blongCompany:'公司一',
              blongDepart:'部门一',
              mobile:'18310097654',
              identifyCard:'xxx',
              slefEmail:'12345678@qq.com',
              groupEmail:'65432veragroup.com',
              employeeName:'普工',
              site:'北京'
            },
            {
              code:'002',
              name:'cj',
              sex:'男',
              blongCompany:'',
              blongDepart:'',
              mobile:'',
              identifyCard:'',
              slefEmail:'',
              groupEmail:'',
              employeeName:'',
              site:''
            }
          ],
          dialogVisible:false,
          employeeInfo:{
            code:'',
            name:'',
            sex:'',
            blongCompany:'',
            blongDepart:'',
            mobile:'',
            identifyCard:'',
            slefEmail:'',
            groupEmail:'',
            employeeName:'',
            site:''
          },
          title:'人员新增',
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
        }
      },
      methods:{
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
        edit(type){
          let resetData = this.$Store.resetForm(this.employeeInfo);
          this.employeeInfo = resetData;
          if(type === 1){
            this.dialogVisible = true;
            this.title = '人员新增'
          }else if(type === 2){
            if(this.multipleSelection.length === 1){
              this.employeeInfo = this.multipleSelection[0];
              this.dialogVisible = true;
              this.title = '修改员工信息'
            }else{
              this.$message({
                type:'warning',
                message:'请选择一条要修改的数据'
              })
            }
          }else if(type === 3){
            if(this.multipleSelection.length >= 1) {
              this.$message({
                type:'success',
                message:'删除成功！'
              })

            }else{
              this.$message({
                type:'warning',
                message:'请选择要删除的数据'
              })
            }
          }
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
      components:{
        SelfInput
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
