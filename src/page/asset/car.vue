<template>
    <div id="car">
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
        <el-table-column  label="预计下次保养期" width="140" prop="nextMaintenance"  align="center">
        </el-table-column>
        <el-table-column  label="钥匙数量" prop="key_count"  align="center">
        </el-table-column>
        <el-table-column  label="钥匙编号" prop="key_number"  align="center">
        </el-table-column>
        <el-table-column  label="使用人" prop="user"  align="center">
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
          :current-page="currentPage"
          :page-sizes="[5,10,30,50]"
          :page-size="5"
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
          <el-form :inline="true" :model="formData"  ref="formData" label-width="auto"  class="demo-form-inline date-range-input">
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
              <SelfInput  labelName="投保人" keyName="proposer" :val="formData.proposer" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput  labelName="被保人" keyName="recognizee" :val="formData.recognizee" :required="true" @changeFormVal="changeFormVal"></SelfInput>
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
              <SelfInput type="3" labelName="预计下次保养期" keyName="nextMaintenance" :val="formData.nextMaintenance" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput labelName="钥匙数量" keyName="key_count" :val="formData.key_count" :required="true" @changeFormVal="changeFormVal"></SelfInput>
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
              <SelfInput labelName="现使用机构" :selectList="typeList"  keyName="useby_dep" :val="formData.useby_dep"  @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput type="1" labelName="管理人" keyName="manager" :val="formData.manager" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput type="1" labelName="使用人联系电话" keyName="useby_user_mobile" :val="formData.useby_user_mobile" :required="true" @changeFormVal="changeFormVal"></SelfInput>
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
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <el-form-item label="行驶本附件">
                <UploadFile :upload-data="uploadData" v-on:uploadSuccess="uploadSuccess2"></UploadFile>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <el-form-item label="车辆保养附件">
                <UploadFile :upload-data="uploadData" v-on:uploadSuccess="uploadSuccess3"></UploadFile>
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
            name:'file'
          },
          validDate:[]
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
          this.$axios.Asset.car('GET',{}).then(res=>{
            // console.log(" result ==++++====" + JSON.stringify(res.data));
            this.wareData = res.data;
            this.total = res.meta.total
          })
        },
        // 新增,修改
        clickBtn(type){
          let _this = this;
          _this.formTitle = type;
          // 重置数据为空值
          // this.editDate = this.$Store.formatDate();
          // _this.formData = this.$Store.formData(this.formData);

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
              /*let obj = this.multipleSelection[0];
              // setValue(_this, _this.multipleSelection[0]);
              Object.keys(_this.formData).forEach(name => {
                console.log('name = ' + name + '=== value = ' + obj[name]);
                _this.$set(_this.formData, name, obj[name])
              });*/


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
        }
      },
      mounted(){
         this.init();


      }
    }
</script>

<style>


</style>
