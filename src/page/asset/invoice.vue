<template>
    <div id="invoice">
      <!--查寻-->
      <el-form :inline="true"  :model="searchData" >
         <el-form-item label="">
           <el-input v-model="searchData.department" filterable placeholder="请选择">
           </el-input>
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
      <el-table :data="wareData"  @selection-change="handleSelectionChange" ref="multipleTable"  border stripe fit style="overflow-x: auto">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" label="序号" width="60" align="center">
        </el-table-column>
        <el-table-column  label="资产类型" prop="asset_class"  align="center">
        </el-table-column>
        <el-table-column  label="发票类型" prop="inv_type"  align="center">
        </el-table-column>
        <el-table-column  label="发票号码" prop="inv_number"  align="center">
        </el-table-column>
        <el-table-column  label="开票日期" prop="inv_time"  align="center">
        </el-table-column>
        <el-table-column  label="发票金额" prop="inv_money"  align="center">
        </el-table-column>
        <el-table-column  label="创建人" prop="create_by_zh"  align="center">
        </el-table-column>
        <el-table-column  label="备注" prop="comment"  align="center">
        </el-table-column>
        <el-table-column  label="（照片）发票"  prop="image_attachment_url" align="center">
          <template slot-scope="scope">
            <img class="tabPic" :src="scope.row.image_attachment_url" />
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
      <el-dialog v-if="dialogFormVisible"
        :close-on-click-modal="false" :close-on-press-escape="false"
        :title="formTitle"
        :visible.sync="dialogFormVisible"
        width="960px">
        <EditorInfo :edit-date="editDate"></EditorInfo>
        <el-form :inline="true" :model="formData"  label-width="auto"  class="demo-form-inline self-input">
          <el-row class="dialog_subtitle">基本信息</el-row>
          <el-row>
            <el-col :sm="8">
              <el-form-item label="资产类型">
                <treeselect
                  v-model="formData.asset_class"
                  @select="funTreeSel"
                  :multiple="false"
                  placeholder="请选择"
                  :show-count="false"
                  :options="assetTypeList" />
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <SelfInput type="2"  labelName="发票类型" :selectList="invoiceTypeList"  keyName="inv_type" :val="formData.inv_type" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput  labelName="发票号码" keyName="inv_number" :val="formData.inv_number" :required="true" @changeFormVal="changeFormVal" :disabled="false"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="8">
              <SelfInput type="3" labelName="开票日期" keyName="inv_time" :val="formData.inv_time" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput type="5" labelName="发票金额" keyName="inv_money" :val="formData.inv_money" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput  type="4" labelName="开票备注" keyName="comment" :val="formData.comment" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="16">
              <el-form-item label="发票附件">
                <UploadFile :upload-data="invoiceFile" @uploadSuccess="uploadSuccess"></UploadFile>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmBtn">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    import EditorInfo from '../../components/common/editorInfo'
    import SelfInput from '../../components/common/selfInput'
    import downloadModule from '../../utils/download'
    import UploadFile from '../../components/common/uploadFile'
    import Treeselect from '@riophae/vue-treeselect'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'

    export default {
      data: function () {
        return {
          searchData: {
            department: ''
          },
          invoiceData:{},
          departmentList: [
            {"value": "佳禾集团", "en": "JHJT"},
            {"value": "中恒信", "en": "ZHX"},
            {"value": "黄鱼儿", "en": "HYR"}
          ],
          invoiceTypeList: [
            {"value": 1, "label": "普通发票"},
            {"value": 2, "label": "增值税专用发票"}
          ],
          assetTypeList:[
          ],
          wareData: [
          ],
          multipleSelection: [],    //当前选中的行数据
          currentPage: 1,
          total: 20,
          dialogFormVisible:false,
          formTitle: '新增',
          formData: {
            asset_class: '',
            inv_type: '',
            inv_number: '',
            inv_time: '',
            inv_money: '',
            comment: '',
            image: ''
          },
          dialogLoading: false,
          editDate: '2019-5-14',
          invoiceFile:{
            name:'invoiceFile'
          }


        }
      },
      methods:{
        init(){
          this.fetchData();
          this.getAssetTypeList();
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
        getAssetTypeList() {
          this.$axios.Asset.asset_type('GET', {}).then(res => {
            // console.log(" result ==" + res.data.tree);
            let _departList = res.data.tree;
            let result = this.transData2Tree(_departList);
            this.assetTypeList = result;
          })
        },
        funTreeSel(node){
          console.log(JSON.stringify(node.id))
          let val = node.id;
          this.formData.asset_class = val;
        },
        uploadSuccess(res){
          let uuid = res[0].uuid;
          this.formData['attachment'] = uuid;
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
        handleSelectionChange(val) {
          this.multipleSelection = val;
          console.log(this.multipleSelection);
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentPage(val) {
          console.log(`当前页: ${val}`);
          this.currentPage = val;
        },
        fetchData(){
          this.$axios.Asset.invoice('GET',{}).then(res=>{
            console.log(" result ==++++====" + JSON.stringify(res.data));
            this.wareData = res.data;
            this.total = res.meta.total
          })
        },
        // 新增,修改
        clickBtn(type){
          this.formTitle = type == 1 ? '新增':'修改';
          this.editDate = this.$Store.formatDate();
          this.formData = this.$Store.resetForm(this.formData);
          if(typeof this.formData.asset_class != "undefined"){
            this.formData.asset_class = null;
          }
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
          if(this.formTitle == '新增'){
            this.$axios.Asset.invoice('POST',data).then(res=>{
              // this.tipMessage('新增成功！');
              this.$message({
                message:'新增成功！',
                type:'success'
              })
              this.fetchData();
              this.dialogFormVisible = false;
            })
          }else{
            this.$axios.Asset.invoice('PUT',data).then(res=>{
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
              this.$axios.Asset.invoice('DELETE',item).then(res=>{
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
        downloadModule,
        UploadFile,
        Treeselect
      },
      mounted(){
         this.init();
      }
    }
</script>

<style lang="less">

</style>
