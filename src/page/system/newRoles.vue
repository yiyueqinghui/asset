<template>
    <div id="newUser">
      <el-row class="search">
        <el-select v-model="value" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" @click="search">查询</el-button>
      </el-row>

      <el-row v-if="visible">
        <h4 class="title">成员信息</h4>
        <el-card class="box-card">
          <div class="text item">
            <span>姓名</span>   {{userData.name}}
          </div>
          <div class="text item">
            <span>所属机构</span>{{userData.org}}
          </div>
          <div class="text item">
            <span>联系方式</span>{{userData.tel}}
          </div>
        </el-card>
        <el-row style="margin-top: 20px;">
          <h4 class="title">配置角色</h4>
          <el-transfer
            v-model="authed"
            :data="authList"
            :titles="['角色列表', '已授权角色']"
            :props="{
                key: 'key',
                label: 'label'
              }">
          </el-transfer>
        </el-row>
      </el-row>
    </div>
</template>

<script>
    export default {
      data(){
        return {
          options: [
            {
            value: '选项1'
          }, {
            value: '选项2'
          }, {
            value: '选项3'
          }, {
            value: '选项4'
          }, {
            value: '选项5'
          }],
          value: '',
          userData:{
            name:'小李',
            org:'所属机构',
            tel:'12345677',
            role:['管理员']
          },
          authed:[1],
          authList:[
            {
              key:1,
              label:'管理员'
            },
            {
              key:2,
              label:'普通员工'
            },
            {
              key:3,
              label:'财务部'
            }
          ],
          visible:false
        }

      },
      methods:{
        confirmBtn(){
          this.dialogFormVisible = false;
        },
        search(){
          this.visible = true;

        }
      },
      watch:{
        authed:{
          handler:function(val,oldval){
            console.log(val)
          },
          deep:true
        }
      }
    }
</script>

<style>
  #newUser .search{
    margin-bottom: 20px;
  }
  #newUser .role-tag{
    margin:10px;
  }
  #newUser .box-card .item{
    padding:10px 0;
    border-bottom: 1px solid lightgray;
  }
  #newUser .box-card .item:last-of-type{
    border-bottom:none!important;
  }
  #newUser .box-card .item span{
    display: inline-block;
    width: 120px;
    vertical-align: center;
  }
  #newUser .title{
    margin-bottom: 15px;
  }


</style>
