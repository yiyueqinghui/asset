<template>
    <div id="storage">
      <EditorInfo :edit-date="formData.editDate"></EditorInfo>
      <el-form :inline="true" :model="formData"  label-width="auto"   class="demo-form-inline self-input">
        <el-row class="dialog_subtitle">基本信息</el-row>
        <el-row>
          <el-col :sm="8" class="category">
            <el-form-item label="资产类型">
              <treeselect
                v-model="value"
                @select="selectVal"
                :multiple="false"
                placeholder="请选择"
                :show-count="true"
                :options="assetSelect" />
            </el-form-item>
          </el-col>
        </el-row>

          <!--发票-->
        <el-row v-if="this.type===2">
          <el-col :sm="8">
            <SelfInput type="2" :selectList="invoiceCategoryList"   labelName="发票类型" keyName="invoiceCategory" :val="formData.invoiceCategory" :required="true"  @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-col :sm="8">
            <SelfInput  labelName="发票号码" keyName="invoiceNo" :val="formData.invoiceNo" :required="true"  @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-col :sm="8">
            <SelfInput type="3" labelName="开票日期" keyName="invoiceDate" :val="formData.invoiceDate" :required="true" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-col :sm="8">
            <SelfInput type="5" labelName="发票金额" keyName="invoiceAmount" :val="formData.invoiceAmount" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>

            <el-col :sm="24">
              <SelfInput  type="4" labelName="开票备注"   keyName="invoiceMemo" :val="formData.invoiceMemo" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          <el-row>
            <el-col :sm="12">
              <el-form-item label="发票附件">
                <UploadFile :upload-data="{name:'invoicePic'}" @uploadSuccess="uploadSuccess"></UploadFile>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <!--门禁卡-->
        <el-row v-else-if="this.type===5">
          <el-col :sm="8">
            <SelfInput type="1" labelName="姓名" keyName="Name" :val="formData.Name" :required="true" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-col :sm="8">
            <SelfInput type="2"  labelName="所属机构" :selectList="typeList"  keyName="org" :val="formData.org" :required="true" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-col :sm="8">
            <SelfInput  labelName="卡号" keyName="cardNo" :val="formData.cardNo" :required="true" @changeFormVal="changeFormVal" ></SelfInput>
          </el-col>
          <el-col :sm="8">
            <SelfInput type="1"  labelName="手机号码" keyName="phoneNo" :val="formData.phoneNo" :required="true" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-col :sm="8">
            <SelfInput type="1"  labelName="身份证号" keyName="idCardNo" :val="formData.idCardNo" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-row>
            <el-col :sm="12">
              <el-form-item label="身份证复印件">
                <UploadFile :upload-data="{name:'idPhotoCopy'}" @uploadSuccess="uploadSuccess"></UploadFile>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>

          <!--商标注册-->
        <el-row v-else-if="this.type===6">
            <el-col :sm="8">
              <SelfInput type="2" labelName="公司名称" keyName="company" :val="formData.company" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput type="1"  labelName="中文名称"  keyName="chTrademarkName" :val="formData.chTrademarkName" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput  labelName="英文名称" keyName="enTrademarkName" :val="formData.enTrademarkName" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput  labelName="商标分类" keyName="trademarkCategory" :val="formData.trademarkCategory" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput type="3" labelName="注册日期" keyName="regDate" :val="formData.regDate" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <el-form-item label="有效期">
                <el-date-picker
                  v-model="validDate"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyyMMdd">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :sm="24">
              <SelfInput  type="4" labelName="备注" keyName="trademarkMemo" :val="formData.trademarkMemo" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-row>
              <el-col :sm="12">
                <el-form-item label="商标附件">
                  <UploadFile :upload-data="{name:'trademarkAttachment'}" @uploadSuccess="uploadSuccess"></UploadFile>
                </el-form-item>
              </el-col>
            </el-row>
        </el-row>

            <!--icp-->
        <el-row v-else-if="this.type===7">
            <el-col :sm="8">
              <SelfInput type="2" :selectList="typeList" labelName="公司名称" keyName="company" :val="formData.company" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput type="3"  labelName="初次申请时间"  keyName="initialRegDate" :val="formData.initialRegDate" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput  labelName="经营许可证编号" keyName="managementLicenseNo" :val="formData.managementLicenseNo" :required="true" @changeFormVal="changeFormVal" ></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput labelName="网站名称" keyName="websiteName" :val="formData.websiteName" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput labelName="网址" keyName="url" :val="formData.url" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <el-form-item label="有效期">
                <el-date-picker
                  v-model="validDate"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyyMMdd">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <SelfInput type="3" labelName="年检时间记录" keyName="annualInspection" :val="formData.annualInspection" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
              <el-col :sm="24">
                <SelfInput type="4" labelName="ICP备注"   keyName="icpMemo" :val="formData.icpMemo" :required="true" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            <el-row>
              <el-col :sm="15">
                <el-form-item label="ICP附件上传">
                  <UploadFile :upload-data="{name:'icpAttachment'}" @uploadSuccess="uploadSuccess"></UploadFile>
                </el-form-item>
              </el-col>
            </el-row>
        </el-row>

          <!--办公职场-->
        <el-row v-else-if="this.type===8">
            <el-col :sm="8">
              <SelfInput  labelName="公司名称" :selectList="typeList" keyName="company" :val="formData.company"  @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput type="2"  labelName="职场类型" :selectList="workCategoryList"  keyName="branchCategory" :val="formData.branchCategory"  @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput  labelName="职场地址" keyName="brandhAddress" :val="formData.brandhAddress"  @changeFormVal="changeFormVal" ></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput  labelName="职场租赁面积" keyName="branchArea" :val="formData.branchArea" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput  labelName="职场每㎡金额" keyName="amountPerSquareMeter" :val="formData.amountPerSquareMeter" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput  labelName="职场工位数" keyName="seats" :val="formData.seats" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput  labelName="职场会议室数量"   keyName="conferenceRoomNo" :val="formData.conferenceRoomNo"  @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput labelName="可注册公司数量" keyName="availableRegCompanyNo" :val="formData.availableRegCompanyNo"  @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput labelName="已注册公司名称" keyName="registeredCompanyNo" :val="formData.registeredCompanyNo" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput type="3"  labelName="合同起始日期" keyName="contractStartDate" :val="formData.contractStartDate"  @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput type="3" labelName="合同终止日期"  keyName="contractEndDate" :val="formData.contractEndDate" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput labelName="合同总金额" keyName="contractAmount" :val="formData.contractAmount" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput type="2" :selectList="payCategoryList" labelName="支付方式"  keyName="paymentMethod" :val="formData.paymentMethod" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput type="2" :selectList="payWayList" labelName="支付类型"  keyName="payWay" :val="formData.payWay" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput type="5" labelName="租金金额"  keyName="rentAmount" :val="formData.rentAmount" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput  labelName="保证金金额"  keyName="depositAmount" :val="formData.depositAmount" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput labelName="物业费金额/月"  keyName="propertyFree" :val="formData.propertyFree" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput labelName="水费/立方米"  keyName="waterCharge" :val="formData.waterCharge" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput labelName="电费(每度金额)"  keyName="electricityCharge" :val="formData.electricityCharge" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput labelName="网费/月"  keyName="InternetCharge" :val="formData.InternetCharge" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
              <el-col :span="24">
                <SelfInput type="4" labelName="职场备注"  keyName="branchMemo" :val="formData.branchMemo" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            <el-row>
              <el-col :sm="12">
                <el-form-item label="合同附件上传">
                  <UploadFile :upload-data="{name:'contractAttachment'}" @uploadSuccess="uploadSuccess"></UploadFile>
                </el-form-item>
              </el-col>
            </el-row>
        </el-row>

          <!--车辆-->
        <el-row v-else-if="this.type===9">
            <el-col :sm="8">
              <SelfInput labelName="资产名称" keyName="vehicleCompany" :val="formData.vehicleCompany" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput labelName="车辆牌照"   keyName="noPlate" :val="formData.noPlate" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput  labelName="投保人" keyName="insuranceApplicant" :val="formData.insuranceApplicant" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput  labelName="被保人" keyName="insured" :val="formData.insured" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput type="3" labelName="年检日期" keyName="annualInspectionDate" :val="formData.annualInspectionDate" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
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
            <el-col :sm="8">
              <SelfInput labelName="公里数" keyName="km" :val="formData.km" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput type="3" labelName="最新保养日期" keyName="lastMaintenance" :val="formData.lastMaintenance" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput type="3" labelName="预计下次保养期" keyName="nextMaintenance" :val="formData.nextMaintenance" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput labelName="钥匙数量" keyName="noOfKeys" :val="formData.noOfKeys" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput  labelName="钥匙编号" keyName="keySerials" :val="formData.keySerials" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput  labelName="使用人" keyName="user" :val="formData.user" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput labelName="现使用机构" :selectList="typeList"  keyName="currentlyOwnedOrg" :val="formData.currentlyOwnedOrg"  @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput type="1" labelName="管理人" keyName="administrator" :val="formData.administrator" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput type="1" labelName="使用人联系电话" keyName="userPhone" :val="formData.bill" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="24">
              <SelfInput type="4" labelName="备注" keyName="vehicleMemo" :val="formData.vehicleMemo"  @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-row>
              <el-col :sm="12">
                <el-form-item label="被保人附件">
                  <UploadFile :upload-data="{name:'insuredAttachment'}" @uploadSuccess="uploadSuccess"></UploadFile>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="12">
                <el-form-item label="行驶本附件">
                  <UploadFile :upload-data="{name:'vehicleLicenseAttachment'}" @uploadSuccess="uploadSuccess"></UploadFile>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="12">
                <el-form-item label="车辆保养附件">
                  <UploadFile :upload-data="{name:'maintenanceAttachment'}" @uploadSuccess="uploadSuccess"></UploadFile>
                </el-form-item>
              </el-col>
            </el-row>
        </el-row>


          <!--默认-->
        <el-row v-else-if="[0,1,3,4].indexOf(this.type) >= 0 ">
        <el-col :sm="8">
          <SelfInput  labelName="资产名称" keyName="name" :val="formData.name" :required="true"  @changeFormVal="changeFormVal"></SelfInput>
        </el-col>
          <el-col :sm="8">
            <SelfInput  labelName="资产编码" keyName="assetNo" :val="formData.assetNo" :required="true" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-col :sm="8">
            <SelfInput  labelName="规格型号" keyName="model" :val="formData.model" :required="true" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-col :sm="8">
            <SelfInput  labelName="SN号" keyName="serialNo" :val="formData.serialNo" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-col :sm="8">
            <SelfInput  type="3" labelName="购入时间" keyName="purchaseDate" :val="formData.purchaseDate" :required="true" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-col :sm="8">
            <SelfInput type="2" labelName="所属机构" :selectList="orgList"  keyName="blongOrg" :val="formData.blongOrg" :required="true" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-col :sm="8">
            <SelfInput labelName="发票号码" keyName="invoice" :val="formData.invoice" :required="true" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-col :sm="8">
            <SelfInput type="5" labelName="实付金额" keyName="amount" :val="formData.amount" :required="true" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-col :sm="8">
            <SelfInput type="2" labelName="使用机构" :selectList="orgList" keyName="useOrg" :val="formData.useOrg" :required="true" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-col :sm="8">
            <SelfInput labelName="使用人" keyName="usePerson" :val="formData.usePerson" :required="true" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-col :sm="8">
            <SelfInput  labelName="存放地点"  keyName="storedPosition" :val="formData.storedPosition" :required="true" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
          <el-col :span="24">
            <SelfInput type="4" labelName="备注"  keyName="memo" :val="formData.memo" @changeFormVal="changeFormVal"></SelfInput>
          </el-col>
        </el-row>

        <el-row style="text-align:left">
            <el-button @click="reset">重置</el-button>
            <el-button type="primary" @click="confirmBtn" v-loading.fullscreen.lock="fullscreenLoading">确 定</el-button>
        </el-row>
      </el-form>
    </div>
