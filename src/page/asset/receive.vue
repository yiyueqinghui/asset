<template>
    <div id="wareHousing">
      <!--查寻-->
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
          <!--输入框-->
          <el-input v-if="this.inputArr.indexOf(this.searchKey)>=0" style="left: -12px;width: 200px!important;" v-model="searchVal" placeholder="请输入搜索内容"></el-input>
          <!--下拉选择 -->
          <el-select v-if="this.selectArr.indexOf(this.searchKey)>=0" :clearable="true" v-model="searchVal" placeholder="请选择" style="width:200px;left: -12px;">
            <el-option
              v-for="(item,index) in searchValList"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <!--机构以及资产类别选择-->
          <treeselect v-if="this.searchKey === 'recv_dep' "
                      v-model="searchVal"
                      :multiple="false"
                      placeholder="请选择..."
                      :show-count="false"
                      :options="departList" />
          <!--日期范围选择-->
          <el-date-picker v-if="this.searchKey === 'recv_time'"
                          v-model="searchVal"
                          type="daterange"
                          range-separator="|"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="yyyy-MM-dd"
                          style="position: relative;left: -12px;">
          </el-date-picker>
        </el-form-item>
         <el-form-item>
           <el-button type="primary" icon="el-icon-search" @click="fetchData">查询</el-button>
           <el-button  style="margin-left: 10px;" @click="clickBtn(1)" type="primary" icon="el-icon-edit">新增</el-button>
           <!--<el-button  style="margin-left: 10px;" @click="clickBtn(2)" type="primary" icon="el-icon-edit">修改</el-button>-->
           <el-dropdown trigger="hover" style="margin-left: 10px;display: none;" @command="handleCommand">
              <el-button type="primary" icon="el-icon-document-add">
                导出
              </el-button>
               <el-dropdown-menu slot="dropdown">
                 <el-dropdown-item icon="el-icon-download" command="module">下载导入模板</el-dropdown-item>
                 <!--<el-dropdown-item icon="el-icon-upload" command="upload" >批量导入资产</el-dropdown-item>-->
                 <el-dropdown-item icon="el-icon-download" command="download">导出领用数据</el-dropdown-item>
               </el-dropdown-menu>
           </el-dropdown>
         </el-form-item>
      </el-form>
      <!--表格-->
      <el-table  :data="tabData" :span-method="arraySpanMethod"  border  fit style="overflow-x: auto">
        <el-table-column  label="序号" width="60" prop="order" align="center">
        </el-table-column>
        <el-table-column  label="领用日期"  prop="recv_time" width="120" align="center">
        </el-table-column>
        <el-table-column  label="领用人" :spanRow="2" prop="user_name"  align="center">
        </el-table-column>
        <el-table-column  label="领用后使用机构" width="120" prop="recv_dep_name"  align="center">
        </el-table-column>
        <el-table-column  label="领用后区域" width="100" prop="recv_store_at"  align="center">
        </el-table-column>
        <el-table-column  label="备注" prop="comment"  align="center">
        </el-table-column>
        <el-table-column  label="资产明细"  align="center">
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
      <!--分页-->
      <el-row>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentPage"
          :current-page="currentPage"
          :page-sizes="[10,30,50]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-row>
      <!--新增-->
      <el-dialog
        :close-on-click-modal="false" :close-on-press-escape="false"
        :title="formTitle"
        :visible.sync="dialogFormVisible"
        v-if="dialogFormVisible"
        width="960px"
        top="80px">

        <el-form :inline="true" :model="formData"  label-width="auto"  class="demo-form-inline self-input receivedForm">
          <el-row>
            <el-col :sm="12">
              <SelfInput type="2" labelName="领用人" :selectList="userList"  keyName="user_id" :val="formData.user_id" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput type="3"  labelName="领用日期"   keyName="recv_time" :val="formData.recv_time"  @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput labelName="所在区域" keyName="recv_store_at" :val="formData.recv_store_at" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="10">
              <el-form-item label="使用机构">
                <treeselect
                  v-model="formData.recv_dep"
                  @select="funTreeSel1"
                  :multiple="false"
                  placeholder="请选择"
                  :show-count="false"
                  :options="departList" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="16">
              <SelfInput type="4" labelName="备注"  keyName="comment" :val="formData.receiveRemarks" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
        </el-form>
        <el-row class="btns">
          <el-col :sm="4">
            <el-button type="primary" @click="chooseAsset">选择资产</el-button>
          </el-col>
          <el-col :sm="4">
            <el-button @click="deleteAsset">删除</el-button>
          </el-col>
        </el-row>
        <!--已选择物品表格-->
        <el-table v-show="choosedData.length > 0"  :data="choosedData" :max-height="200"  @selection-change="handleSelection"  border stripe fit style="overflow-x: auto">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">{{scope.$index+1+(currentPage-1)*currentPageSize}}</template>
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
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmBtn">确 定</el-button>
        </div>
      </el-dialog>
      <!--选择资产-->
      <AssetList :visible="allAssetVisible" @hideDialog="hideDialog"></AssetList>

      <UploadExcel v-if="uploadVisible" @close="closeUpload"></UploadExcel>
    </div>
