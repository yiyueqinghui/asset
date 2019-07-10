<template>
    <div id="workplace">
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
          <!--日期范围选择-->
          <el-date-picker v-if="this.searchKey === 'contract_end'"
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
        <el-table-column  label="职场类型" prop="use_type_zh"  align="center">
        </el-table-column>
        <el-table-column  label="职场地址" prop="address"  align="center">
        </el-table-column>
        <el-table-column  label="租赁面积" prop="area_num"  align="center">
        </el-table-column>
        <el-table-column  label="金额/平米" prop="area_charge_unit"  align="center">
        </el-table-column>
        <el-table-column  label="工位数" prop="station_num"  align="center">
        </el-table-column>
        <el-table-column  label="会议室数" prop="meeting_room_num"  align="center">
        </el-table-column>
        <el-table-column  label="可注册公司数" prop="registerable_company_num"  align="center">
        </el-table-column>
        <el-table-column  label="已注册公司名称" prop="registered_companies"  align="center">
        </el-table-column>
        <el-table-column  label="合同起始日期" prop="contract_start"  align="center">
        </el-table-column>
        <el-table-column  label="合同终止日期" prop="contract_end"  align="center">
        </el-table-column>
        <el-table-column  label="合同总金额" prop="contract_money"  align="center">
        </el-table-column>
        <el-table-column  label="支付方式" prop="pay_mode_zh"  align="center">
        </el-table-column>
        <el-table-column  label="支付类型" prop="pay_interval_zh"  align="center">
        </el-table-column>
        <el-table-column  label="租金金额" prop="rent_money"  align="center">
        </el-table-column>
        <el-table-column  label="保证金金额" prop="deposit_money"  align="center">
        </el-table-column>
        <el-table-column  label="物业费/月" prop="property_charge"  align="center">
        </el-table-column>
        <el-table-column  label="水费/立方米" prop="water_charge"  align="center">
        </el-table-column>
        <el-table-column  label="电费/度" prop="energy_charge"  align="center">
        </el-table-column>
        <el-table-column  label="网费/月" prop="internet_charge"  align="center">
        </el-table-column>
        <el-table-column  label="备注" prop="comment"  align="center">
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
          <el-form :inline="true" :model="formData"  label-width="auto"  class="demo-form-inline self-input">
            <el-row class="dialog_subtitle">基本信息</el-row>
            <el-row>
              <el-col :sm="12">
                <SelfInput  labelName="公司名称" keyName="company" :val="formData.company" :required="true"  @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="12">
                <SelfInput type="2"  labelName="职场类型" :selectList="useTypeList"  keyName="use_type" :required="true" :val="formData.use_type"  @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="12">
                <SelfInput  labelName="职场地址" keyName="address" :val="formData.address" :required="true" @changeFormVal="changeFormVal" :disabled="false"></SelfInput>
              </el-col>
              <el-col :sm="12">
                <SelfInput  labelName="租赁面积" keyName="area_num" :val="formData.area_num" :required="true" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="12">
                <SelfInput  labelName="金额/平米" keyName="area_charge_unit" :val="formData.area_charge_unit" :required="true" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="12">
                <SelfInput  labelName="工位数" keyName="station_num" :val="formData.station_num" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="12">
                <SelfInput  type="1" labelName="会议室数量" keyName="meeting_room_num" :val="formData.meeting_room_num" :required="true" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="12">
                <SelfInput type="1" labelName="可注册公司数" :selectList="typeList"  keyName="registerable_company_num" :val="formData.registerable_company_num" :required="true" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="12">
                <SelfInput labelName="已注册公司名称" keyName="registered_companies" :val="formData.registered_companies" :required="true" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="12">
                <SelfInput type="3"  labelName="合同起始日期" :selectList="companyList"  keyName="contract_start" :val="formData.contract_start" :required="true" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="12">
                <SelfInput type="3" labelName="合同终止日期" keyName="contract_end" :val="formData.contract_end" :required="true" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="12">
                <SelfInput labelName="合同总金额" keyName="contract_money" :val="formData.contract_money" :required="true" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="12">
                <SelfInput  type="2" labelName="支付方式"  :selectList="payModeList" keyName="pay_mode" :val="formData.pay_mode" :required="true" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="12">
                <SelfInput  type="2" labelName="支付类型"  :selectList="payIntervalList" keyName="pay_interval" :val="formData.pay_interval" :required="true" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="12">
                <SelfInput  type="1" labelName="租金金额"  keyName="rent_money" :val="formData.rent_money" :required="true" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="12">
                <SelfInput  type="1" labelName="保证金" keyName="deposit_money" :val="formData.deposit_money" :required="true" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="12">
                <SelfInput  type="1" labelName="物业费/月"   keyName="property_charge" :val="formData.property_charge" :required="true" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="12">
                <SelfInput  type="1" labelName="水费/立方米"   keyName="water_charge" :val="formData.water_charge" :required="true" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="12">
                <SelfInput  type="1" labelName="电费/度"   keyName="energy_charge" :val="formData.energy_charge" :required="true" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="12">
                <SelfInput  type="1" labelName="网费/月"   keyName="internet_charge" :val="formData.internet_charge" :required="true" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <SelfInput type="4" labelName="备注"  keyName="comment" :val="formData.comment" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="12">
                <el-form-item label="合同附件">
                  <UploadFile :upload-data="uploadData" v-on:uploadSuccess="uploadSuccess"></UploadFile>
                  <a  v-if="this.editStatus==2" :href="formData.contract_attachment_url" class="lookFile">查看附件</a>
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
    </div>
