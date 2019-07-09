<template>
    <div id="assetList">
      <el-dialog
        :close-on-click-modal="false" :close-on-press-escape="false"
        title="选择资产"
        :visible.sync="visible"
        :before-close="closeDialog"
        width="960px"
        top="30px">
        <el-form :inline="true"  :model="searchAsset" >
          <el-form-item>
            <el-input v-model="searchAsset.name" placeholder="请输入资产名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="fetchAssetData">查询</el-button>
          </el-form-item>
        </el-form>
        <!--表格-->
        <el-scrollbar class="dialogZone" style="height: 300px;">
           <el-table :data="allAssets"  @selection-change="handleSelectionChange" ref="multipleTable"  border stripe fit stripe style="overflow-x: auto">
             <el-table-column type="selection" width="55">
             </el-table-column>
             <el-table-column type="index" label="序号" width="60" align="center">
             </el-table-column>
             <el-table-column  label="状态" width="100" prop="status_zh"  align="center">
             </el-table-column>
             <el-table-column  label="资产名称" width="100" prop="name"  align="center">
             </el-table-column>
             <el-table-column  label="资产类别" prop="asset_class_zh"  align="center">
             </el-table-column>
             <el-table-column  label="资产编码" prop="asset_number"  align="center">
             </el-table-column>
             <el-table-column  label="规格型号" prop="asset_spec"  align="center">
             </el-table-column>
             <el-table-column  label="SN号" width="130" prop="asset_sn"  align="center">
             </el-table-column>
             <el-table-column  label="购入时间" width="160" sortable prop="buy_at"  align="center">
             </el-table-column>
             <el-table-column  label="所属公司" prop="dep_owner_zh"  align="center">
             </el-table-column>
             <el-table-column  label="发票号码" width="100" prop="invoice_number"  align="center">
             </el-table-column>
             <el-table-column  label="实付金额" width="100" prop="price"  align="center">
             </el-table-column>
             <el-table-column  label="使用公司" prop="dep_to_use_zh"  align="center">
             </el-table-column>
             <el-table-column  label="使用人" prop="user_to_use_zh"  align="center">
             </el-table-column>
             <el-table-column  label="供应商" prop="mt_supplier"  align="center">
             </el-table-column>
             <el-table-column  label="联系人(供应商)" width="130" prop="mt_user"  align="center">
             </el-table-column>
             <el-table-column  label="联系电话(供应商)" width="130" prop="mt_phone"  align="center">
             </el-table-column>
             <el-table-column  label="存放地点" prop="store_at"  align="center">
             </el-table-column>
             <el-table-column  label="创建人" prop="create_by_zh"  align="center">
             </el-table-column>
             <el-table-column  label="备注" prop="mt_comment"  align="center">
             </el-table-column>
        </el-table>
        </el-scrollbar>
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
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="closeDialog">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
      props:{
        visible:{
          type:Boolean,
          default:false
        }
      },
      data(){
        return {
          allAssetVisible:true,
          searchAsset:{
            name:''
          },
          allAssets:[],
          choosedList:[],
          total:0,
          currentPage:1,
          currentPageSize:10
        }
      },
      methods:{
        init(){
          this.fetchData()
        },
        fetchData(params){
          let data = params ? params :{};
          let defaultData = {
            page:this.currentPage,
            per_page:this.currentPageSize,
            status:1
          };
          data  = Object.assign(data,defaultData);
          this.$axios.Asset.storage('GET',data).then(res=>{
            // console.log(" result ==" + res.data);
            this.allAssets = res.data;
            this.total = res.meta.total
          })
        },
        fetchAssetData(){
          this.fetchData(this.searchAsset)
        },
        closeDialog(){
          this.$emit('hideDialog',this.choosedList);
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
          this.choosedList = val;
          // console.log(this.multipleSelection);
        },
        handleSizeChange(val) {
          // 每页 ${val} 条
          this.currentPageSize = val;
          this.fetchData();
        },
        handleCurrentPage(val) {
          // `当前页: ${val}`;
          this.currentPage = val;
          this.fetchData();
        }
      },
      mounted(){
        this.init();
      }
    }
</script>

<style scoped>

</style>
