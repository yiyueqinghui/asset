<template>
    <div id="changeInfo">
      <!--查寻-->
      <el-form :inline="true"  :model="searchData" >
         <el-form-item>
           <el-form-item class="search">
             <el-select  v-model="searchKey" placeholder="" style="width: 110px;">
               <el-option
                 v-for="item in searchKeyList"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>
             </el-select>
             <!--日期范围选择-->
             <el-date-picker v-if="this.searchKey === 'annual_inspection_time'"
                             v-model="searchVal"
                             type="daterange"
                             range-separator="|"
                             start-placeholder="开始日期"
                             end-placeholder="结束日期"
                             value-format="yyyy-MM-dd"
                             style="position: relative;left: -12px;">
             </el-date-picker>
             <!--输入框-->
             <el-input v-if="this.inputArr.indexOf(this.searchKey)>=0" style="left: -12px;width: 200px!important;" v-model="searchVal" placeholder="请输入搜索内容"></el-input>
           </el-form-item>

           <el-form-item>
             <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
             <el-button  style="margin-left: 10px;" @click="clickBtn(2)" type="primary" icon="el-icon-edit">修改</el-button>
           </el-form-item>
         </el-form-item>
      </el-form>
      <!--表格-->
      <el-table :data="wareData"  @selection-change="handleSelectionChange" ref="multipleTable"  border stripe fit style="overflow-x: auto">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" label="序号" width="60" align="center">
        </el-table-column>
          <el-table-column  label="资产编号" prop="as_asset_number"  align="center">
        </el-table-column>
        <el-table-column  label="资产名称" prop="as_name"  align="center">
        </el-table-column>
        <el-table-column  label="供应商" prop="mt_supplier"  align="center">
        </el-table-column>
        <el-table-column  label="联系人" width="120" prop="mt_user"  align="center">
        </el-table-column>
        <el-table-column  label="联系方式"  prop="mt_phone"  align="center">
        </el-table-column>
        <el-table-column  label="维保日期" width="130" prop="mt_date"  align="center">
        </el-table-column>
        <el-table-column  label="下次维保日期" width="130" prop="mt_next"  align="center">
        </el-table-column>
        <el-table-column  label="维保说明" prop="mt_comment"  align="center">
        </el-table-column>
        <el-table-column  label="（照片）单据"  prop="mt_attachment_url" align="center">
          <template slot-scope="scope">
            <img class="tabPic" :src="scope.row.mt_attachment_url" />
          </template>
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
          <el-form :inline="true" :model="formData"  label-width="auto"  class="demo-form-inline self-input">
          <el-row class="dialog_subtitle">基本信息</el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput labelName="资产编号"  :disabled="true" keyName="as_asset_number" :val="formData.as_asset_number" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput labelName="供应商"   keyName="mt_supplier" :val="formData.mt_supplier" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput  labelName="联系人" keyName="mt_user" :val="formData.mt_user" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput  labelName="联系方式" keyName="mt_phone" :val="formData.mt_phone" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput type="3" labelName="维保日期" keyName="mt_date" :val="formData.mt_date" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput  type="3" labelName="下次维保日期" keyName="mt_next" :val="formData.mt_next" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput type="4" labelName="维保说明" keyName="mt_comment" :val="formData.mt_comment" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
            <el-row>
              <el-col :sm="16">
                <el-form-item label="（单据）附件上传">
                  <UploadFile @uploadSuccess="uploadSuccess"></UploadFile>
                </el-form-item>
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
    import UploadFile from '../../components/common/uploadFile'
    import downloadModule from '../../utils/download'
    export default {
      data: function () {
        return {
          searchKey:'as_asset_number',
          searchKeyList: [
            {
              value:'as_asset_number',
              label:'资产编号'
            },
            {
              value:'as_name',
              label:'资产名称'
            }
          ],
          searchVal:'',
          searchValList:[],
          selectArr:['user_id'],
          inputArr:['as_asset_number','as_name'],
          searchData: {
            department: ''
          },
          assetList:[],
          departmentList: [
          ],
          wareData: [
          ],
          multipleSelection: [],    //当前选中的行数据
          currentPage: 1,
          currentPageSize:10,
          total: 20,
          dialogFormVisible:false,
          formTitle: '新增',
          formData: {
          },
          dialogLoading: false,
          editDate: '2019-5-14',
          typeList:[
          ],
          uploadVisible:false
        }
      },
      created(){
      },
      methods:{
        init(){
            this.fetchData();
            this.getAssetList();
        },
        getAssetList() {
          this.$axios.Asset.storage('GET', {}).then(res => {
            let _departList = res.data;
            this.assetList = trasfer2ViewListofAsset(_departList);
          })

          function trasfer2ViewListofAsset(list){
            let retList = [];
            list.forEach((item)=>{
              let node = {};
              node.value = item.id;
              node.label = item.asset_number;
              retList.push(node);
            })
            return retList;
          }
        },
        uploadSuccess(res){
          let uuid = res[0].uuid;
          this.formData['mt_attachment'] = uuid;
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
        closeUpload(){
          this.uploadVisible = false;
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

          this.$axios.Asset.maintenance('GET',data).then(res=>{
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
        confirmBtn(){
          let id = this.formData.id;
          let data = this.formData;
          console.log('this.formTitle====',this.formTitle);
          if(this.formTitle == '新增'){
            this.$axios.Asset.maintenance('POST',data).then(res=>{
              // this.tipMessage('新增成功！');
              this.$message({
                message:'新增成功！',
                type:'success'
              })
              this.fetchData();
              this.dialogFormVisible = false;
            })
          }else{
            this.$axios.Asset.maintenance('POST',data).then(res=>{
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
        handleSelectionChange(val) {
          this.multipleSelection = val;
          console.log(this.multipleSelection);
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.currentPageSize = val;
          this.search();
        },
        handleCurrentPage(val) {
          console.log(`当前页: ${val}`);
          this.currentPage = val;
          this.search();
        },
        changeFormVal([key,val]){
          this.formData[key] = val;
          console.log(this.formData);
        }
      },
      filters:{
        turnStatus:(val)=>{
          let status;
          if(val == 1){
            status = '闲置'
          }else if(val == 2){
            status = '在用'
          }else if(val == 3){
            status = '调拨中'
          }
          return status
        }
      },
      components:{
        EditorInfo,
        SelfInput,
        UploadExcel,
        UploadFile
      },
      mounted(){
         this.init();
      },
      watch:{
        searchKey:{
          handler(val,oldVal){
            this.searchVal = '';
            let list = this.$Store.data;

            if (val === 'user_id' ) this.searchValList = list.userList;
            else this.searchVal = null;
            console.log(this.searchValList);
          }
        }
      }
    }
</script>

<style lang="less">

</style>