</template>

<script>
    import EditorInfo from '../../components/common/editorInfo'
    import SelfInput from '../../components/common/selfInput'
    import UploadFile from '../../components/common/uploadFile'
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
              value:'use_type',
              label:'职场类型'
            },
            {
              value:'address',
              label:'职场场地'
            },
            {
              value:'contract_end',
              label:'合同终止日期'
            }
          ],
          searchVal:'',
          searchValList:[],
          inputArr:['address','company'],
          selectArr:['use_type'],
          searchData: {
            department: ''
          },
          uploadData:{
            name:'file'
          },
          useTypeList:this.$Store.data.dictionary.officeType,
          payModeList:this.$Store.data.dictionary.payType,
          payIntervalList:this.$Store.data.dictionary.payWay,
          wareData: [],
          multipleSelection: [],    //当前选中的行数据
          currentPage: 1,
          currentPageSize:5,
          total: 20,
          dialogFormVisible:false,
          formTitle: '新增',
          formData: {
            editDate:'',
            name: '',
            company: '',
            use_type: '',
            address: '',
            area_num: '',
            station_num: '',
            meeting_room_num: '',
            registerable_company_num: '',
            registered_companies:0,
            contract_start:0,
            contract_end:'',
            contract_money:'',
            contract_attachment: '',
            pay_interval: '',
            rent_money: '',
            deposit_money: '',
            property_charge: '',
            water_charge: '',
            energy_charge: '',
            internet_charge: '',
            comment:''
          },
          dialogLoading: false,
          editDate: '',
          editStatus:'0'
        }
      },
      methods:{
        init(){
          this.fetchData();
        },
        uploadSuccess(res){
          let uuid = res[0].uuid;
          this.formData['contract_attachment'] = uuid;
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
          // console.log(this.multipleSelection);
        },
        handleSizeChange(val) {
          this.currentPageSize = val;
          this.fetchData();
        },
        handleCurrentPage(val) {
          this.currentPage = val;
          this.fetchData();
        },
        fetchData(data){
          data = data?data:{};
          let defaultData = {
            page:this.currentPage,
            per_page:this.currentPageSize
          }
          data = Object.assign(defaultData,data);

          this.$axios.Asset.workplace('GET',data).then(res=>{
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
          this.editStatus = type;
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
            this.$axios.Asset.workplace('POST',data).then(res=>{
              // this.tipMessage('新增成功！');
              this.$message({
                message:'新增成功！',
                type:'success'
              })
              this.fetchData();
              this.dialogFormVisible = false;
            })
          }else{
            this.$axios.Asset.workplace('PUT',data).then(res=>{
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
              this.$axios.Asset.workplace('DELETE',item).then(res=>{
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
        }
      },
      watch:{
        searchKey:{
          handler(val,oldVal){
            console.log(val);
            this.searchVal = '';
            if(val === 'use_type') this.searchValList =  this.$Store.data.dictionary.officeType;
            else this.searchVal = null;
            console.log(this.searchValList);
          }
        }
      },
      components:{
        EditorInfo,
        SelfInput,
        UploadFile
      },
      mounted(){
        this.init();
      }
    }
</script>

<style scoped>
  .lookFile{
    line-height: 30px;
    color:gray;
  }

</style>
