<template>
    <div id="staff">
      <!--操作-->
      <el-row class="optBtns">
        <el-button type="primary" @click="checkAsset">盘点</el-button>
        <el-button type="primary" @click="cancleAsset">退库</el-button>
      </el-row>
      <!--表格-->
      <el-table :data="personAsset"  border stripe fit style="overflow-x: auto">
        <el-table-column label="序列" width="60" align="center">
          <template slot-scope="scope">{{scope.$index+1+(currentPage-1)*currentPageSize}}</template>
        </el-table-column>
        <el-table-column label="资产状态" width="120" prop="status_zh"  align="center">
        </el-table-column>
        <el-table-column  label="资产编码" prop="asset_number"  align="center">
        </el-table-column>
        <el-table-column  label="资产名称" prop="name"  align="center">
        </el-table-column>
        <el-table-column  label="资产类别" prop="asset_class_zh"  align="center">
        </el-table-column>
        <el-table-column  label="规格型号" prop="asset_spec"  align="center">
        </el-table-column>
        <el-table-column  label="SN号" prop="asset_sn"  align="center">
        </el-table-column>
        <el-table-column label="盘点状态" width="120" prop="lcr_result_zh"  align="center">
        </el-table-column>
        <el-table-column  label="备注" prop="content"  align="center">
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
      <el-dialog
        v-if="this.visible"
        :close-on-click-modal="false" :close-on-press-escape="false"
        :title="this.optStatus===1?'盘点':'退库'"
        :visible.sync="visible"
        width="960px"
        top="80px">
        <el-scrollbar class="dialogZone">
          <el-table :data="dialogAsset"  @selection-change="handleSelectionChange" ref="multipleTable"  border stripe fit style="overflow-x: auto">
            <el-table-column type="selection" width="55" v-if="optStatus === 2">
            </el-table-column>
            <el-table-column type="index" label="序列" width="60" align="center">
            </el-table-column>
            <el-table-column  label="资产状态" prop="status_zh" width="120"  align="center">
            </el-table-column>
            <el-table-column  label="资产编码" prop="asset_number"  align="center">
            </el-table-column>
            <el-table-column  label="资产名称" prop="name"  align="center">
            </el-table-column>
            <el-table-column  label="资产类别" prop="asset_class_zh"  align="center">
            </el-table-column>
            <el-table-column  label="规格型号" prop="asset_spec"  align="center">
            </el-table-column>
            <el-table-column  label="SN号" prop="asset_sn"  align="center">
            </el-table-column>
            <el-table-column  label="盘点状态" width="120"  align="center">
              <template slot-scope="scope">
                <el-select  v-model="scope.row.lcr_result" placeholder="请选择" v-if="optStatus === 1" >
                  <el-option
                    v-for="item in checkStatusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <span v-else>{{scope.row.lcr_result_zh}}</span>
              </template>
            </el-table-column>
            <el-table-column  label="备注" prop="content"  align="center">
            </el-table-column>
          </el-table>
        </el-scrollbar>
        <el-row>
          <el-pagination
            background
            @size-change="dialogSizeChange"
            @current-change="dialogCurrentChange"
            :page-sizes="[10,30,50]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="dialogTotal">
          </el-pagination>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="confirmBtn">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    import SelfInput from '../components/common/selfInput'
    export default {
      data(){
        return {
          optStatus:1,        // 1 盘点   2 退库
          personAsset:[],
          dialogAsset:[],      // 盘点，退库时资产
          multipleSelection:[],    //当前选中的行数据
          currentPage:1,
          currentPageSize:10,
          total:20,
          dialogCurrentPage:1,
          dialogCurrentPageSize:10,
          dialogTotal:20,
          visible:false,
          formData:{
            status:1,
            code:'111',
            name:'电脑',
            type:'办公设备',
            size:'xxx',
            sn:'12345',
            purchaseDate:'2019-09-09',
            remark:''
          },
          checkStatusList:[],
          cancleStatus:2    //退库状态
        }
      },
      methods:{
        checkAsset(){
          this.optStatus = 1;
          this.visible = true;
          this.dialogData();
        },
        fetchData(){
          let data = {
            page:this.currentPage,
            per_page:this.currentPageSize
          };
          this.$axios.Home.staff('GET',data).then(res=>{
            this.personAsset = res.data;
            this.total = res.meta.total;
          })
        },
        dialogData(params){
          params = params?params:{};
          let data = {
            page:this.dialogCurrentPage,
            per_page:this.dialogCurrentPageSize
          };
          data = Object.assign(data,params);
          this.$axios.Home.staff('GET',data).then(res=>{
            this.dialogAsset = res.data;
            this.dialogTotal = res.meta.total;
          })

        },
        cancleAsset(){
          this.optStatus = 2;
          this.visible = true;
          let data = { status : this.cancleStatus}
          this.dialogData(data);
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
          console.log(this.multipleSelection);
        },
        handleSizeChange(val) {
          this.currentPageSize = val;   //每页几条
          this.fetchData();
        },
        handleCurrentPage(val) {
          this.currentPage = val;    //当前页
          this.fetchData();
        },
        dialogSizeChange(val) {
          this.dialogCurrentPageSize = val;   //每页几条
          this.dialogData();
        },
        dialogCurrentChange(val) {
          this.dialogCurrentPage = val;    //当前页
          this.dialogData();
        },
        confirmBtn(){
          if(this.optStatus === 1){   //盘点
            let data = {};
            this.dialogAsset.forEach(item=>{
              let {id,lcr_result} = item;
              if(lcr_result != 0) data[id] = lcr_result;
            })
            this.$axios.Home.staffCheck('POST',{result:data}).then(res=>{
              this.$message({
                message:'更新盘点状态',
                type:'success'
              })
              this.fetchData();
            })
          }else if(this.optStatus === 2){  //退库
            let cancelIds = [];
            this.multipleSelection.forEach(item=>{
              cancelIds.push(item.id);
            })
            let data = {ids:cancelIds};
            this.$axios.Home.staffCancel('POST',data).then(res=>{
              this.$message({
                message:'退库成功！',
                type:'success'
              })
              this.fetchData();
            })
          }
          this.visible = false;

        },
        changeFormVal([key,val]){
          console.log(val);
          this.formData[key] = val;
        },
      },
      components:{
        SelfInput
      },
      created(){
        this.checkStatusList = this.$Store.data.dictionary.checkStatus;
      },
      mounted(){
        this.$nextTick(()=>{
          this.fetchData();
        })
      }
    }
</script>

<style lang="less">
  .optBtns{
    margin-bottom: 15px;
  }


</style>
