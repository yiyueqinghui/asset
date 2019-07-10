<template>
    <div id="car">
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

        </el-form-item>
         <el-form-item>
           <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
           <el-button  style="margin-left: 10px;" @click="clickBtn(1)" type="primary" icon="el-icon-edit">新增</el-button>
           <el-button  style="margin-left: 10px;" @click="clickBtn(2)" type="primary" icon="el-icon-edit">修改</el-button>
           <el-button  style="margin-left: 10px;" @click="deleteData" type="primary" icon="el-icon-edit">删除</el-button>
         </el-form-item>
      </el-form>
      <!--表格-->
      <el-table :data="wareData"  @selection-change="handleSelectionChange" ref="multipleTable"  border stripe fit style="overflow-x: auto">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" label="序号" width="60" align="center">
        </el-table-column>
        <el-table-column  label="公司名称" prop="company"  align="center">
        </el-table-column>
        <el-table-column  label="车辆牌照" prop="car_number"  align="center">
        </el-table-column>
        <el-table-column  label="投保人" prop="proposer"  align="center">
        </el-table-column>
        <el-table-column  label="被保人" prop="recognizee"  align="center">
        </el-table-column>
        <el-table-column  label="年检日期" width="120" prop="annual_inspection_time"  align="center">
        </el-table-column>
        <el-table-column  label="保险有效期" width="160" prop="insurance_end_time"  align="center">
        </el-table-column>
        <el-table-column  label="公里数"  prop="mileage"  align="center">
        </el-table-column>
        <el-table-column  label="最新保养日期" width="130" prop="maintain_time"  align="center">
        </el-table-column>
        <el-table-column  label="钥匙数量" prop="key_count"  align="center">
        </el-table-column>
        <el-table-column  label="钥匙编号" prop="key_number"  align="center">
        </el-table-column>
        <el-table-column  label="使用人" prop="useby_user"  align="center">
        </el-table-column>
        <el-table-column  label="现使用机构" width="130" prop="useby_dep"  align="center">
        </el-table-column>
        <el-table-column  label="管理人" prop="manager"  align="center">
        </el-table-column>
        <!--<el-table-column  label="创建人" prop="creater"  align="center">-->
        <!--</el-table-column>-->
        <!--<el-table-column  label="创建时间" prop="createDate"  align="center">-->
        <!--</el-table-column>-->
        <el-table-column  label="备注" prop="comment"  align="center">
        </el-table-column>

      </el-table>
      <!--分页-->
      <el-row>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentPage"
          :page-sizes="[10,30,50]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-row>
      <!--新增/修改-->
      <el-dialog
        :close-on-click-modal="false" :close-on-press-escape="false" ref
        :title="formTitle === 1?'新增':'修改'"
        :visible.sync="dialogFormVisible"
        v-if="dialogFormVisible"
        width="960px"
        top="20px">
        <el-scrollbar class="dialogZone">
          <EditorInfo :edit-date="editDate"></EditorInfo>
          <el-form :inline="true" :model="formData"  ref="formData" label-width="auto"  class="demo-form-inline self-input">
          <el-row class="dialog_subtitle">基本信息</el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput type="1"  labelName="公司名称" :selectList="typeList" keyName="company" :val="formData.company" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput labelName="车辆牌照"   keyName="car_number" :val="formData.car_number" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput   labelName="投保人" keyName="proposer" :val="formData.proposer" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput   labelName="被保人" keyName="recognizee" :val="formData.recognizee" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput type="3" labelName="年检日期" keyName="annual_inspection_time" :val="formData.annual_inspection_time" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput type="3" labelName="保险有效日期" keyName="insurance_end_time" :val="formData.insurance_end_time" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput labelName="公里数" keyName="mileage" :val="formData.mileage" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput type="3" labelName="最新保养日期" keyName="maintain_time" :val="formData.maintain_time" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput  labelName="钥匙编号" keyName="key_number" :val="formData.key_number" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput  labelName="使用人" keyName="useby_user" :val="formData.useby_user" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <!--<SelfInput type="6" labelName="现使用机构" :selectList="departList"  keyName="useby_dep" :val="formData.useby_dep"  @changeFormVal="changeFormVal"></SelfInput>-->
              <SelfInput labelName="现使用机构" keyName="useby_dep" :val="formData.useby_dep"  @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput  labelName="管理人"  keyName="manager" :val="formData.manager" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput type="1" labelName="使用人联系电话" keyName="useby_user_mobile" :val="formData.useby_user_mobile" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput labelName="钥匙数量" keyName="key_count" :val="formData.key_count" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>

            <el-row>
              <el-col :sm="12">
                <SelfInput type="4" labelName="备注" keyName="comment" :val="formData.comment"  @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            </el-row>
          <el-row>
            <el-col :sm="12">
              <el-form-item label="被保人附件">
                <UploadFile :upload-data="uploadData" v-on:uploadSuccess="uploadSuccess1"></UploadFile>
                <a  v-if="this.editStatus==2" :href="formData.recognizee_detail_attachment_url" class="lookFile">查看附件</a>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <el-form-item label="行驶本附件">
                <UploadFile :upload-data="uploadData" v-on:uploadSuccess="uploadSuccess2"></UploadFile>
                <a  v-if="this.editStatus==2" :href="formData.driving_detail_attachment_url" class="lookFile">查看附件</a>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <el-form-item label="车辆保养附件">
                <UploadFile :upload-data="uploadData" v-on:uploadSuccess="uploadSuccess3"></UploadFile>
                <a  v-if="this.editStatus==2" :href="formData.maintain_detail_attachment_url" class="lookFile">查看附件</a>
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
          searchKey:'company',
          searchKeyList: [
            {
              value:'company',
              label:'公司名称'
            },
            {
              value:'car_number',
              label:'车辆牌照'
            },
            {
              value:'annual_inspection_time',
              label:'年检日期'
            }
          ],
          searchVal:'',
          searchValList:[],
          inputArr:['company','car_number'],
          wareData: [],
          multipleSelection: [],    //当前选中的行数据
          currentPage: 1,
          currentPageSize:10,
          total: 20,
          dialogFormVisible:false,
          formTitle: 1,
          formData: {
            "company": "",
            "car_number": "",
            "proposer": "",
            "recognizee": "",
            "annual_inspection_time": "",
            "insurance_end_time": "",
            "mileage": "",
            "maintain_time": "",
            "key_count": "",
            "key_number": "",
            "useby_user": "",
            "insuranceApplicant": "",
            "useby_user_mobile": "",
            "useby_dep": "",
            "manager": "",
            "recognizee_detail": "",
            "driving_detail": "",
            "maintain_detail": "",
            "comment": "",
          },
          dialogLoading: false,
          editDate: '',
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
            name:'file'
          },
          validDate:[],
          userList:[],
          departList:[]
        }
      },
      methods:{
        init(){
          this.fetchData();
        },
        uploadSuccess1(res){
          let uuid = res[0].uuid;
          this.formData['recognizee_detail'] = uuid;
        },
        uploadSuccess2(res){
          let uuid = res[0].uuid;
          this.formData['driving_detail'] = uuid;
        },
        uploadSuccess3(res){
          let uuid = res[0].uuid;
          this.formData['maintain_detail'] = uuid;
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
        },
        handleSizeChange(val) {
          this.currentPageSize = val;
        },
        handleCurrentPage(val) {
          this.currentPage = val;
        },
        fetchData(data){
          data = data?data:{};
          let defaultData = {
            page:this.currentPage,
            per_page:this.currentPageSize
          }
          data = Object.assign(defaultData,data);
          this.$axios.Asset.car('GET',data).then(res=>{
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
          let _this = this;
          this.editStatus = type;
          _this.formTitle = type;

          // 清空操作
          Object.keys(_this.formData).forEach(name => {
            _this.$set(_this.formData, name, '')
          });

          // type=2 修改操作，否则新增
          if(type === 2){
            console.log(JSON.stringify(this.multipleSelection));
            if(_this.multipleSelection.length === 1){
              // 修改，抓取列表数据赋值
              _this.formData = Object.assign({},this.multipleSelection[0]);
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
          if(this.formTitle == 1){
            this.$axios.Asset.car('POST',data).then(res=>{
              // this.tipMessage('新增成功！');
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
              this.$axios.Asset.car('DELETE',item).then(res=>{
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
        },
        searchKey:{
          handler(val,oldVal){
            this.searchVal = '';
          }
        }
      },
      mounted(){
         this.init();
      }
    }
</script>

<style>


</style>
