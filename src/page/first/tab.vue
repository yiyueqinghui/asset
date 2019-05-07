<template>
  <el-table :data="tableData"  border stripe fit style="overflow-x: auto">
    <el-table-column prop="id" label="序列" width="100" align="center">
    </el-table-column>
    <el-table-column prop="date" label="日期" width="140" align="center">
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="120" align="center">
    </el-table-column>
    <el-table-column prop="address" label="地址01"  align="center">
    </el-table-column>
    <el-table-column prop="address" label="地址02" align="center">
    </el-table-column>
    <el-table-column prop="address" label="地址03"   align="center">
    </el-table-column>
    <el-table-column prop="address" label="地址04" align="center">
    </el-table-column>
    <el-table-column prop="address" label="地址05"  align="center" >
    </el-table-column>
    <el-table-column prop="address" label="地址06"  align="center" >
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data(){
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData:Array(5).fill(item)

      }
    },
    methods:{


    },
    mounted(){
      let arr = []
      this.tableData.forEach((item,index)=>{
        let newItem = {...item};
        newItem['id'] = index + 1;
        newItem['name'] += (index+1);
        arr.push({...newItem});
      })
      this.tableData = arr;
    }

  }
</script>

<style scoped>

</style>
