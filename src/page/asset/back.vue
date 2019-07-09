<template>
    <div id="back">
      <el-form :inline="true"  :model="searchData" >
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
          <!--日期范围选择-->
          <el-date-picker v-if="this.searchKey === 'cancel_time'"
                          v-model="searchVal"
                          value-format="yyyy-MM-dd"
                          style="position: relative;left: -12px;">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
          <el-button  style="margin-left: 10px;" @click="confirmBack" type="primary">确认退库</el-button>
        </el-form-item>
      </el-form>
      <!--表格-->
      <el-table :data="tabData" :span-method="arraySpanMethod"  @selection-change="handleSelectionChange" ref="multipleTable"  border fit style="overflow-x: auto">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column  label="序号" width="60" prop="order" align="center">
        </el-table-column>
        <el-table-column  label="员工编号" prop="user_job_number"  align="center">
        </el-table-column>
        <el-table-column  label="退库人"  prop="user_name"  align="center">
        </el-table-column>
        <el-table-column  label="退库日期" width="120" prop="cancel_time"  align="center">
        </el-table-column>
        <el-table-column  label="退库状态" prop="status_zh"  align="center">
        </el-table-column>
        <el-table-column  label="创建人" width="120" prop="create_by_zh"  align="center">
        </el-table-column>
        <el-table-column  label="资产明细"  align="center" height="50">
          <el-table-column  label="资产名称" width="100" prop="related_name"  align="center">
          </el-table-column>
          <el-table-column  label="资产类别" width="120" prop="related_asset_class_zh"  align="center">
          </el-table-column>
          <el-table-column  label="资产编码" prop="related_asset_number"  align="center">
          </el-table-column>
          <el-table-column  label="规格型号" prop="related_asset_spec"  align="center">
          </el-table-column>
          <el-table-column  label="SN号" width="130" prop="related_asset_sn"  align="center">
          </el-table-column>
          <el-table-column  label="购入时间" width="160" sortable prop="related_buy_at"  align="center">
          </el-table-column>
          <el-table-column  label="所属公司" prop="related_dep_owner_zh"  align="center">
          </el-table-column>
          <el-table-column  label="发票号码" width="100" prop="related_invoice_number"  align="center">
          </el-table-column>
          <el-table-column  label="金额" width="100" prop="related_price"  align="center">
          </el-table-column>
          <el-table-column  label="使用部门" prop="related_dep_to_use_zh"  align="center">
          </el-table-column>
          <el-table-column  label="使用人" width="120" prop="related_user_to_use_zh"  align="center">
          </el-table-column>
          <el-table-column  label="存放地点" prop="related_store_at"  align="center">
          </el-table-column>
          <el-table-column  label="备注" prop="related_mt_comment"  align="center">
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
      data(){
        return {
          multipleSelection:[],
          tabData:[],
          mergeRow:[],
          visible:false,
          assetData:[],
          searchData:{},
          searchKey:'status',
          searchKeyList:[
            {
              value:'user_name',
              label:'退库人'
            },
            {
              value:'cancel_time',
              label:'退库日期'
            },
            {
              value:'status',
              label:'退库状态'
            }
          ],
          searchVal:'',
          searchValList:[],
          selectArr:['status','user_name']
        }
      },
      methods:{
        init(){
          this.fetchData();
        },
        search(){
          let data = {}
          data[this.searchKey] = this.searchVal;
          this.fetchData(data);
        },
        fetchData(data){
          data = data || {};
          console.log(data);
          this.$axios.Asset.back('GET',data).then(res=>{
            let data = res.data;
            let adjustData = this.$Store.formateAsset(data);   //调整数据格式为一对一
            this.tabData = adjustData.formateData;
            this.mergeRow = adjustData.mergeRow;
            this.total = res.meta.total;
          })
        },
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
          if(columnIndex >= 0 && columnIndex <= 5){
            let colNum = row.related_assets.length;
            if(colNum>0){
              if(this.mergeRow.indexOf(rowIndex)>=0){
                return [colNum,1];
              }else{
                return [0,0]
              }
            }
          }
        },
        confirmBackFinal(){
            // 退库提交操作
            let ids = [];
            this.multipleSelection.forEach(item=>{
              ids .push(item.id);
            })
            this.$axios.Asset.back('POST',{ids:ids}).then(res=>{
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
      watch:{
        searchKey: {
          handler(val, oldVal) {
            console.log(val);
            this.searchVal = '';
            let list = this.$Store.data;
            if (val === 'user_name' ) this.searchValList = list['userList'];
            else if(val == 'status') this.searchValList = list.dictionary.backStatus;
            else this.searchVal = null;
            console.log(this.searchValList);
          }
        }
      },
      created(){
        this.searchValList = this.$Store.data.dictionary.backStatus;

        this.$Store.getUserList();
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
