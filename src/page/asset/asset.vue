<template>
  <div id="storage">
    <!--查寻-->
    <el-form :inline="true"  :model="searchData" >
      <el-form-item label="使用公司部门">
        <el-select v-model="searchData.department" filterable placeholder="请选择">
          <el-option
            v-for="item in departmentList"
            :key="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData">查询</el-button>
        <el-button  style="margin-left: 10px;" @click="clickBtn(1)" type="primary" icon="el-icon-edit">新增</el-button>
        <el-button  style="margin-left: 10px;" @click="clickBtn(2)" type="primary" icon="el-icon-edit">修改</el-button>
        <el-dropdown trigger="hover" style="margin-left: 10px;" @command="handleCommand">
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
    <el-table :data="wareData"  @selection-change="handleSelectionChange" ref="multipleTable"  border stripe fit stripe style="overflow-x: auto">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" label="序号" width="60" align="center">
      </el-table-column>
      <!--<el-table-column  label="状态" prop="status" width="120" filterable :filters="this.$Store.data.statusList"
                        :filter-method="filterStatus" filter-placement="bottom-end"  align="center">
        <template slot-scope="scope">
          {{scope.row.status | turnStatus }}
        </template>
      </el-table-column>-->

      <el-table-column  label="状态" width="100" prop="status_zh"  align="center">
      </el-table-column>
      <el-table-column  label="资产名称" width="100" prop="name"  align="center">
      </el-table-column>
      <el-table-column  label="资产类别" prop="asset_class"  align="center">
      </el-table-column>
      <el-table-column  label="资产编码" prop="asset_number"  align="center">
      </el-table-column>
      <el-table-column  label="规格型号" prop="asset_spec"  align="center">
      </el-table-column>
      <el-table-column  label="SN号" width="130" prop="asset_sn"  align="center">
      </el-table-column>
      <el-table-column  label="购入时间" width="120" sortable prop="buy_at"  align="center">
      </el-table-column>
      <el-table-column  label="所属公司" prop="dep_owner"  align="center">
      </el-table-column>
      <el-table-column  label="发票号码" width="100" prop="invoice"  align="center">
      </el-table-column>
      <el-table-column  label="使用公司" prop="dep_to_use"  align="center">
      </el-table-column>
      <el-table-column  label="使用人" prop="user_to_use"  align="center">
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
        :current-page="currentPage"
        :page-sizes="[5,10,30,50]"
        :page-size="5"
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
      top="80px">
      <el-scrollbar class="dialogZone">
        <EditorInfo v-if="dialogFormVisible" :edit-date="editDate"></EditorInfo>
        <el-form :model="formData"  label-width="auto"  class="demo-form-inline self-input">
          <el-row class="dialog_subtitle">基本信息</el-row>
          <el-row>
            <el-col :sm="8">
              <SelfInput  labelName="资产名称" keyName="name" :val="formData.name" :required="true"  @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <el-form-item label="资产类别">
                <treeselect
                  v-model="formData.asset_class"
                  @select="funTreeSel3"
                  :multiple="false"
                  placeholder="Select..."
                  :show-count="false"
                  :options="assetTypeList" />
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <SelfInput  labelName="资产编码" keyName="asset_number" :val="formData.asset_number" :required="false" @changeFormVal="changeFormVal" :disabled="false"></SelfInput>
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
              <el-form-item label="所属机构">
                <treeselect
                  v-model="formData.dep_owner"
                  @select="funTreeSel1"
                  :multiple="false"
                  placeholder="请选择"
                  :show-count="false"
                  :options="companyList" />
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <SelfInput type="2" labelName="发票号码" :selectList="invoiceList"  keyName="invoice" :val="formData.invoice" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput type="5" labelName="实付金额" keyName="money" :val="formData.money" :required="true" @changeFormVal="changeFormVal"></SelfInput>
              <!--<el-form-item label="实付金额" :rules="{required:true}">-->
              <!--<el-input type="number" v-model="formData.money" @blur="toChinese" @focus="toNum"></el-input>-->
              <!--</el-form-item>-->
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="8">
              <el-form-item label="使用机构">
                <treeselect
                  v-model="formData.dep_to_use"
                  @select="funTreeSel2"
                  :multiple="false"
                  placeholder="请选择"
                  :show-count="false"
                  :options="companyList" />
              </el-form-item>
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
        searchData: {
          department: ''
        },
        userList: [],
        invoiceList:[],
        assetTypeList:[],
        wareData: [],
        multipleSelection: [],    //当前选中的行数据
        currentPage: 1,
        total: 20,
        dialogFormVisible:false,
        formTitle: '新增',
        formData: {
          editDate:'',
          name: '',
          asset_spec: '',
          asset_class: null,
          asset_number: '',
          asset_sn: '',
          buy_at: '',
          dep_owner: null,
          invoice: '',
          money:0,
          showMoney:0,
          chineseMoney:'',
          numMoney:'',
          dep_to_use: null,
          user_to_use: '',
          store_at: '',
          comment: '',
          mt_supplier: '',
          mt_user: '',
          mt_phone: '',
          mt_comment:''
        },
        dialogLoading: false,
        editDate: '2019-05-11',
        companyList:[
        ],
        departList:[
        ],
        departmentList:[],
        uploadVisible:false
      }
    },
    methods:{
      init(){
        this.fetchData();
        this.getDepartmentList();
        this.getInvoiceList();
        this.getUserList();
        this.getAssetTypeList();
      },

      getAssetTypeList() {
        this.$axios.Asset.asset_type('GET', {}).then(res => {
          // console.log(" result ==" + res.data.tree);
          let _departList = res.data.tree;
          let result = this.transData2Tree(_departList);
          this.assetTypeList = result;
        })
      },
      getUserList() {
        this.$axios.Asset.user('GET', {}).then(res => {
          let _departList = res.data;
          this.userList = trasfer2ViewListofUser(_departList);
        })

        function trasfer2ViewListofUser(list){
          let retList = [];
          list.forEach((item)=>{
            let node = {};
            node.value = item.id;
            node.label = item.name;
            retList.push(node);
          })
          return retList;
        }
      },
      getInvoiceList() {
        this.$axios.Asset.invoice('GET', {}).then(res => {
          let _departList = res.data;
          this.invoiceList = trasfer2ViewListofVoice(_departList);
        })

        function trasfer2ViewListofVoice(list){
          let retList = [];
          list.forEach((item)=>{
            let node = {};
            node.value = item.id;
            node.label = item.inv_number;
            retList.push(node);
          })
          return retList;
        }
      },

      transData2Tree(list){
        let retList = [];
        list.forEach((item)=>{
          let node = {};
          node.id = item.id;
          node.label = item.name;
          let children = item.children;
          if(typeof children != "undefined"){
            this.getChildData(node, children);
          }
          retList.push(node);
        })
        return retList;
      },
      getChildData(node, list) {
        let retList = [];
        list.forEach((item)=>{
          let node = {};
          node.id = item.id;
          node.label = item.name;
          let children = item.children;
          if(typeof children != "undefined"){
            this.getChildData(node, children);
          }
          retList.push(node);
        })
        node.children = retList;
      },
      getDepartmentList(){
        this.$axios.Asset.department('GET',{}).then(res=>{
          // console.log(" result ==" + res.data.tree);
          let _departList = res.data.tree;
          let result = this.transData2Tree(_departList);
          this.departList = result;
          this.companyList = result;
        })
      },
      funTreeSel1(node){
        console.log(JSON.stringify(node.id))
        let val = node.id;
        this.formData.dep_owner = val;
      },
      funTreeSel2(node){
        console.log(JSON.stringify(node.id))
        let val = node.id;
        this.formData.dep_to_use = val;
      },
      funTreeSel3(node){
        console.log(JSON.stringify(node.id))
        let val = node.id;
        this.formData.asset_class = val;
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
        this.$axios.Asset.storage('GET',{}).then(res=>{
          console.log(" result ==" + res.data);
          this.wareData = res.data;
          this.total = res.meta.total
        })
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
        // console.log(this.multipleSelection);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentPage(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
      },
      confirmBtn(){
        let id = this.formData.id;
        let data = this.formData;
        if(this.formTitle == '新增'){
          this.$axios.Asset.storage('POST',data).then(res=>{
            // this.tipMessage('新增成功！');
            this.$message({
              message:'新增成功！',
              type:'success'
            })
            this.fetchData();
            this.dialogFormVisible = false;
          })
        }else{
          this.$axios.Asset.storage('PUT',data).then(res=>{
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
    mounted(){
      this.init();
      // let arr = new Array(5).fill(this.wareData[0]);
      // this.wareData = arr;
      this.$Store.NumberToChinese(101.31);
      console.log(this.$Store.data.statusList)

    }
  }
</script>

<style lang="less">

</style>
