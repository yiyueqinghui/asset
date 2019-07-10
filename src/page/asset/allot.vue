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
        <treeselect v-if="this.treeArr.indexOf(this.searchKey)>=0"
                    v-model="searchVal"
                    :multiple="false"
                    placeholder="请选择..."
                    :show-count="false"
                    :options="departList" />
        <!--日期范围选择-->
        <el-date-picker v-if="this.searchKey === 'confirm_time_in'"
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
        <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        <el-button  style="margin-left: 10px;" @click="clickBtn" type="primary" icon="el-icon-edit">新增</el-button>
        <el-button  style="margin-left: 10px;" @click="confirmAllot" icon="el-icon-edit" type="primary" >调入确认</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table :data="tabData" :span-method="arraySpanMethod"  @selection-change="handleSelectionChange" ref="multipleTable"  border fit style="overflow-x: auto">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column  label="序号" width="60" align="center">
        <template slot-scope="scope">{{scope.row.order + (currentPage - 1) * currentPageSize}}</template>
      </el-table-column>
      <el-table-column  label="状态" prop="status_zh"  align="center">
      </el-table-column>
      <el-table-column  label="调拨单号" prop="allot_number"  align="center">
      </el-table-column>
      <el-table-column  label="调出公司" prop="company_out_name"  align="center">
      </el-table-column>
      <el-table-column  label="调入公司"  prop="company_in_name"  align="center">
      </el-table-column>
      <el-table-column  label="调入管理员" width="120" prop="user_id_in_zh"  align="center">
      </el-table-column>
      <el-table-column  label="调入确定时间" width="120" prop="confirm_time_in"  align="center">
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
        :page-sizes="[5,10,30,50]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-row>
    <!--新增-->
    <el-dialog
      :close-on-click-modal="false" :close-on-press-escape="false"
      title="新增"
      :visible.sync="dialogFormVisible"
      v-if="dialogFormVisible"
      width="960px"
      top="80px">
      <EditorInfo v-if="dialogFormVisible" :textObj="textObj" :edit-date="editDate" ></EditorInfo>
      <el-form :inline="true" :model="formData"  label-width="auto"  class="demo-form-inline self-input border">
        <el-row>
          <el-col :sm="12">
            <el-form-item label="调出公司">
              <treeselect
                v-model="formData.company_out"
                @select="funTreeSel1"
                :multiple="false"
                placeholder="请选择"
                :show-count="false"
                :options="departList" />
            </el-form-item>

          </el-col>
          <el-col :sm="12">
            <el-form-item label="调入公司">
              <treeselect width="100"
                v-model="formData.company_in"
                @select="funTreeSel2"
                :multiple="false"
                placeholder="请选择"
                :show-count="false"
                :options="departList" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="12">
            <SelfInput type="2" labelName="调入管理员" :selectList="userList"  keyName="user_id_in" :val="formData.user_id_in" :required="true" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-col :sm="12">
            <SelfInput type="3" labelName="调入确认时间"  keyName="confirm_time_in" :val="formData.confirm_time_in" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="12">
            <SelfInput type="1" labelName="调拨单号"  keyName="allot_number" :val="formData.allot_number" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-col :sm="12">
            <SelfInput type="4" labelName="调入说明"  keyName="comment" :val="formData.allotRemarks" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
        </el-row>
      </el-form>
      <el-row class="btns border">
        <el-col :sm="4">
          <el-button type="primary" @click="chooseAsset">选择资产</el-button>
        </el-col>
        <el-col :sm="4">
          <el-button @click="deleteAsset">删除</el-button>
        </el-col>
      </el-row>
      <!--已选择物品表格-->
      <el-table v-show="choosedData.length > 0"  :data="choosedData" :max-height="400"  @selection-change="handleSelection"  border stripe fit style="overflow-x: auto">
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmBtn">确 定</el-button>
      </div>
    </el-dialog>
    <!--选择资产-->
    <AssetList :visible="allAssetVisible" @hideDialog="hideDialog"></AssetList>
  </div>
</template>

