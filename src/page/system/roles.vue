<template>
    <div id="roles">
      <!--功能区域-->
      <el-row>
        <el-button  type="primary" icon="el-icon-plus" @click="editRole(1)">新建角色</el-button>
        <el-button  v-if="false" type="primary" icon="el-icon-edit"  @click="editRole(2)">修改</el-button>
        <el-button  type="primary" icon="el-icon-edit"  @click="deleteRole">删除角色</el-button>
        <el-button  type="primary" icon="el-icon-plus" @click="authRole">角色授权</el-button>
        <el-button  v-if="false" type="primary" icon="el-icon-s-custom" @click="assignUser" >分配用户</el-button>
      </el-row>

      <!--角色列表-->
      <el-row>
        <el-table :data="roleData" class="roleTab"  @selection-change="handleSelectionChange" ref="multipleTable"  border stripe fit style="overflow-x: auto">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column type="index" label="序号" width="60" align="center">
          </el-table-column>
          <el-table-column  label="角色名称" class="roleName" prop="name"  align="center">
          </el-table-column>
          <el-table-column  label="备注" prop="comment"  align="center">
          </el-table-column>
        </el-table>
      </el-row>

      <!--新建角色-->
      <el-dialog
        :close-on-click-modal="false" :close-on-press-escape="false"
        title="新建角色"
        :visible.sync="createVisible"
        width="560px"
        top="80px">
        <el-form  :inline="true" :model="createForm"  label-width="auto"  class="demo-form-inline self-input">
          <el-form-item label="角色名称">
            <el-input v-model="createForm.name"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" :rows="3"  v-model="createForm.comment"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="createVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmBtn">确 定</el-button>
        </div>
      </el-dialog>

      <!--编辑角色-->
      <el-dialog v-if="false"
        class="editDialog"
        :close-on-click-modal="false" :close-on-press-escape="false"
        title="修改角色"
        :visible.sync="editVisible"
        width="560px"
        top="80px">
        <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">角色信息</el-menu-item>
          <el-menu-item index="2">角色权限</el-menu-item>
          <el-menu-item index="3">成员列表</el-menu-item>
        </el-menu>
        <!--角色信息-->
        <el-form  :inline="true" v-if="currentIndex === 1" :model="createForm"  label-width="auto"  class="demo-form-inline self-input">
          <el-form-item label="角色名称">
            <el-input v-model="createForm.name"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" :rows="3"  v-model="createForm.comment"></el-input>
          </el-form-item>
        </el-form>
        <!--角色权限-->
        <el-row v-if="currentIndex === 2">
          <el-tree
            highlight-current
            :data="roleAuth"
            show-checkbox
            node-key="id"
            :default-expanded-keys="expandedKeys"
            :default-checked-keys="checkedKeys"
            :current-node-key="currentKey"
            @check="checkedChange"
            :props="defaultProps">
          </el-tree>
        </el-row>
        <!--成员列表-->
        <el-row v-if="currentIndex === 3">
          <el-row class="personZone">
            <el-button   type="primary" icon="el-icon-plus" @click="addPerson">添加人员</el-button>
            <el-button  type="primary" icon="el-icon-edit"  @click="deletePerson">删除</el-button>
            <el-input v-model="searchVal"  suffix-icon="el-icon-search" @blur="searchPerson" class="search"  placeholder="请输入内容进行查寻"/>
          </el-row>
          <el-scrollbar class="dialogZone">
            <el-table :data="personData" class="personTab"  @selection-change="handleSelection"  border stripe fit style="overflow-x: auto">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column type="index" label="序号" width="60" align="center">
              </el-table-column>
              <el-table-column  label="姓名" prop="name"  align="center">
              </el-table-column>
              <el-table-column  label="所在机构" prop="blongDepart"  align="center">
              </el-table-column>
              <el-table-column  label="职位名称" prop="employee"  align="center">
              </el-table-column>
            </el-table>
          </el-scrollbar>
        </el-row>

        <div slot="footer" class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmBtn">确 定</el-button>
        </div>
      </el-dialog>

      <!--角色授权-->
      <el-dialog v-if="authVisible"
        :close-on-click-modal="false" :close-on-press-escape="false"
        title="角色授权"
        :visible.sync="authVisible"
        width="560px"
        top="30px">
        <el-scrollbar class="dialogZone">
           <el-form  :inline="true" :model="authForm"  label-width="auto"  class="demo-form-inline self-input">
              <el-row>
                <el-form-item label="角色名称">
                  <el-input disabled="disabled" v-model="authForm.name"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="角色授权">
                  <el-tree
                    highlight-current
                    :data="roleAuth"
                    show-checkbox
                    node-key="id"
                    :default-expanded-keys="expandedKeys"
                    :default-checked-keys="checkedKeys"
                    :current-node-key="currentKey"
                    @check="checkedChange"
                    :props="defaultProps">
                  </el-tree>
                </el-form-item>
              </el-row>
        </el-form>
        </el-scrollbar>
        <div slot="footer" class="dialog-footer">
          <el-button @click="authVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmAuth">确 定</el-button>
        </div>
      </el-dialog>

      <!--分配用户-->
      <el-dialog v-if="false"
        :close-on-click-modal="false" :close-on-press-escape="false"
        title="分配用户"
        :visible.sync="userVisible"
        width="560px"
        top="80px">
        <el-form  :inline="true" :model="userForm"  label-width="auto"  class="demo-form-inline assign">
          <el-form-item label="角色名称">
            <el-input disabled="disabled" v-model="userForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="用户">
            <el-cascader
              :value="userForm.userList"
              :options="options"
              :props="propsData"
              :show-all-levels="false"
              filterable
              clearable>
              <template slot-scope="{ node, data }">
                <span>{{ data.label }}</span>
                <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
              </template>
            </el-cascader>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="userVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmAssign">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
      name: "roles",
      data(){
        return {
          propsData: { multiple: true, expandTrigger: 'hover'},
          roleData:[],
          multipleSelection:[],
          createVisible:false,
          createForm:{
            roleName:'',
            remarks:''
          },
          editVisible:false,
          currentIndex:1,
          roleAuth:[ ],
          expandedKeys:[],
          checkedKeys:[],
          defaultProps:{label:'name'},
          currentKey:'',
          searchVal:'',
          personData:[],
          personSelection:[],
          authVisible:false,
          authForm:{
            roleName:''
          },
          userForm:{
            roleName:'',
            userList:[]
          },
          userVisible:false,
          options: []

        }
      },
      methods:{
        init(){
          this.fetchData();
        },
        fetchData(){
          this.$axios.Asset.role('GET',{}).then(res=>{
            this.roleData = res.data;
          })
        },
        // 新增
        editRole(type){
          this.title = '新增';
          this.createForm = this.$Store.resetForm(this.createForm);
          this.createVisible = true;
        },
        confirmBtn(){
          let id = this.createForm.id;
          let data = this.createForm;
          this.$axios.Asset.role('POST',data).then(res=>{
            this.$message.success('新增成功！')
            this.fetchData();
            this.createVisible = false;
          })
        },
        deleteRole(){
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
              this.$axios.Asset.role('DELETE',item).then(res=>{
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
        handleSelectionChange(val) {
          this.multipleSelection = val;
          console.log(this.multipleSelection);
        },
        handleSelection(val){
          this.personSelection = val;
        },
        confirmCreate(){
          this.createVisible = false;
        },
        confirmEdit(){
          this.editVisible = false;
        },
        handleSelect(key) {
          this.currentIndex = Number(key);
          console.log(key);
        },
        checkedChange(data,status){
          console.log(status);
          this.checkedKeys = status.checkedKeys;
        },
        addPerson(){

        },
        deletePerson(){

        },
        searchPerson(){

        },
        authRole(){
          this.authForm = Object.assign({},this.multipleSelection[0]);
          let data = {id:this.authForm.id};

          if(this.multipleSelection.length === 1){
            this.$axios.System.rbacGrant('GET',data).then(res=>{
                this.roleAuth = res.data.permissions.tree;
                this.checkedKeys = res.data.checked_keys;
                this.expandedKeys = res.data.checked_keys;
                this.authVisible = true;
            })
          }else{
            this.$message.warning('请选择一个要授权的角色');
          }

        },
        assignUser(){
          if(this.multipleSelection.length === 1){
            this.userForm = Object.assign({},this.userForm,this.multipleSelection[0]);
            this.userVisible = true;
          }else{
            this.$message({
              type:'warning',
              message:'请选择一个要授权的角色'
            })
          }
        },
        confirmAuth(){
          let data = {
            id:this.authForm.id,
            ids:this.checkedKeys
          }
          this.$axios.System.rbacGrant('POST',data).then(res=>{
            this.$message.success('授权成功！');
            this.authVisible = false;
          })
        },
        confirmAssign(){
          this.userVisible = false;
        }


      },
      watch:{
        userForm: {
          handler: function (val, oldval) {
            console.log(typeof val)
            console.log(val)
          },
          deep: true
        },
        checkedKeys:{
          handler(val,oldVal){
            console.log(val)
          },
          deep:true
        }
      },
      mounted(){
        this.init();
      }

    }
</script>

<style lang="less">
  #roles{
    .roleTab{
      margin-top: 20px;
      tr td:nth-of-type(3) .cell{
        color: #1bcaff;
      }
    }
    .editDialog{
      .el-dialog__body{
        margin-top: -20px;
        .el-menu{
          margin-bottom: 20px;
        }
        .search{
          width: 200px;
          float: right;
        }
        .personZone{
          margin-bottom: 20px;
        }
      }
    }

  }
  .assign .el-input__inner{
    width: 250px;
  }

</style>
