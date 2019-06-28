<template>
    <div id="wareHousing">
      <!--查寻-->
      <el-form :inline="true"  :model="searchData" >
         <el-form-item label="领用日期">
           <el-date-picker
             v-model="searchData.startDate"
             type="date"
             value-format="yyyy-MM-dd"
             placeholder="选择开始日期">
           </el-date-picker>
           <span>一</span>
           <el-date-picker
             v-model="searchData.endDate"
             type="date"
             value-format="yyyy-MM-dd"
             placeholder="选择结束日期">
           </el-date-picker>
         </el-form-item>
         <el-form-item>
           <el-button type="primary" icon="el-icon-search" @click="fetchData">查询</el-button>
           <el-button  style="margin-left: 10px;" @click="clickBtn(1)" type="primary" icon="el-icon-edit">新增</el-button>
           <!--<el-button  style="margin-left: 10px;" @click="clickBtn(2)" type="primary" icon="el-icon-edit">修改</el-button>-->
           <el-dropdown trigger="hover" style="margin-left: 10px;" @command="handleCommand">
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
      <el-table :data="tabData"  @selection-change="handleSelectionChange" ref="multipleTable"  border stripe fit style="overflow-x: auto">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" label="序号" width="60" align="center">
        </el-table-column>
        <el-table-column  label="领用日期"  prop="recv_time" align="center">
        </el-table-column>
        <el-table-column  label="领用人" prop="user_id"  align="center">
        </el-table-column>
        <el-table-column  label="领用后使用机构" width="120" prop="recv_dep"  align="center">
        </el-table-column>
        <el-table-column  label="领用后区域" width="100" prop="recv_store_at"  align="center">
        </el-table-column>
        <el-table-column  label="备注" prop="receiveRemarks"  align="center">
        </el-table-column>
        <el-table-column  label="资产明细"  align="center">
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
                  :options="companyList" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="16">
              <SelfInput type="4" labelName="备注"  keyName="receiveRemarks" :val="formData.receiveRemarks" @changeFormVal="changeFormVal"></SelfInput>
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
          <el-table-column type="index" label="序号" width="60" align="center">
          </el-table-column>
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



        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmBtn">确 定</el-button>
        </div>
      </el-dialog>

      <!--导入资产-->
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
          searchData: {
            startDate:'',
            endDate:''
          },
          tabData: [
          ],
          multipleSelection: [],    //当前选中的行数据
          currentPage: 1,
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
          companyList:[
          ],
          departList:[
            {
              value:'部门一'
            },
            {
              value:'部门二'
            }
          ],
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
          this.getUserList();
          this.fetchData();
          this.getDepartmentList();
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
          this.$axios.Asset.receive('GET',{}).then(res=>{
            console.log(" result ==" + res.data);
            this.tabData = res.data;
            this.total = res.meta.total
          })
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
            console.log(JSON.stringify(this.multipleSelection));
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
        }
      },
      mounted(){
         // let arr = new Array(20).fill(this.allAssets[0]);
         // this.allAssets = arr;
         //
         // let testArr = new Array(20).fill(this.choosedData[0]);
         // this.choosedData = testArr;

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