</template>

<script>
    import EditorInfo from '../../components/common/editorInfo'
    import SelfInput from '../../components/common/selfInput'
    import UploadExcel from '../../components/common/uploadExcel'
    import downloadModule from '../../utils/download'
    import AssetList from '../../components/assetList'
    import Treeselect from '@riophae/vue-treeselect'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    export default {
      data: function () {
        return {
          tableVisible:false,
          searchKey:'user_id',
          searchKeyList:[
            {
              value:'recv_time',
              label:'领用日期'
            },
            {
              value:'user_id',
              label:'领用人'
            },
            {
              value:'recv_dep',
              label:'使用机构'
            }
          ],
          searchVal:'',
          searchValList:[],
          inputArr:[],
          selectArr:['user_id'],
          searchData: {
            startDate:'',
            endDate:''
          },
          divideId:0,
          tabData: [],
          multipleSelection: [],    //当前选中的行数据
          currentPage: 1,
          currentPageSize:5,
          total: 20,
          dialogFormVisible:false,
          formTitle: '资产领用单',
          formData: {
            user_id:'',
            recv_time:'',
            recv_dep:null,
            recv_store_at:'',
            comment:'',
            asset_ids:[]
          },
          dialogLoading: false,
          companyList:[],
          departList:[],
          uploadVisible:false,
          choosedAsset:[],
          choosedData:[],
          searchAsset:{
            val:''
          },
          allAssets:[
          ],
          userList:[],
          allAssetVisible:false,
          choosedList:[],
          newCurrentPage:1,
          newTotal:0
        }
      },
      methods:{
        init(){
          this.fetchData();
          this.searchValList = this.userList;
        },
        funTreeSel1(node){
          console.log(JSON.stringify(node.id))
          let val = node.id;
          this.formData.recv_dep = val;
        },
        chooseAsset(){
          this.allAssetVisible = true;
        },
        deleteAsset(){
          let deleteItem = [];
          this.formData.asset_ids = [];
          this.choosedAsset.forEach(item=>{
            deleteItem.push(item.name);
          })
          let data = [];
          this.choosedData.forEach((item,index)=>{
            if(deleteItem.indexOf(item.name)==-1){
              data.push(item);
              // 增加选择的资产id
              this.formData.asset_ids.push(item.id);
            }
          })
          this.choosedData = data;

        },
        handleCommand(command){
           if(command == 'upload'){
             this.uploadVisible = true;
           }else if(command == 'download'){
             this.downLoadExcel()
           }else if(command == 'module'){
             downloadModule('','模板');
           }
        },
        closeUpload(){
          this.uploadVisible = false;
        },
        downLoadExcel(){
          require.ensure([], () => {
            const { export_json_to_excel } = require('@/vendor/Export2Excel')
            const tHeader = ['状态','图片','资产名称', '资产类别', '资产编码','规格型号','SN','购入时间','所属公司','发票号码','实付金额','使用公司','使用部门','使用人','供应商','联系人(供应商)','联系电话(供应商)','存放地点','创建人','创建时间','备注'];
            const filterVal = ['status','src','name', 'type', 'code','SN','size','purchaseDate','blong','bill','money','useCompany','useDepart','usePerson','supplier','contacts','tel','site','creater','createDate','remarks'];
            const list = this.wareData;
            const data = this.formatJson(filterVal, list)
            export_json_to_excel(tHeader, data, '资产')
          })

        },
        formatJson(filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => v[j]))
        },
        querySearch(queryString, cb) {
          var departmentList = this.departmentList;
          var results = queryString ? departmentList.filter(this.createFilter(queryString)) : departmentList;
          // 调用 callback 返回建议列表的数据
          cb(results);
        },
        createFilter(queryString) {
          return (departmentList) => {
            return (departmentList.en.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
          };
        },
        handleSelect(item) {
          this.formData.department = item.value;
        },
        fetchData(){
          let data = {
            page:this.currentPage,
            per_page:this.currentPageSize
          };

          if(this.searchVal instanceof Array){
            data[this.searchKey+'[start]'] = this.searchVal[0];
            data[this.searchKey+'[end]'] = this.searchVal[1];
          }else if(typeof this.searchVal === 'string' || typeof this.searchVal === 'number'){
            data[this.searchKey] = this.searchVal;
          }

          this.$axios.Asset.receive('GET',data).then(res=>{
            // console.log(" result ==" + res.data);
            let data = res.data;
            this.total = data.length;
            let adjustData = this.$Store.formateAsset(data);   //调整数据格式为一对一
            this.tabData = adjustData.formateData;
            this.mergeRow = adjustData.mergeRow;
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
        // 新增,修改
        clickBtn(type){
          this.editDate = type == 1 ? this.$Store.formatDate() : this.formData.editDate;
          this.formTitle = type == 1 ? '新增':'修改';
          this.formData = this.$Store.resetForm(this.formData);
          if(typeof this.formData.recv_dep != "undefined"){
            this.formData.recv_dep = null;
          }
          if(type === 2){
            if(this.multipleSelection.length === 1){
              this.formData = Object.assign({},this.multipleSelection[0]);
            }else{
              this.$message({
                message:'请选择一条要修改的数据',
                type:'warning'
              })
              return;
            }
          }
          this.dialogFormVisible = true;
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        confirmBtn(){
          let id = this.formData.id;
          let data = this.formData;
          if(this.formTitle == '新增'){
            this.$axios.Asset.receive('POST',data).then(res=>{
              // this.tipMessage('新增成功！');
              this.$message({
                message:'新增成功！',
                type:'success'
              })
              this.fetchData();
              this.dialogFormVisible = false;
            })
          }else{
            this.$axios.Asset.receive('PUT',data).then(res=>{
              console.log(res);
              this.$message({
                message:'修改成功！',
                type:'success'
              })
              this.fetchData();
              this.dialogFormVisible = false;
            }).catch(error=>{
              // TODO error result
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
          // console.log(this.multipleSelection);
        },
        handleSelection(val){
          this.choosedAsset = val;
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.currentPageSize = val;
        },
        handleCurrentPage(val) {
          console.log(`当前页: ${val}`);
          this.currentPage = val;
        },
        handleAdjustSize(val) {
          console.log(`每页 ${val} 条`);
        },
        handleAdjustPage(val){
          console.log(`当前页: ${val}`);
          this.newCurrentPage = val;
        },
        changeFormVal([key,val]){
          console.log(val);
          this.formData[key] = val;
        },
        handleChoosed(val){
          this.choosedList = val;
        },
        confirmChoosed(){
          this.allAssetVisible = false;
        },
        fetchAssetData(){

        },
        hideDialog(arr){
          console.log(JSON.stringify(arr));
          this.choosedData = arr;
          console.log('selected data load...');

          // 增加选择的资产项
          this.formData.asset_ids = [];
          arr.forEach(({id})=>{
            this.formData.asset_ids.push(id);
          })
          this.allAssetVisible = false;
        },

      },
      components:{
        EditorInfo,
        SelfInput,
        UploadExcel,
        AssetList,
        Treeselect
      },
      watch:{
        formData:{
          handler:function(newval,oldval){
            console.log(newval);
          },
          deep:true
        },
        searchKey: {
          handler(val, oldVal) {
            this.searchVal = '';
            let dictionary = this.$Store.data;
            if (val === 'user_id' ) this.searchValList = dictionary['userList'];
            else this.searchVal = null;
          }
        }



      },
      created(){
        this.$Store.getDepartmentList().then((data)=>{
          this.departList = data;
        })

        this.$Store.getUserList().then((data)=>{
          this.userList = data;
          this.searchValList = data;
        })
      },
      mounted(){
         this.init();
      }
    }
</script>

<style lang="less">
   .receivedForm{
     width:100%;
     background:url("../../assets/img/border.png") repeat-x left bottom;
     -webkit-background-size: 100% 2px;
     background-size: 100% 2px;
   }
   .btns{
     padding:20px 0;
   }
  .receivers .el-select{
    margin-left:0!important;
  }
</style>