<script>
  import EditorInfo from '../../components/common/editorInfo'
  import SelfInput from '../../components/common/selfInput'
  import AssetList from '../../components/assetList'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  export default {
    data: function () {
      return {
        userList: [],
        departList:[],
        searchKey:'status',
        searchKeyList:[
          {
            value:'status',
            label:'状态'
          },
          {
            value:'company_out',
            label:'调出公司'
          },
          {
            value:'company_in',
            label:'调入公司'
          },
          {
            value:'create_by',
            label:'调入管理员'
          },
          {
            value:'confirm_time_in',
            label:'调入时间'
          }
        ],
        searchVal:'',
        searchValList:[],
        treeArr:['company_out','company_in'],
        selectArr:['status','create_by'],
        searchData: {
          startDate:'',
          endDate:''
        },
        tabData: [],
        multipleSelection: [],    //当前选中的行数据
        currentPage: 1,
        currentPageSize:5,
        total: 20,
        dialogFormVisible:false,
        textObj:{
          title:'申请人信息',
          label:'申请时间'
        },
        formData: {
          allot_number:'xxx',
          user_id_in:'',
          confirm_time_in:'',
          company_in:null,
          company_out:null,
          status:'',
          comment:'',
          asset_ids:[]
        },
        dialogLoading: false,
        adminList:[
        ],
        uploadVisible:false,
        choosedAsset:[],
        choosedData:[],
        searchAsset:{
          val:''
        },
        allAssetVisible:false,
        choosedList:[],
        newCurrentPage:1,
        newTotal:20,
        allotFormVisible:false,
        allotData:{
          applyDate:'',
          outCompany:'',
          inCompany:'',
          allotRemarks:''
        },
        mergeRow:[]  //要合并在行rowIndex
      }
    },
    methods:{
      init(){
        this.fetchData();
      },
      funTreeSel1(node){
        console.log(JSON.stringify(node.id))
        let val = node.id;
        this.formData.company_out = val;
      },
      funTreeSel2(node){
        console.log(JSON.stringify(node.id))
        let val = node.id;
        this.formData.company_in = val;
      },
      confirmBack(){
        this.allotFormVisible = false;
      },
      chooseAsset(){
        this.allAssetVisible = true;
      },
      hideDialog(arr){
        console.log(arr);
        this.choosedData = arr;
        this.allAssetVisible = false;

        // 增加选择的资产项
        this.formData.asset_ids = [];
        arr.forEach(({id})=>{
          this.formData.asset_ids.push(id);
        })
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
      confirmBackFinal(){
        // 退库提交操作
        let ids = [];
        this.multipleSelection.forEach(item=>{
          ids .push(item.id);
        })
        console.log("选中的ids==", ids);

        let data = {};
        data.ids = ids;

        this.$axios.Asset.allotconfirm('POST',data).then(res=>{
          this.$message({
            message:'调入确认成功！',
            type:'success'
          })
          this.fetchData();
        })
      },
      confirmAllot(){

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
            message:'请选择至少一个资产调入单',
            type:'warning'
          })
        }
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
          const list = this.tabData;
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
      backBtn(){
        this.allotData = this.$Store.resetForm(this.allotData);

        if(this.multipleSelection.length != 1){
          this.$message({
            message:'请选择一个确认要调入的资产',
            type:'warning'
          })
        }else{
          this.editDate = this.$Store.formatDate();
          let {outCompany,inCompany} = this.multipleSelection[0];
          this.allotData.outCompany = outCompany;
          this.allotData.inCompany = inCompany;
          this.allotData.applyDate = this.editDate;

          this.allotFormVisible = true;
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        // console.log(this.multipleSelection);
      },
      handleSelection(val){
        this.choosedAsset = val;
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.currentPageSize = val;
        this.fetchData();
      },
      handleCurrentPage(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.fetchData();
      },
      changeFormVal([key,val]){
        console.log(val);
        this.formData[key] = val;
      },
      changeAllotVal([key,val]){
        this.allotData[key] = val;
      },
      handleChoosed(val){
        this.choosedList = val;
      },
      confirmChoosed(){
        this.allAssetVisible = false;
      },
      fetchAssetData(){

      },
      fetchData(data){
        data = data?data:{};
        let defaultData = {
          page:this.currentPage,
          per_page:this.currentPageSize
        }
        data = Object.assign(defaultData,data);

        this.$axios.Asset.allot('GET',data).then(res=>{
          let data = res.data;
          let adjustData = this.$Store.formateAsset(data);   //调整数据格式为一对一
          this.tabData = adjustData.formateData;
          this.mergeRow = adjustData.mergeRow;
          this.total = res.meta.total;

        })
      },
      //查寻
      search(){
        let data = {};
        if(this.searchVal instanceof Array){
          data[this.searchKey+'[start]'] = this.searchVal[0];
          data[this.searchKey+'[end]'] = this.searchVal[1];
        }else{
          data[this.searchKey] = this.searchVal;
        }
        this.fetchData(data);
      },

      //合并行
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if(columnIndex >= 0 && columnIndex <= 8){
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
      clickBtn(){
        this.formTitle = '新增';
        this.editDate = this.$Store.formatDate();
        this.formData = this.$Store.resetForm(this.formData);
        if(typeof this.formData.company_in != undefined){
          this.formData.company_in = null;
        }
        if(typeof this.formData.company_out != undefined){
          this.formData.company_out = null;
        }
        this.dialogFormVisible = true;
      },
      confirmBtn(){
        let id = this.formData.id;
        let data = this.formData;
        if(this.formTitle == '新增'){
          this.$axios.Asset.allot('POST',data).then(res=>{
            // this.tipMessage('新增成功！');
            this.$message({
              message:'新增成功！',
              type:'success'
            })
            this.fetchData();
            this.dialogFormVisible = false;
          })
        }else{
          this.$axios.Asset.allot('PUT',data).then(res=>{
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
      deleteData(){
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
            this.$axios.Asset.allot('DELETE',item).then(res=>{
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
      filterStatus(value,row){
        console.log(value);
        console.log(row);
        return row.status === value
      }

    },
    components:{
      EditorInfo,
      SelfInput,
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
          let list = this.$Store.data;
          if (val === 'status' ) this.searchValList = list.dictionary.allotStatus ;
          else if(val === 'create_by') this.searchValList = this.userList;
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
      })

      this.searchValList = this.$Store.data.dictionary.allotStatus;
    },

    mounted(){
      this.init();
    }
  }
</script>

<style lang="less">
  .border{
    width:100%;
    padding-top: 20px;
    background:url("../../assets/img/border.png") repeat-x left top;
    -webkit-background-size: 100% 2px;
    background-size: 100% 2px;
  }
  .btns{
    padding:20px 0;
  }
  .receivers .el-select{
    margin-left:0!important;
  }
  #backForm{
    .header{
      font-size: 15px;
      font-weight: 600;
      margin-top: -10px;
      margin-bottom: 10px;
      color: rgb(0,153,204);

    }
    .el-col-sm-6{
      padding-right: 20px;
      .el-date-editor--date{
        width: 100%!important;
      }
    }

  }
</style>
