<template>
  <div id="borrow">
    <!--查寻-->
    <el-form :inline="true" >
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
        <el-select v-else-if="this.selectArr.indexOf(this.searchKey)>=0" :clearable="true" v-model="searchVal" placeholder="请选择" style="width:200px;left: -12px;">
          <el-option
            v-for="(item,index) in searchValList"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <!--日期范围选择-->
        <el-date-picker v-if="this.searchKey === 'borrow_time'"
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
        <el-button  style="margin-left: 10px;" @click="borrowConfirm" icon="el-icon-edit" type="primary" >借用确认单</el-button>
        <el-button  style="margin-left: 10px;" @click="giveBack" icon="el-icon-edit" type="primary" >归还</el-button>
        <el-button  style="margin-left: 10px;" @click="giveBackConfirm" icon="el-icon-edit" type="primary" >归还确认单</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table :data="tabData" :span-method="arraySpanMethod"  @selection-change="handleSelectionChange" ref="multipleTable"  border fit style="overflow-x: auto">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column  label="序号" width="60" prop="order" align="center">
      </el-table-column>
      <el-table-column  label="状态" width="100" prop="status_zh"  align="center">
      </el-table-column>
      <el-table-column  label="借用单号" prop="borrow_number"  align="center">
      </el-table-column>
      <el-table-column  label="借出时间" width="120" prop="borrow_time"  align="center">
      </el-table-column>
      <el-table-column  label="预计归还时间" width="120" prop="expect_return_time"  align="center">
      </el-table-column>
      <el-table-column  label="实际归还时间" width="120" prop="return_time"  align="center">
      </el-table-column>
      <el-table-column  label="借出人"  prop="borrow_user_name"  align="center">
      </el-table-column>
      <el-table-column  label="借出确认人" width="120" prop="borrow_confirm_user_name"  align="center">
      </el-table-column>
      <el-table-column  label="归还人" width="120" prop="return_confirm_user_name"  align="center">
      </el-table-column>
      <el-table-column  label="归还确认人" width="120" prop="return_confirm_user_name"  align="center">
      </el-table-column>
      <el-table-column  label="备注" prop="comment"  align="center">
      </el-table-column>
      <el-table-column  label="资产明细"  prop="related_assets" align="center" height="50">
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
      title="借用单"
      :visible.sync="dialogFormVisible"
      v-if="dialogFormVisible"
      width="960px"
      top="30px">
      <EditorInfo v-if="dialogFormVisible" :textObj="textObj" :edit-date="editDate" ></EditorInfo>
      <el-form :inline="true" :model="formData"  label-width="auto"  class="demo-form-inline self-input border">
        <el-row>
          <el-col :sm="12">
              <SelfInput labelName="借用单号"   keyName="borrow_number" :val="formData.borrow_number" :disabled="false" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-col :sm="12">
            <SelfInput type="2" labelName="借用人" :selectList="userList"  keyName="borrow_user" :val="formData.borrow_user"  @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="12">
            <SelfInput type="3"  labelName="借出时间"  keyName="borrow_time" :val="formData.borrow_time"  @changeFormVal="changeFormVal" ></SelfInput>
          </el-col>
          <el-col :sm="12">
            <SelfInput type="3"  labelName="预计归还时间" keyName="expect_return_time" :val="formData.expect_return_time" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
        </el-row>
        <!--<el-row>
          <el-col :sm="12">
            <SelfInput type="3"  labelName="借出确认时间" keyName="borrow_confirm_time" :val="formData.borrow_confirm_time" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-col :sm="12">
            <SelfInput type="3"  labelName="实际归还时间" keyName="return_time" :val="formData.return_time" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="12">
            <SelfInput type="3"  labelName="归还确认时间" keyName="return_confirm_time" :val="formData.return_confirm_time" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-col :sm="12">
            <SelfInput type="2" labelName="借出确认人" :selectList="userList"  keyName="borrow_confirm_user" :val="formData.borrow_confirm_user"  @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="12">
            <SelfInput type="2" labelName="归还处理人" :selectList="userList"  keyName="return_user" :val="formData.return_user"  @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-col :sm="12">
            <SelfInput type="2" labelName="归还确认人" :selectList="userList"  keyName="return_confirm_user" :val="formData.return_confirm_user"  @changeFormVal="changeFormVal"></SelfInput>

          </el-col>
        </el-row>-->
        <el-row>
          <el-col :sm="12">
            <SelfInput type="4" labelName="备注"  keyName="comment" :val="formData.comment" @changeFormVal="changeFormVal"></SelfInput>
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
    <!--归还-->
    <el-dialog
      :close-on-click-modal="false" :close-on-press-escape="false"
      title="归还单"
      :visible.sync="backFormVisible"
      width="960px"
      top="80px">
      <!--归还人信息-->
      <EditorInfo v-if="backFormVisible" :textObj="textObj" :edit-date="editDate" ></EditorInfo>

      <el-form :model="backData"  label-width="auto"  class="demo-form-inline self-input border">
        <el-row>
          <el-col :sm="12">
            <SelfInput v-if="backFormVisible" labelName="借用单号"   keyName="borrow_number" :val="backData.borrow_number" :disabled="true" @changeFormVal="changeBackVal"></SelfInput>
          </el-col>
          <el-col :sm="12">
            <SelfInput type="3" labelName="实际归还日期"   keyName="return_time" :val="backData.return_time"  @changeFormVal="changeBackVal"></SelfInput>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="16">
            <SelfInput type="4" labelName="备注"  keyName="comment" :val="backData.comment" @changeFormVal="changeBackVal"></SelfInput>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="backFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmBackBtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import EditorInfo from '../../components/common/editorInfo'
  import SelfInput from '../../components/common/selfInput'
  import AssetList from '../../components/assetList'

  export default {
    data: function () {
      return {
        searchKey:'status',
        searchKeyList:[
          {
            value:'status',
            label:'状态'
          },
          {
            value:'borrow_number',
            label:'借用单号'
          },
          {
            value:'borrow_time',
            label:'借出时间'
          }
        ],
        searchVal:'',
        searchValList:[],
        inputArr:['borrow_number'],
        selectArr:['status'],
        tabData: [ ],
        multipleSelection: [],    //当前选中的行数据
        currentPage: 1,
        currentPageSize:10,
        total: 20,
        dialogFormVisible:false,
        textObj:{
          title:'申请人信息',
          label:'申请时间'
        },
        formData: {
          applyDate:'xxx',
          borrowCode:'',
          borrowPerson:'',
          borrowDate:'',
          expectDate:'',
          borrowRemarks:''
        },
        dialogLoading: false,
        uploadVisible:false,
        choosedAsset:[],
        choosedData:[],
        searchAsset:{
          val:''
        },
        allAssets:[
        ],
        allAssetVisible:false,
        choosedList:[],
        newCurrentPage:1,
        newTotal:20,
        backFormVisible:false,
        backData:{
          borrow_number:'',
          return_time:''
        }
      }
    },
    methods:{
      init(){
        this.fetchData();
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

      borrowConfirmFinal(){
        // 退库提交操作
        let ids = [];
        this.multipleSelection.forEach(item=>{
          ids .push(item.id);
        })
        console.log("选中的ids==", ids);

        let data = {};
        data.ids = ids;

        this.$axios.Asset.borrowconfirm('POST',data).then(res=>{
          this.$message({
            message:'调入确认成功！',
            type:'success'
          })
          this.fetchData();
        })
      },
      borrowConfirm(){
        if(this.multipleSelection.length >= 1){

          this.$confirm('是否继续', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.borrowConfirmFinal();
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
      giveBackConfirmFinal(){
          // 退库提交操作
          let ids = [];
          this.multipleSelection.forEach(item=>{
            ids .push(item.id);
          })
          let data = {};
          data.ids = ids;

          this.$axios.Asset.givebackconfirm('POST',data).then(res=>{
            this.$message({
              message:'调入确认成功！',
              type:'success'
            })
            this.fetchData();
          })
      },
      giveBackConfirm(){  // 归还确认
        if(this.multipleSelection.length >= 1){

            this.$confirm('是否继续', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.giveBackConfirmFinal();
            }).catch(() => {

            });
        }else{
          this.$message({
            message:'请选择至少一个资产调入单',
            type:'warning'
          })
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
        //每页几条
        this.currentPageSize = val;
        this.fetchData();
      },
      handleCurrentPage(val) {
        //当前页
        this.currentPage = val;
        this.fetchData();
      },
      confirmBtn2(){
        console.log(this.formData);
        this.dialogFormVisible = false;
      },
      changeFormVal([key,val]){
        console.log(val);
        this.formData[key] = val;
      },
      changeBackVal([key,val]){
        this.backData[key] = val;
      },
      handleChoosed(val){
        this.choosedList = val;
      },
      confirmChoosed(){
        this.allAssetVisible = false;
      },
      fetchData(data){
        data = data || {};
        let defaultData = {
          page:this.currentPage,
          per_page:this.currentPageSize
        }
        data = Object.assign(defaultData,data);

        this.$axios.Asset.borrow('GET',data).then(res=>{
          let adjustData = this.$Store.formateAsset(res.data);   //调整数据格式为一对一
          this.tabData = adjustData.formateData;
          this.mergeRow = adjustData.mergeRow;
          this.total = res.meta.total;
        })
      },
      search(){
        let data = {};
        if(this.searchVal instanceof Array){
          data[this.searchKey+'[start]'] = this.searchVal[0];
          data[this.searchKey+'[end]'] = this.searchVal[1];
        }else if(typeof this.searchVal === 'string' || typeof this.searchVal === 'number'){
          data[this.searchKey] = this.searchVal;
        }
        this.fetchData(data);
      },
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if(columnIndex >= 0 && columnIndex <= 11){
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
        this.dialogFormVisible = true;
      },
      confirmBtn(){
        let id = this.formData.id;
        let data = this.formData;
        if(this.formTitle == '新增'){
          this.$axios.Asset.borrow('POST',data).then(res=>{
            this.$message({
              message:'新增成功！',
              type:'success'
            })
            this.fetchData();
            this.dialogFormVisible = false;
          })
        }else{
          this.$axios.Asset.borrow('PUT',data).then(res=>{
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
      giveBack(){ // 归还表单弹出
        if(this.multipleSelection.length === 1){
          this.backData = Object.assign({},this.multipleSelection[0]);
          this.editDate = this.$Store.formatDate();
          console.log(JSON.stringify(this.backData));
        }else{
          this.$message({
            message:'请选择一个要借用的资产',
            type:'warning'
          })
          return;
        }
        this.backFormVisible = true;
      },
      confirmBackBtn(){
        let id = this.backData.id;
        let data = this.backData;
        data.ids=[];
        data.ids.push(id);
        this.$axios.Asset.giveback('POST',data).then(res=>{
          this.$message({
            message:'新增成功！',
            type:'success'
          })
          this.fetchData();
          this.backFormVisible = false;
        })
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
        return row.status === value
      }

    },
    components:{
      EditorInfo,
      SelfInput,
      AssetList
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
          if (val === 'status' ) this.searchValList = list.dictionary.borrowStatus;
          else this.searchVal = null;
        }
      }
    },
    created(){
      this.$Store.getUserList().then((data)=>{
        this.userList = data;
      })
      this.searchValList = this.$Store.data.dictionary.borrowStatus;
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
