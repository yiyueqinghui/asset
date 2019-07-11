<template>
  <div id="rent">
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
        <treeselect v-if="this.searchKey === 'asset_class' "
                    v-model="searchVal"
                    :multiple="false"
                    placeholder="请选择..."
                    :show-count="false"
                    :options="assetTypeList" />
        <treeselect v-if="this.searchKey === 'dep_owner' || this.searchKey === 'dep_to_use' "
                    v-model="searchVal"
                    :multiple="false"
                    placeholder="请选择..."
                    :show-count="false"
                    :options="departList" />
        <!--日期范围选择-->
        <el-date-picker v-if="this.searchKey === 'buy_at'"
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
        <el-button   type="primary" icon="el-icon-search" @click="search">查询</el-button>
        <el-button  style="margin-left: 10px;" @click="clickBtn(1)" type="primary" icon="el-icon-edit">新增</el-button>
        <el-button  style="margin-left: 10px;" @click="clickBtn(2)" type="primary" icon="el-icon-edit">修改</el-button>
        <el-dropdown v-if="false" trigger="hover" style="margin-left: 10px;" @command="handleCommand">
          <el-button type="primary" icon="el-icon-document-add">
            导入/导出
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-download" command="module">下载导入模板</el-dropdown-item>
            <el-dropdown-item icon="el-icon-upload" command="upload" >批量导入资产</el-dropdown-item>
            <el-dropdown-item icon="el-icon-download" command="download">导出资产数据</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table :data="wareData"  @selection-change="handleSelectionChange" ref="multipleTable"  border stripe fit style="overflow-x: auto">
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
      <el-table-column  label="购入时间" width="120" sortable prop="buy_at"  align="center">
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
    <!--分页-->
    <el-row>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentPage"
        :page-sizes="[10,30,50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-row>
    <!--新增/修改-->
    <el-dialog
      :close-on-click-modal="false" :close-on-press-escape="false"
      :title="formTitle"
      :visible.sync="dialogFormVisible"
      v-if="dialogFormVisible"
      width="960px"
      top="30px">
      <el-scrollbar class="dialogZone">
        <EditorInfo v-if="dialogFormVisible" :edit-date="editDate"></EditorInfo>
        <el-form :model="formData"  label-width="auto"  class="demo-form-inline self-input">
          <el-row class="dialog_subtitle">基本信息</el-row>
          <el-row>
            <el-col :sm="8">
              <SelfInput  labelName="资产名称" keyName="name" :val="formData.name" :required="true"  @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <el-col :sm="8">
                <SelfInput type="6" :select-list="assetTypeList"  labelName="资产类别" keyName="asset_class" :val="formData.asset_class" :required="true"  @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            </el-col>
            <el-col :sm="8">
              <SelfInput  labelName="资产编码" keyName="asset_number" :val="formData.asset_number" :required="false" @changeFormVal="changeFormVal" :disabled="true"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="8">
              <SelfInput  labelName="规格型号" keyName="asset_spec" :val="formData.asset_spec" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput  labelName="SN号" keyName="asset_sn" :val="formData.asset_sn" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput  type="3" labelName="购入时间" keyName="buy_at" :val="formData.buy_at" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="8">
              <SelfInput type="6" :select-list="departList"  labelName="所属机构" keyName="dep_owner" :val="formData.dep_owner" :required="true"  @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput type="2" labelName="发票号码" :selectList="invoiceList"  keyName="invoice" :val="formData.invoice" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput type="5" labelName="实付金额" keyName="price" :val="formData.price" :required="true" @changeFormVal="changeFormVal"></SelfInput>
              <!--<el-form-item label="实付金额" :rules="{required:true}">-->
              <!--<el-input type="number" v-model="formData.money" @blur="toChinese" @focus="toNum"></el-input>-->
              <!--</el-form-item>-->
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="8">
              <SelfInput type="6" :select-list="departList"  labelName="使用机构" keyName="dep_to_use" :val="formData.dep_to_use" :required="true"  @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput type="2" labelName="使用人" :selectList="userList"  keyName="user_to_use" :val="formData.user_to_use" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput  labelName="存放地点"  keyName="store_at" :val="formData.store_at" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <SelfInput type="4" labelName="备注"  keyName="comment" :val="formData.comment" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <!--维保信息-->
          <el-row class="dialog_subtitle">维保信息</el-row>
          <el-row>
            <el-col :sm="8">
              <SelfInput  labelName="供应商"  keyName="mt_supplier" :val="formData.mt_supplier" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput  labelName="联系人"  keyName="mt_user" :val="formData.mt_user" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput  labelName="联系方式"  keyName="mt_phone" :val="formData.mt_phone" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput type="4" labelName="维保说明"  keyName="mt_comment" :val="formData.mt_comment" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
        </el-form>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmBtn">确 定</el-button>
      </div>
    </el-dialog>
    <!--导入资产-->
    <UploadExcel v-if="uploadVisible" @close="closeUpload"></UploadExcel>
  </div>
