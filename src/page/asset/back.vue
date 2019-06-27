<template>
    <div id="back">
       <el-row>
         <el-button type="primary" @click="confirmBack">确认退库</el-button>
       </el-row>
      <!--表格-->
      <el-table :data="tabData"  @selection-change="handleSelectionChange" ref="multipleTable"  border stripe fit style="overflow-x: auto">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" label="序号" width="60" align="center">
        </el-table-column>
        <el-table-column  label="员工编号" prop="user_job_number"  align="center">
        </el-table-column>
        <el-table-column  label="退库人"  prop="user_name"  align="center">
        </el-table-column>
        <el-table-column  label="退库日期" width="120" prop="cancel_time"  align="center">
        </el-table-column>
        <el-table-column  label="退库领用机构" width="120" prop="canceled_dep_at_name"  align="center">
        </el-table-column>
        <el-table-column  label="创建人" width="120" prop="create_by_zh"  align="center">
        </el-table-column>
        <el-table-column  label="资产明细"  align="center" height="50">
          <el-table-column label="资产名称" width="100" prop="name" align="center"></el-table-column>
          <el-table-column label="资产类别" prop="type" align="center"></el-table-column>
          <el-table-column label="资产编码" prop="code" align="center"></el-table-column>
          <el-table-column label="资产型号" prop="size" align="center"></el-table-column>
          <el-table-column label="SN号" width="150" prop="SN" align="center"></el-table-column>
          <el-table-column label="购入时间" prop="purchaseDate" align="center"></el-table-column>
          <el-table-column label="所属公司" prop="blong" align="center"></el-table-column>
          <el-table-column label="发票号码" width="100" prop="bill" align="center"></el-table-column>
          <el-table-column label="金额" prop="money" align="center"></el-table-column>
          <el-table-column label="使用公司" prop="useCompany" align="center"></el-table-column>
          <el-table-column label="使用部门" prop="useDepart" align="center"></el-table-column>
          <el-table-column label="使用人" prop="usePerson" align="center"></el-table-column>
          <el-table-column label="存放地点" prop="site" align="center"></el-table-column>
          <el-table-column label="备注" prop="remarks" align="center"></el-table-column>
        </el-table-column>

      </el-table>
    </div>
</template>

<script>
    export default {
      data(){
        return {
          multipleSelection:[],
          tabData:[
          ],
          visible:false,
          assetData:[]
        }
      },
      methods:{
        init(){
          this.fetchData();
        },
        fetchData(){
          this.$axios.Asset.backconfirm('GET',{}).then(res=>{
            console.log(" result ==++++====" + JSON.stringify(res.data));
            this.tabData = res.data;
            this.total = res.meta.total
          })
        },
        confirmBackFinal(){
            // 退库提交操作
            let ids = [];
            this.multipleSelection.forEach(item=>{
              ids .push(item.id);
            })
            console.log("选中的ids==", ids);

            let data = {};
            data.ids = ids;

            this.$axios.Asset.backconfirm('POST',data).then(res=>{
              this.$message({
                message:'退库确认成功！',
                type:'success'
              })
              this.fetchData();
            })
        },
        confirmBack(){

          if(this.multipleSelection.length >= 1){

              this.$confirm('是否继续', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.confirmBackFinal();
              }).catch(() => {

              });
          }else{
            this.$message({
              message:'请选择一个要退库的人员资产信息',
              type:'warning'
            })
          }
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        }
      },
      mounted(){
        this.init();
      }
    }
</script>

<style>
  .back-input{
    border-bottom:1px solid #aee2ff;
    margin-bottom: 20px;
  }
  .back-input .el-input__inner{
    width: 145px;
  }

</style>
