<template>
    <div id="storage">
      <EditorInfo  ref="editorInfo" :edit-date="formData.editDate"></EditorInfo>
      <el-form v-if="this.formVisible" :inline="true" ref="storageInfo" :model="formData"  label-width="auto"   class="demo-form-inline self-input" id="storageId" >
        <el-row class="dialog_subtitle">基本信息</el-row>
        <!--<el-row>-->
          <!--<el-col :sm="8" class="category">-->
            <!--<el-form-item label="资产类型">-->
              <!--<treeselect-->
                <!--v-model="value"-->
                <!--@select="selectVal"-->
                <!--:multiple="false"-->
                <!--placeholder="请选择"-->
                <!--:show-count="true"-->
                <!--:options="assetSelect" />-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->
         <!--发票-->
        <el-row v-show="this.type===2">
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
          <el-col :sm="8">
            <el-form-item label="发票类型" :rules="{required:true,message:'请输入发票号码'}" prop="invoiceCategory">
              <el-select v-model="formData.invoiceCategory" filterable placeholder="请选择">
                <el-option
                  v-for="item in invoiceCategoryList"
                  :key="item.id"
                  :label="item.data"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item  label="发票号码" :rules="{required:true,message:'请输入发票号码'}" prop="invoiceNo">
              <el-input v-model="formData.invoiceNo" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item  label="开票日期" :rules="{required:true}" prop="invoiceDate">
              <el-date-picker
                style="width: 180px;"
                v-model="formData.invoiceDate"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item label="发票金额" :rules="{required:true}" prop="invoiceAmount">
              <el-input v-model="formData.invoiceAmount" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="24">
            <el-form-item  label="发票备注"  :rules="{required:true}" >
              <el-input
                rows="4"
                type="textarea"
                placeholder="请输入内容"
                v-model="formData.invoiceMemo">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="24">
            <el-form-item label="发票附件">
              <UploadFile :upload-data="{name:'invoicePic'}" @uploadSuccess="uploadSuccess"></UploadFile>
            </el-form-item>
          </el-col>
        </el-row>
        <!--门禁卡-->
        <el-row v-show="this.type===5">
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
          <el-col :sm="8">
            <el-form-item  label="姓名" :rules="{required:true}" prop="Name">
              <el-input v-model="formData.Name" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item label="所属机构" :rules="{required:true}" prop="org">
              <el-select v-model="formData.org" filterable placeholder="请选择">
                <el-option
                  v-for="item in typeList"
                  :key="item.id"
                  :label="item.data"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item  label="卡号" :rules="{required:true}" prop="cardNo">
              <el-input v-model="formData.cardNo" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item  label="手机号码" :rules="{required:true}" prop="phoneNo">
              <el-input v-model="formData.phoneNo" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item  label="身份证号" :rules="{required:true}" prop="idCardNo">
              <el-input v-model="formData.idCardNo" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="24">
            <el-form-item label="身份证复印件">
              <UploadFile :upload-data="{name:'idPhotoCopy'}" @uploadSuccess="uploadSuccess"></UploadFile>
            </el-form-item>
          </el-col>
        </el-row>
        <!--商标注册-->
        <el-row v-show="this.type===6">
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
            <el-col :sm="8">
              <el-form-item label="公司名称" :rules="{required:true}" prop="company">
                <el-select v-model="formData.company" filterable placeholder="请选择">
                  <el-option
                    v-for="item in typeList"
                    :key="item.id"
                    :label="item.data"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item  label="中文名称" :rules="{required:true}" prop="chTrademarkName">
                <el-input v-model="formData.chTrademarkName" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item  label="英文名称" :rules="{required:true}" prop="enTrademarkName">
                <el-input v-model="formData.enTrademarkName" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item  label="商标分类" :rules="{required:true}" prop="trademarkCategory">
                <el-input v-model="formData.trademarkCategory" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item  label="注册日期" :rules="{required:true}" prop="regDate">
                <el-date-picker
                  style="width: 180px;"
                  v-model="formData.regDate"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
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
              <el-form-item  label="商标备注"  :rules="{required:true}" >
                <el-input
                  rows="4"
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="formData.trademarkMemo">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="12">
              <el-form-item label="商标附件">
                <UploadFile :upload-data="{name:'trademarkAttachment'}" @uploadSuccess="uploadSuccess"></UploadFile>
              </el-form-item>
            </el-col>
        </el-row>
        <!--icp-->
        <el-row v-show="this.type===7">
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
            <el-col :sm="8">
              <el-form-item label="公司名称" :rules="{required:true}" prop="company">
                <el-select v-model="formData.company" filterable placeholder="请选择">
                  <el-option
                    v-for="item in typeList"
                    :key="item.id"
                    :label="item.data"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item  label="初次申请时间" :rules="{required:true}" prop="initialRegDate">
                <el-date-picker
                  style="width: 180px;"
                  v-model="formData.initialRegDate"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item  label="经营许可证编号" :rules="{required:true}" prop="managementLicenseNo">
                <el-input v-model="formData.managementLicenseNo" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item  label="网站名称" :rules="{required:true}" prop="websiteName">
                <el-input v-model="formData.websiteName" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item  label="网址" :rules="{required:true}" prop="url">
                <el-input v-model="formData.url" ></el-input>
              </el-form-item>
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
              <el-form-item  label="年检时间记录" :rules="{required:true}" prop="annualInspection">
                <el-date-picker
                  style="width: 180px;"
                  v-model="formData.annualInspection"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :sm="24">
              <el-form-item  label="ICP备注"  :rules="{required:true}" prop="icpMemo">
                <el-input
                  rows="4"
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="formData.icpMemo">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="24">
              <el-form-item label="ICP附件上传">
                <UploadFile :upload-data="{name:'icpAttachment'}" @uploadSuccess="uploadSuccess"></UploadFile>
              </el-form-item>
            </el-col>
        </el-row>
        <!--办公职场-->
        <el-row v-show="this.type===8">
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
            <el-col :sm="8">
              <el-form-item label="公司名称" :rules="{required:true}" prop="company">
                <el-select v-model="formData.company" filterable placeholder="请选择">
                  <el-option
                    v-for="item in typeList"
                    :key="item.id"
                    :label="item.data"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item label="职场类型" :rules="{required:true}" prop="branchCategory">
                <el-select v-model="formData.branchCategory" filterable placeholder="请选择">
                  <el-option
                    v-for="item in workCategoryList"
                    :key="item.id"
                    :label="item.data"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item  label="职场地址" :rules="{required:true}" prop="brandhAddress">
                <el-input v-model="formData.brandhAddress" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item  label="职场租赁面积" :rules="{required:true}" prop="branchArea">
                <el-input v-model="formData.branchArea" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item  label="职场每㎡金额" :rules="{required:true}" prop="amountPerSquareMeter">
                <el-input v-model="formData.amountPerSquareMeter" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item  label="职场工位数" :rules="{required:true}" prop="seats">
                <el-input v-model="formData.seats" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item  label="职场会议室数量" :rules="{required:true}" prop="conferenceRoomNo">
                <el-input v-model="formData.conferenceRoomNo" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item  label="可注册公司数量" :rules="{required:true}" prop="availableRegCompanyNo">
                <el-input v-model="formData.availableRegCompanyNo" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item  label="已注册公司名称" :rules="{required:true}" prop="registeredCompanyNo">
                <el-input v-model="formData.registeredCompanyNo" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item  label="合同起始日期" :rules="{required:true}" prop="contractStartDate">
                <el-date-picker
                  style="width: 180px;"
                  v-model="formData.contractStartDate"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item  label="合同终止日期" :rules="{required:true}" prop="contractEndDate">
                <el-input v-model="formData.contractEndDate" :disabled="true"  ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item  label="合同总金额" :rules="{required:true}" prop="contractAmount">
                <el-input v-model="formData.contractAmount" :disabled="true"  ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item label="支付方式" :rules="{required:true}" prop="paymentMethod">
                <el-select v-model="formData.paymentMethod" filterable placeholder="请选择">
                  <el-option
                    v-for="item in payCategoryList"
                    :key="item.id"
                    :label="item.data"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item label="支付类型" :rules="{required:true}" prop="payWay">
                <el-select v-model="formData.payWay" filterable placeholder="请选择">
                  <el-option
                    v-for="item in payWayList"
                    :key="item.id"
                    :label="item.data"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item  label="租金金额" :rules="{required:true}" prop="rentAmount">
                <el-input v-model="formData.rentAmount" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item  label="保证金金额" :rules="{required:true}" prop="depositAmount">
                <el-input v-model="formData.depositAmount" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item  label="物业费金额/月" :rules="{required:true}" prop="propertyFree">
                <el-input v-model="formData.propertyFree" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item  label="水费/立方米" :rules="{required:true}" prop="waterCharge">
                <el-input v-model="formData.waterCharge" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item  label="电费(每度金额)" :rules="{required:true}" prop="electricityCharge">
                <el-input v-model="formData.electricityCharge" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item  label="网费/月" :rules="{required:true}" prop="InternetCharge">
                <el-input v-model="formData.InternetCharge" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item  label="职场备注"  :rules="{required:true}" prop="branchMemo">
                <el-input
                  rows="4"
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="formData.branchMemo">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="12">
              <el-form-item label="合同附件上传">
                <UploadFile :upload-data="{name:'contractAttachment'}" @uploadSuccess="uploadSuccess"></UploadFile>
              </el-form-item>
            </el-col>
        </el-row>
        <!--车辆-->
        <el-row v-show="this.type===9">
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
            <el-col :sm="8">
              <el-form-item  label="资产名称" :rules="{required:true}" prop="vehicleCompany">
                <el-input v-model="formData.vehicleCompany" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item  label="车辆牌照" :rules="{required:true}" prop="noPlate">
                <el-input v-model="formData.noPlate" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item  label="投保人" :rules="{required:true}" prop="insuranceApplicant">
                <el-input v-model="formData.insuranceApplicant" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item  label="被保人" :rules="{required:true}" prop="insured">
                <el-input v-model="formData.insured" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item  label="年检日期" :rules="{required:true}" prop="annualInspectionDate">
                <el-date-picker
                  style="width: 180px;"
                  v-model="formData.annualInspectionDate"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
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
              <el-form-item  label="公里数" :rules="{required:true}" prop="km">
                <el-input v-model="formData.km" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item  label="最新保养日期" :rules="{required:true}" prop="lastMaintenance">
                <el-date-picker
                  style="width: 180px;"
                  v-model="formData.lastMaintenance"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item label="预计下次保养期">
                <el-input v-show="visible" v-model="formData.nextMaintenance" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item  label="钥匙数量" :rules="{required:true}" prop="noOfKeys">
                <el-input v-model="formData.noOfKeys" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item  label="钥匙编号" :rules="{required:true}" prop="keySerials">
                <el-input v-model="formData.keySerials" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item label="使用人" :rules="{required:true}" prop="user">
                <el-select v-model="formData.user" filterable placeholder="请选择">
                  <el-option
                    v-for="item in typeList"
                    :key="item.id"
                    :label="item.data"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item label="现使用机构" :rules="{required:true}" prop="currentlyOwnedOrg">
                <el-select v-model="formData.currentlyOwnedOrg" filterable placeholder="请选择">
                  <el-option
                    v-for="item in typeList"
                    :key="item.id"
                    :label="item.data"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item  label="使用人联系电话" :rules="{required:true}" prop="userPhone">
                <el-input v-model="formData.userPhone" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item label="管理人" :rules="{required:true}" prop="administrator">
                <el-select v-model="formData.administrator" filterable placeholder="请选择">
                  <el-option
                    v-for="item in typeList"
                    :key="item.id"
                    :label="item.data"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="24">
              <el-form-item label="被保人附件">
                <UploadFile :upload-data="{name:'insuredAttachment'}" @uploadSuccess="uploadSuccess"></UploadFile>
              </el-form-item>
            </el-col>
            <el-col :sm="24">
              <el-form-item label="行驶本附件">
                <UploadFile :upload-data="{name:'vehicleLicenseAttachment'}" @uploadSuccess="uploadSuccess"></UploadFile>
              </el-form-item>
            </el-col>
            <el-col :sm="24">
              <el-form-item label="车辆保养附件">
                <UploadFile :upload-data="{name:'maintenanceAttachment'}" @uploadSuccess="uploadSuccess"></UploadFile>
              </el-form-item>
            </el-col>
            <el-col :sm="24">
              <el-form-item  label="备注"  :rules="{required:true}" prop="vehicleMemo">
                <el-input
                  rows="4"
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="formData.vehicleMemo">
                </el-input>
              </el-form-item>
            </el-col>
        </el-row>
        <!--默认-->
        <el-row v-show="[0,1,3,4].indexOf(this.type) >= 0 ">
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
          <el-col :sm="8">
            <el-form-item  label="资产名称" :rules="{required:true}" prop="name">
              <el-input v-model="formData.name" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item  label="资产编码" :rules="{required:true}" prop="assetNo">
              <el-input v-model="formData.assetNo" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item  label="规格型号" :rules="{required:true}" prop="model">
              <el-input v-model="formData.model" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8" v-if="[3,4].indexOf(this.type)>=0">
            <el-form-item  label="SN号" :rules="{required:true}" prop="serialNo">
              <el-input v-model="formData.serialNo" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item label="资产来源" :rules="{required:true}" prop="source">
              <el-select v-model="formData.source" filterable placeholder="请选择">
                <el-option
                  v-for="item in sourceList"
                  :key="item.id"
                  :label="item.data"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item  label="购入/租用时间" :rules="{required:true}" prop="purchaseDate">
              <el-date-picker
                style="width: 180px;"
                v-model="formData.purchaseDate"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item  label="数量" :rules="{required:true}" prop="number">
              <el-input v-model="formData.number" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8" v-show="this.type === 3">
            <el-form-item  label="品牌" :rules="{required:true}" prop="brand">
              <el-input v-model="formData.brand" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8" v-show="this.type === 3">
            <el-form-item  label="配置" :rules="{required:true}" prop="config">
              <el-input v-model="formData.config" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item  label="发票号码" :rules="{required:true}" prop="invoice">
              <el-input v-model="formData.invoice" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item  label="实付金额" :rules="{required:true}" prop="amount">
              <el-input v-model="formData.amount" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item label="所属部门" :rules="{required:true}" prop="blongOrg">
              <el-select v-model="formData.blongOrg" filterable placeholder="请选择">
                <el-option
                  v-for="item in orgList"
                  :key="item.id"
                  :label="item.data"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item label="使用部门" :rules="{required:true}" prop="useOrg">
              <el-select v-model="formData.useOrg" filterable placeholder="请选择">
                <el-option
                  v-for="item in orgList"
                  :key="item.id"
                  :label="item.data"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item label="使用人" :rules="{required:true}" prop="usePerson">
              <el-select v-model="formData.usePerson" filterable placeholder="请选择">
                <el-option
                  v-for="item in employeeList"
                  :key="item.id"
                  :label="item.data"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item  label="存放地点" :rules="{required:true}" prop="storedPosition">
              <el-input v-model="formData.storedPosition" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item  label="备注"  :rules="{required:true}" prop="memo">
              <el-input
                rows="4"
                type="textarea"
                placeholder="请输入内容"
                v-model="formData.memo">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="text-align:center">
           <el-button type="primary" @click="reset">重置</el-button>
           <el-button type="primary" @click="confirmBtn" v-loading.fullscreen.lock="fullscreenLoading">确 定</el-button>
        </el-row>
      </el-form>
      <el-dialog
        v-if="dialogFormVisible"
        :close-on-click-modal="false" :close-on-press-escape="false"
        title="确认信息"
        :visible.sync="dialogFormVisible"
        width="960px"
        top="20px">
        <el-scrollbar class="dialogZone">
           <el-row class="insurePage">
             <el-col :sm="12" v-for="(value,name,index) in formData" :key="index" v-if="value">
                {{ dictionary[name] }}:{{value}}
             </el-col>
           </el-row>

        </el-scrollbar>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmDialog">确 定</el-button>
        </div>
      </el-dialog>


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
            serialNo:'',
            InternetCharge: "1234",
            Name: "name",
            administrator: "",
            amount: "",
            amountPerSquareMeter: "",
            annualInspection: "",
            annualInspectionDate: "",
            assetNo: "",
            availableRegCompanyNo: "",
            blongOrg: "",
            branchArea: "",
            branchCategory: "",
            branchMemo: "",
            brand: "",
            brandhAddress: "",
            cardNo: "",
            category:"",
            chTrademarkName: "",
            company: "",
            conferenceRoomNo: "",
            config: "",
            contractAmount: "",
            contractEndDate: "",
            contractStartDate: "",
            currentlyOwnedOrg: "",
            depositAmount: "",
            editDate: "",
            electricityCharge: "",
            enTrademarkName: "",
            icpMemo: "",
            idCardNo: "",
            initialRegDate: "",
            insuranceApplicant: "",
            insured: "",
            invoice: "",
            invoiceAmount: "",
            invoiceCategory: "",
            invoiceDate: "",
            invoiceNo: "",
            keySerials: "",
            km: "",
            lastMaintenance: "",
            managementLicenseNo: "",
            memo: "",
            model: "",
            name: "",
            noOfKeys: "",
            noPlate: "",
            number: "",
            org: "",
            payWay: "",
            paymentMethod: "",
            phoneNo: "",
            propertyFree: "",
            purchaseDate: "",
            regDate: "",
            registeredCompanyNo: "",
            rentAmount: "",
            seats: "",
            source: "",
            storedPosition: "",
            trademarkCategory: "",
            trademarkMemo:"",
            url: "",
            useOrg: "",
            usePerson: "",
            user: "",
            userPhone: "",
            vehicleCompany: "",
            vehicleMemo: "",
            waterCharge: "",
            websiteName: ""
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
          sourceList:[],
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
          employeeList:[
            {
              id:1,
              data:'张三'
            },
            {
              id:2,
              data:'李四'
            }
          ],
          type:1,   //0默认 1 家具类 2 发票 3 电子产品 4 其他类 5 门禁卡 6 商标  7 ICP 8 办公职场 9 车辆
          visible:true,
          formVisible:true,
          dialogFormVisible:true,
          dictionary:{}

        }
      },
      methods:{
        init(){
          this.dictionary = this.$Store.data.dictionary;
          console.log(this.dictionary);

        },
        reset(){
          this.$refs['storageInfo'].resetFields();
          console.log(this.formData);
        },
        uploadSuccess(res){
          let key = res[1],
            val = res[0].message;
          this.formData[key] = val;
        },
        changeFormVal([key,val]){
          this.formData[key] = val;
          console.log(this.formData);
          if(key === 'lastMaintenance'){
            let date = new Date(val).getTime(),
                dateStamp = date + (180*24*3600*1000);
            let afterDate = new Date(dateStamp);
            let formatDate = afterDate.getFullYear()+'-'+(afterDate.getMonth()+1)+'-'+afterDate.getDate();
            this.formData['nextMaintenance'] = formatDate;
            this.visible = false;
            this.visible = true;
          }

        },
        confirmBtn(){
          this.dialogFormVisible = true;
        },
        confirmDialog(){
          let data = Object.assign({},this.formData);
          this.$axios.Asset.storage('POST',data).then(res=>{
            this.$message({
              message:'新增成功！',
              type:'success'
            })
            this.dialogFormVisible = false;
          })
        },
        selectVal(node){
          // console.log(node)
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
          this.reset();
          this.formData.editDate = this.$Store.formatDate();
          this.$refs.editorInfo.updateDate(this.formData.editDate);
          console.log(this.formData);
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
          // console.log(arr);
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
      filters:{
        nameFilter(key){

        }

      },
      created(){
        this.formData.editDate = this.$Store.formatDate();
        console.log(this.formData.editDate);
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
              }else if(response[i].name === '资产::资产来源'){
                this.sourceList = response[i].values;
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
        },
        value:{
          handler(val,oldval){
            this.formData.category = val;
          }
        },
        formData:{
          handler(val,oldval){
            console.log(val)
          },
          deep:true
        }
      },
      mounted(){
        this.$nextTick(()=>{
          this.init();

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
    height: 64px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  #storageId .el-col-sm-8{
    height: 64px;
  }
  .insurePage .el-col-sm-12{
    font-size: 15px;
    padding:7px 0;
  }

</style>