</template>

<script>
  import EditorInfo from '../../components/common/editorInfo'
  import SelfInput from '../../components/common/selfInput'
  import UploadExcel from '../../components/common/uploadExcel'
  import downloadModule from '../../utils/download'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  export default {
    data: function () {
      return {
        searchKey:'name',
        searchKeyList: [
          {
            value:'status',
            label:'状态'
          },
          {
            value:'name',
            label:'资产名称'
          },
          {
            value:'asset_class',
            label:'资产类别'
          },
          {
            value:'dep_owner',
            label:'所属公司'
          },
          {
            value:'dep_to_use',
            label:'使用公司'
          },
          {
            value:'buy_at',
            label:'购入时间'
          }
        ],
        searchVal:'',
        searchValList:[],
        inputArr:['name'],
        selectArr:['status'],
        treeArr:['asset_class'],
        searchData: {
          department: ''
        },
        userList: [],
        invoiceList:[],
        assetTypeList:[],
        wareData: [],
        multipleSelection: [],    //当前选中的行数据
        currentPage: 1,
        currentPageSize:10,
        total: 20,
        dialogFormVisible:false,
        formTitle: '新增',
        formData: {
          editDate:'',
          name: '',
          asset_spec: '',
          asset_class:'',
          asset_number: '',
          asset_sn: '',
          buy_at: '',
          dep_owner:'',
          invoice: '',
          price:0,
          showPrice:0,
          chinesePrice:'',
          numPrice:'',
          dep_to_use:'',
          user_to_use: '',
          store_at: '',
          comment: '',
          mt_supplier: '',
          mt_user: '',
          mt_phone: '',
          mt_comment:''
        },
        dialogLoading: false,
        editDate: '',
        departList:[],
        uploadVisible:false
      }
    },
    methods:{
      init(){
        this.fetchData();
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
      fetchData(data){
        data = data?data:{};
        let defaultData = {
          page:this.currentPage,
          per_page:this.currentPageSize
        }
        data = Object.assign(defaultData,data);

        this.$axios.Asset.rent('GET',data).then(res=>{
          this.wareData = res.data;
          this.total = res.meta.total
        })
      },

      //查寻
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

      // 新增,修改
      clickBtn(type){
        this.formTitle = type == 1 ? '新增':'修改';
        this.editDate = this.$Store.formatDate();
        this.formData = this.$Store.resetForm(this.formData);
        if(type === 2){
          console.log(JSON.stringify(this.multipleSelection));
          if(this.multipleSelection.length === 1){
            this.formData = Object.assign({},this.multipleSelection[0]);
            console.log(JSON.stringify(this.formData));
            // this.validDate = this.formData.validDate.split('-');
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
      handleSizeChange(val) {
        this.currentPageSize = val;
        this.fetchData();
      },
      handleCurrentPage(val) {
        this.currentPage = val;
        this.fetchData();
      },
      confirmBtn(){
        let id = this.formData.id;
        let data = this.formData;
        if(this.formTitle == '新增'){
          this.$axios.Asset.rent('POST',data).then(res=>{
            // this.tipMessage('新增成功！');
            this.$message({
              message:'新增成功！',
              type:'success'
            })
            this.fetchData();
            this.dialogFormVisible = false;
          })
        }else{
          this.$axios.Asset.rent('PUT',data).then(res=>{
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
            this.$axios.Asset.storage('DELETE',item).then(res=>{
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
      changeFormVal([key,val]){
        console.log(val);
        this.formData[key] = val;
      },
      filterStatus(value,row){
        console.log(value);
        return row.status === value
      }
    },
    components:{
      EditorInfo,
      SelfInput,
      UploadExcel,
      Treeselect
    },
    created(){
      this.$Store.getAssetTypeList().then((data)=>{
        this.assetTypeList = data;
      })

      this.$Store.getDepartmentList().then((data)=>{
        this.departList = data;
      })

      this.$Store.getInvoiceList().then((data)=>{
        this.invoiceList = data;
      })

      this.$Store.getUserList().then((data)=>{
        this.userList = data;
      })
    },
    watch:{
      searchKey:{
        handler(val,oldVal){
          this.searchVal = '';
          let dictionary = this.$Store.data.dictionary;
          let selectListArr = ['status'];
          let treeListArr = ['dep_owner','dep_to_use','asset_class'];
          if(selectListArr.indexOf(val)>=0) this.searchValList =  dictionary[val];
          else if(treeListArr.indexOf(val)>=0) this.searchVal = null;
        }
      }
    },
    mounted(){
      this.init();
    }
  }
</script>

<style lang="less">

</style>
