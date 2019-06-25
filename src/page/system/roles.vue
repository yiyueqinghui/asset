<template>
    <div id="roles">
      <el-row>
        <el-button  type="primary" icon="el-icon-plus" @click="editRole(1)">新建角色</el-button>
        <el-button  type="primary" icon="el-icon-edit"  @click="editRole(2)">修改</el-button>
        <el-button  type="primary" icon="el-icon-edit"  @click="deleteRole">删除</el-button>
        <el-button  type="primary" icon="el-icon-plus" @click="authRole">角色授权</el-button>
        <el-button  type="primary" icon="el-icon-s-custom" @click="assignUser" >分配用户</el-button>
      </el-row>
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
      <el-dialog
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
      <el-dialog
        :close-on-click-modal="false" :close-on-press-escape="false"
        title="角色授权"
        :visible.sync="authVisible"
        width="560px"
        top="80px">
        <el-form  :inline="true" :model="authForm"  label-width="auto"  class="demo-form-inline self-input">
          <el-row>
            <el-form-item label="角色名称">
              <el-input disabled="disabled" v-model="authForm.roleName"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="授权">
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

        <div slot="footer" class="dialog-footer">
          <el-button @click="authVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmAuth">确 定</el-button>
        </div>
      </el-dialog>
      <!--分配用户-->
      <el-dialog
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
          roleData:[
          ],
          multipleSelection:[],
          createVisible:false,
          createForm:{
            roleName:'',
            remarks:''
          },
          editVisible:false,
          currentIndex:1,
          roleAuth:[
            {
            id: 1,
            label: '一级 1',
            children: [{
              id: 4,
              label: '二级 1-1',
              children: [{
                id: 9,
                label: '三级 1-1-1'
              }, {
                id: 10,
                label: '三级 1-1-2'
              }]
            }]
          },
            {
            id: 2,
            label: '一级 2',
            children: [{
              id: 5,
              label: '二级 2-1'
            }, {
              id: 6,
              label: '二级 2-2'
            }]
          },
            {
            id: 3,
            label: '一级 3',
            children: [{
              id: 7,
              label: '二级 3-1'
            }, {
              id: 8,
              label: '二级 3-2'
            }]
          }],
          expandedKeys:[1,3],
          checkedKeys:[7,9,5,6],
          defaultProps: {
            children: 'children',
            label: 'label'
          },
          currentKey:'',
          searchVal:'',
          personData:[
            {
              id:1,
              name:'张三',
              blongDepart:'总部',
              employee:'经理'
            },
            {
              id:2,
              name:'张三',
              blongDepart:'总部',
              employee:'经理'
            },
            {
              id:3,
              name:'张三',
              blongDepart:'总部',
              employee:'经理'
            }
          ],
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
          options: [
            {
              value: 1,
              label: '东南',
              children: [{
                value: 2,
                label: '上海',
                children: [
                  { value: 3, label: '普陀' },
                  { value: 4, label: '黄埔' },
                  { value: 5, label: '徐汇' }
                ]
              }, {
                value: 7,
                label: '江苏',
                children: [
                  { value: 8, label: '南京' },
                  { value: 9, label: '苏州' },
                  { value: 10, label: '无锡' }
                ]
              }, {
                value: 12,
                label: '浙江',
                children: [
                  { value: 13, label: '杭州' },
                  { value: 14, label: '宁波' },
                  { value: 15, label: '嘉兴' }
                ]
              }]
            },
            {
              value: 17,
              label: '西北',
              children: [{
                value: 18,
                label: '陕西',
                children: [
                  { value: 19, label: '西安' },
                  { value: 20, label: '延安' }
                ]
              }, {
                value: 21,
                label: '新疆维吾尔族自治区',
                children: [
                  { value: 22, label: '乌鲁木齐' },
                  { value: 23, label: '克拉玛依' }
                ]
              }]
            }]




        }
      },
      methods:{
        init(){
          this.fetchData();
        },
        fetchData(){
          this.$axios.Asset.role('GET',{}).then(res=>{
            console.log(" result ==++++====" + JSON.stringify(res.data));
            this.roleData = res.data;
            this.total = res.meta.total
          })
        },
        // 新增,修改
        editRole(type){
          this.title = type == 1 ? '新增':'修改';
          this.createForm = this.$Store.resetForm(this.createForm);
          if(type === 2){
            console.log(JSON.stringify(this.multipleSelection));
            if(this.multipleSelection.length === 1){
              this.createForm = Object.assign({},this.multipleSelection[0]);
              console.log(JSON.stringify(this.createForm));
              // this.validDate = this.formData.validDate.split('-');
            }else{
              this.$message({
                message:'请选择一条要修改的数据',
                type:'warning'
              })
              return;
            }
            this.editVisible = true;
          }else{
            this.createVisible = true;
          }
        },
        confirmBtn(){
          let id = this.createForm.id;
          let data = this.createForm;
          if(this.title == '新增'){
            this.$axios.Asset.role('POST',data).then(res=>{
              // this.tipMessage('新增成功！');
              this.$message({
                message:'新增成功！',
                type:'success'
              })
              this.fetchData();
              this.createVisible = false;
            })
          }else{
            this.$axios.Asset.role('PUT',data).then(res=>{
              console.log(res);
              this.$message({
                message:'修改成功！',
                type:'success'
              })
              this.fetchData();
              this.editVisible = false;
            }).catch(error=>{
              // TODO error result
            })
          }
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

        /*editRole(type){
          if(type === 1){
            this.createForm = this.$Store.resetForm(this.createForm);
            this.createVisible = true;
          }else if(type === 2){
            if(this.multipleSelection.length === 1){
              this.createForm = Object.assign({},this.multipleSelection[0]);
              this.editVisible = true;
            }else{
              this.$message({
                type:'warning',
                message:'请选择一条要操作的数据'
              })
            }

          }else if(type === 3){
            if(this.multipleSelection.length >= 1){
              this.$message({
                type:'success',
                message:'删除成功！'
              })
            }else{
              this.$message({
                type:'warning',
                message:'请至少选择一条要删除的数据'
              })
            }

          }

        },*/
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
          this.checkedKeys = status.checkedKeys;
        },
        addPerson(){

        },
        deletePerson(){

        },
        searchPerson(){

        },
        authRole(){
          if(this.multipleSelection.length === 1){
            this.authForm = Object.assign({},this.multipleSelection[0]);
            this.authVisible = true;
          }else{
            this.$message({
              type:'warning',
              message:'请选择一个要授权的角色'
            })
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
          this.authVisible = false;
        },
        confirmAssign(){
          this.userVisible = false;
        }


      },
      watch:{
        userForm:{
          handler:function(val,oldval){
            console.log(typeof val)
            console.log(val)
          },
          deep:true
        }
      },
      mounted(){
        this.personData = new Array(20).fill(this.personData[0]);
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