</template>

<script>
    import EditorInfo from '../components/common/editorInfo'
    import SelfInput from '../components/common/selfInput'
    import Treeselect from '@riophae/vue-treeselect'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    import UploadFile from '../components/common/uploadFile'
    export default {
      data(){
        return {
          validDate:[],
          formData: {
            "editDate": '',
            "validDate":"",
            "allocation": "调拨记录",
            "status": "资产状态",
            "usageId": "使用记录",
            "serialNo": "SN号",
            "model": "规格型号",
            "category": "资产类别",
            "name": "资产名称",
            "storedPosition": "存放地点",
            "assetNo": "资产编码",
            "amount": "实付金额",
            "purchaseDate": "",
            "memo": "资产备注",
            "source": "资产来源",
            "invoice": "发票号码",
            "invoiceCategory":"发票类型",
            "invoiceNo":"发票号码",

            "blongOrg": "",
            "useOrg": ""
          },
          categoryList: [],
          orgList: [],
          fullscreenLoading: false,
          value: null,
          // define options
          originSelect:[],
          assetSelect: [
            {
              id: 'a',
              label: 'a',
              children: [{
                id: 'aa',
                label: 'aa',
              }, {
                id: 'ab',
                label: 'ab',
              }],
            },
            {
              id: 'b',
              label: 'b',
            },
            {
              id: 'c',
              label: 'c',
              children: [
                {
                  id: 'c01',
                  label: 'cc'
                },
                {
                  id: 'c02',
                  label: 'ccc',
                  children: [
                    {
                      id: 'c021',
                      label: 'cc21'
                    },
                    {
                      id: 'c022',
                      label: 'ccd22'
                    }
                  ]
                }
              ]
            },
            {
              id: 'd',
              label: 'd',
              children: [
                {
                  id: 'd01',
                  label: 'dd'
                },
                {
                  id: 'd02',
                  label: 'ddd',
                  children: [
                    {
                      id: 'd021',
                      label: 'dd21'
                    },
                    {
                      id: 'd022',
                      label: 'ddd22'
                    }
                  ]
                }
              ]
            }

          ],
          assetOriginList:[],
          invoiceCategoryList:[],
          workCategoryList:[],
          payCategoryList:[],
          payWayList:[],
          typeList:[
            {
              id:1,
              data:'集团'
            },
            {
              id:2,
              data:'佳禾集团'
            }
          ],


          type:1   //0默认 1 家具类 2 发票 3 电子产品 4 其他类 5 门禁卡 6 商标  7 ICP 8 办公职场 9 车辆
        }
      },
      methods:{
        init(){

        },
        uploadSuccess(res){
          let key = res[1],
            val = res[0].message;
          this.formData[key] = val;
        },
        changeFormVal([key,val]){
          console.log(key,val);
          this.formData[key] = val;
          console.log(this.formData);
        },
        reset(){

        },
        confirmBtn(){

        },
        selectVal(node){
          console.log(node)
          let val = node.label;
          this.originSelect.forEach(item=>{
            let str = item.data;
            if(str.indexOf(val)>=0){
              let nameArr = str.split('\\');
              let label = nameArr[0];
              console.log(label);
              // 1 家具类 2 发票 3 电子产品 4 其他类 5 门禁卡 6 商标  7 ICP 8 办公职场 9 车辆
              if(label==='家具类') this.type = 1;
              else if(label==='发票') this.type=2;
              else if(label==='电子产品') this.type=3;
              else if(label==='其他类') this.type=4;
              else if(label==='门禁卡') this.type=5;
              else if(label==='商标注册') this.type=6;
              else if(label==='ICP') this.type=7;
              else if(label==='办公职场') this.type=8;
              else if(label==='车辆') this.type=9;
            }
          })
          console.log(this.type);
        },
        standardData(data){
          let arr = [];
          let exitKey = [];
          data.forEach((item,index)=>{
            var obj = {};
            let name = item.data;
            if(name.indexOf("\\")>=0){
              let nameArr = name.split('\\');
              let st = false;
              let key = ''
              arr.forEach((val,keys)=>{
                if(val.label === nameArr[0]){
                  st = true;
                  key = keys;
                }
              })
              if(st){
                let obj = {
                  id:item.id,
                  label:nameArr[1]
                }
                arr[key].children.push(obj);
              }else{
                obj.label = nameArr[0];
                obj.id = nameArr[0];
                // obj.id = 'default';
                obj.children = [{
                  id:item.id,
                  label:nameArr[1]
                }]
                arr.push(obj);
              }
            }else{
              obj = {
                id:item.id,
                label:item.data
              }
              arr.push(obj);
            }
          })
          console.log(arr);
          let reg = /[\u4e00-\u9fa5]/;
          this.value =reg.test(arr[0].id)?arr[0].children[0].id:arr[0].id;
          return arr;
        }
      },
      components:{
        EditorInfo,
        SelfInput,
        Treeselect,
        UploadFile
      },
      created(){
        // this.formData.editDate = this.$Store.formatDate();
        // console.log(this.formData.editDate);
        let loginData = {
          grant_type:'password',
          username:'od59Ov8r8pVOZpNc0ggk_Zceek5E',
          password:"AJq3mp1xdfxmOPYmYmsJ+qpiiQ//izukhM1Ol2jlPosjkYajNAE47k81ql+ULlcucQ=="
        }

        this.$axios.Home.getToken('POST',loginData).then(res=>{
          localStorage.setItem('token',res.access_token);
          this.$axios.Home.selectList('GET',{}).then(response=>{
            console.log(response);
            for(let i in response){
              if(response[i].name === '资产::资产类别'){
                this.originSelect = response[i].values
                this.assetSelect = this.standardData(response[i].values);
              }else if(response[i].name === '发票::发票类型'){
                this.invoiceCategoryList = response[i].values;
              }else if(response[i].name === '办公职场::职场类型'){
                this.workCategoryList = response[i].values;
              }else if(response[i].name === '资产::资产来源'){
                this.assetOriginList = response[i].values;
              }else if(response[i].name === '办公职场::支付类型'){
                this.payCategoryList = response[i].values;
              }else if(response[i].name === '办公职场::支付方式'){
                this.payWayList = response[i].values;
              };
            }

          })
        })



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
        this.$nextTick(()=>{

        })
      }
    }
</script>

<style>
  .vue-treeselect__control{
    width: 180px;
    height: 40px;
    line-height: 40px;
  }
  .category{
    height: 62px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

</style>
