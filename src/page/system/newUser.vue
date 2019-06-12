<template>
    <div id="newUser">
      <el-row class="search">
        <!--<el-select v-model="value" filterable placeholder="请选择">-->
          <!--<el-option-->
            <!--v-for="item in options"-->
            <!--:key="item.value"-->
            <!--:label="item.value"-->
            <!--:value="item.value">-->
          <!--</el-option>-->
        <!--</el-select>-->
        <el-button type="primary" @click="authRole">新增</el-button>
      </el-row>
      <el-row v-for="(item,index) in roles" :key="index">
        <h4>{{item.name}}</h4>
        <el-row>
          <el-tag class="role-tag" v-for="(userList,userKey) in item.list" :key="userKey">{{userList.name}}</el-tag>
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
          roles:[
            {
              name:'管理员',
              list:[
                {
                  name:'小李'
                },
                {
                  name:'小李'
                },
                {
                  name:'小李'
                },
                {
                  name:'小李'
                }
              ]
            },
            {
              name:'普通员工',
              list:[
                {
                  name:'小李'
                },
                {
                  name:'小李'
                },
                {
                  name:'小李'
                },
                {
                  name:'小李'
                }
              ]
            }
          ]
        }

      },
      methods:{
        authRole(){
          location.href = "#/system/new-role";

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


</style>
