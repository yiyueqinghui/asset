<template>
    <div id="car">
      <!--查寻-->
      <el-form :inline="true"  :model="searchData" >
         <el-form-item>
           <!--<el-button type="primary" icon="el-icon-search" @click="fetchData">查询</el-button>-->
           <el-button  style="margin-left: 10px;" @click="clickBtn(1)" type="primary" icon="el-icon-edit">新增</el-button>
           <el-button  style="margin-left: 10px;" @click="clickBtn(2)" type="primary" icon="el-icon-edit">修改</el-button>
           <el-button  style="margin-left: 10px;" @click="deleteData" type="primary" icon="el-icon-edit">删除</el-button>

           <!--<el-dropdown trigger="hover" style="margin-left: 10px;" @command="handleCommand">-->
             <!--<el-button type="primary" icon="el-icon-document-add">-->
               <!--导入/导出-->
             <!--</el-button>-->
             <!--<el-dropdown-menu slot="dropdown">-->
               <!--<el-dropdown-item icon="el-icon-download" command="module">下载导入模板</el-dropdown-item>-->
               <!--<el-dropdown-item icon="el-icon-upload" command="upload" >批量导入资产</el-dropdown-item>-->
               <!--<el-dropdown-item icon="el-icon-download" command="download">导出资产数据</el-dropdown-item>-->
             <!--</el-dropdown-menu>-->
           <!--</el-dropdown>-->
         </el-form-item>
         <el-form-item label="" style="float: right;">
           <el-input v-model="searchData.val"  suffix-icon="el-icon-search" @blur="fetchData"  placeholder="请输入内容进行查寻"/>
         </el-form-item>
      </el-form>
      <!--表格-->
      <el-table :data="wareData"  @selection-change="handleSelectionChange" ref="multipleTable"  border stripe fit style="overflow-x: auto">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" label="序号" width="60" align="center">
        </el-table-column>
        <el-table-column  label="公司名称" prop="vehicleCompany"  align="center">
        </el-table-column>
        <el-table-column  label="车辆牌照" prop="noPlate"  align="center">
        </el-table-column>
        <el-table-column  label="投保人" prop="insuranceApplicant"  align="center">
        </el-table-column>
        <el-table-column  label="被保人" prop="insured"  align="center">
        </el-table-column>
        <el-table-column  label="年检日期" width="120" prop="annualInspectionDate"  align="center">
        </el-table-column>
        <el-table-column  label="保险有效期" width="160" prop="validDate"  align="center">
        </el-table-column>
        <el-table-column  label="公里数"  prop="km"  align="center">
        </el-table-column>
        <el-table-column  label="最新保养日期" width="130" prop="lastMaintenance"  align="center">
        </el-table-column>
        <el-table-column  label="预计下次保养期" width="140" prop="nextMaintenance"  align="center">
        </el-table-column>
        <el-table-column  label="钥匙数量" prop="noOfKeys"  align="center">
        </el-table-column>
        <el-table-column  label="钥匙编号" prop="keySerials"  align="center">
        </el-table-column>
        <el-table-column  label="使用人" prop="user"  align="center">
        </el-table-column>
        <el-table-column  label="现使用机构" width="130" prop="currentlyOwnedOrg"  align="center">
        </el-table-column>
        <el-table-column  label="管理人" prop="administrator"  align="center">
        </el-table-column>
        <!--<el-table-column  label="创建人" prop="creater"  align="center">-->
        <!--</el-table-column>-->
        <!--<el-table-column  label="创建时间" prop="createDate"  align="center">-->
        <!--</el-table-column>-->
        <el-table-column  label="备注" prop="vehicleMemo"  align="center">
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
        :title="formTitle === 1?'新增':'修改'"
        :visible.sync="dialogFormVisible"
        width="960px"
        top="20px">
        <el-scrollbar class="dialogZone">
          <EditorInfo :edit-date="editDate"></EditorInfo>
          <el-form :inline="true" :model="formData"  label-width="auto"  class="demo-form-inline date-range-input">
          <el-row class="dialog_subtitle">基本信息</el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput type="2"  labelName="资产名称" :selectList="typeList" keyName="vehicleCompany" :val="formData.vehicleCompany" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput labelName="车辆牌照"   keyName="noPlate" :val="formData.noPlate" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput  labelName="投保人" keyName="insuranceApplicant" :val="formData.insuranceApplicant" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput  labelName="被保人" keyName="insured" :val="formData.insured" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput type="3" labelName="年检日期" keyName="annualInspectionDate" :val="formData.annualInspectionDate" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <!--<SelfInput  type="3" labelName="保险有效日期" keyName="validDate" :val="formData.validDate" :required="true" @changeFormVal="changeFormVal"></SelfInput>-->
              <el-form-item label="保险有效日期">
                <el-date-picker
                  v-model="validDate"
                  type="daterange"
                  value-format="yyyyMMdd"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput labelName="公里数" keyName="km" :val="formData.km" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput type="3" labelName="最新保养日期" keyName="lastMaintenance" :val="formData.lastMaintenance" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput type="3" labelName="预计下次保养期" keyName="nextMaintenance" :val="formData.nextMaintenance" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput labelName="钥匙数量" keyName="noOfKeys" :val="formData.noOfKeys" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput  labelName="钥匙编号" keyName="keySerials" :val="formData.keySerials" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput  labelName="使用人" keyName="user" :val="formData.user" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput labelName="现使用机构" :selectList="typeList"  keyName="currentlyOwnedOrg" :val="formData.currentlyOwnedOrg"  @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput type="1" labelName="管理人" keyName="administrator" :val="formData.administrator" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput type="1" labelName="使用人联系电话" keyName="userPhone" :val="formData.bill" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <el-form-item label="被保人">
                <UploadFile :upload-data="uploadData" @uploadSuccess="uploadSuccess"></UploadFile>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <el-form-item label="行驶本">
                <UploadFile :upload-data="drivingData" @uploadSuccess="uploadSuccess"></UploadFile>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <el-form-item label="车辆保养信息">
                <UploadFile :upload-data="carData" @uploadSuccess="uploadSuccess"></UploadFile>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput type="4" labelName="备注" keyName="vehicleMemo" :val="formData.vehicleMemo"  @changeFormVal="changeFormVal"></SelfInput>
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
          searchData: {
            department: ''
          },
          departmentList: [
            {"value": "佳禾集团", "en": "JHJT"},
            {"value": "中恒信", "en": "ZHX"},
            {"value": "黄鱼儿", "en": "HYR"}
          ],
          wareData: [],
          multipleSelection: [],    //当前选中的行数据
          currentPage: 1,
          total: 20,
          dialogFormVisible:false,
          formTitle: 1,
          formData: {
            "annualInspectionDate": "2018-09-09",
            "vehicleCompany": "公司名称",
            "vehicleMemo": "备注",
            "insured": "被保人",
            "user": "使用人",
            "vehicleLicenseAttachment": "",
            "nextMaintenance": "2019-09-13",
            "maintenanceAttachment": "",
            "insuredAttachment": "",
            "validDate": "20180909-20220914",
            "km": "1123",
            "insuranceApplicant": "投保人",
            "currentlyOwnedOrg": "现使用机构",
            "lastMaintenance": "2019-09-08",
            "noPlate": "车辆牌照",
            "administrator": "管理人",
            "noOfKeys": "10",
            "userPhone": "使用人联系电话",
            "keySerials": "钥匙编号"
          },
          dialogLoading: false,
          editDate: '2019-5-14',
          typeList:[
            {
              value:'类别一'
            },
            {
              value:'类别二'
            },
            {
              value:'类别三'
            }
          ],
          uploadVisible:false,
          uploadData:{
            name:'person'
          },
          drivingData:{
            name:'driving'
          },
          carData:{
            name:'car'
          },
          validDate:[]
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
        uploadSuccess(arr){
            console.log(arr);
        },
        closeUpload(){
          this.uploadVisible = false;
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
          console.log('开始查寻');
          this.$axios.Asset.car('GET',{}).then(res=>{
            console.log(res);
            this.wareData = res;
            this.total = res.length;
          })
        },
        // 新增,修改
        clickBtn(type){
          this.formTitle = type;
          this.editDate = this.$Store.formatDate();
          this.formData = this.$Store.resetForm(this.formData);
          if(type === 2){
            if(this.multipleSelection.length === 1){
              this.formData = Object.assign({},this.multipleSelection[0]);
              this.validDate = this.formData.validDate.split('-');
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
          console.log(this.multipleSelection);
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
          if(this.formTitle == '1'){
            this.$axios.Asset.car('POST',data).then(res=>{
              this.$message({
                message:'新增成功！',
                type:'success'
              })
              this.fetchData();
              this.dialogFormVisible = false;
            })
          }else{
            this.$axios.Asset.car('PUT',data).then(res=>{
              console.log(res);
              this.$message({
                message:'修改成功!',
                type:'success'
              })
              this.fetchData();
              this.dialogFormVisible = false;
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
              this.$axios.Asset.car('DELETE',item).then(res=>{
                deleteNum+=1;
                if(data.length === deleteNum){
                  this.$message({
                    message:'删除成功！',
                    type:'success'
                  })
                  this.fetchData();
                }
              })
            })
          }
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
      watch:{
        validDate:{
          handler(val,oldval){
            console.log(val);
            this.formData.validDate = val.join('-');
          },
          deep:true
        }
      },
      mounted(){
         this.init();


      }
    }
</script>

<style>


</style>
