<template>
    <div id="icp">
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
          <!--日期范围选择-->
          <el-date-picker v-if="this.searchKey === 'apply_time_1'"
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
          <!--下拉选择 -->
          <el-select v-if="this.selectArr.indexOf(this.searchKey)>=0" :clearable="true" v-model="searchVal" placeholder="请选择" style="width:200px;left: -12px;">
            <el-option
              v-for="(item,index) in searchValList"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <!--机构以及资产类别选择-->
          <treeselect v-if="this.searchKey === 'company' "
                      v-model="searchVal"
                      :multiple="false"
                      placeholder="请选择..."
                      :show-count="false"
                      :options="companyList" />

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
        <el-table-column  label="公司名称" prop="icp_company_name"  align="center">
        </el-table-column>
        <el-table-column width="140"  label="初次申请时间" prop="apply_time_1"  align="center">
        </el-table-column>
        <el-table-column width="140" label="经营许可证编号"  prop="license_number"  align="center">
        </el-table-column>
        <el-table-column  label="网站名称" prop="site_name"  align="center">
        </el-table-column>
        <el-table-column  label="网址" prop="site_url"  align="center">
        </el-table-column>
        <el-table-column  label="有效期" prop="end_time"  align="center">
        </el-table-column>
        <el-table-column width="140"  label="年检时间记录" prop="annual_inspection_time"  align="center">
        </el-table-column>
        <el-table-column  label="创建人" prop="create_by_zh"  align="center">
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
        :title="formTitle=='1'?'新增':'修改'"
        :visible.sync="dialogFormVisible"
        width="960px">
        <el-scrollbar class="dialogZone">
          <EditorInfo :edit-date="editDate"></EditorInfo>
          <el-form :inline="true" :model="formData"  label-width="auto"  class="demo-form-inline date-range-input">
            <el-row class="dialog_subtitle">基本信息</el-row>
            <el-row>
              <el-col :sm="12">
                <el-form-item label="公司名称">
                  <treeselect
                    v-model="formData.company"
                    @select="funTreeSel1"
                    :multiple="false"
                    placeholder="请选择"
                    :show-count="false"
                    :options="companyList" />
                </el-form-item>
              </el-col>
              <el-col :sm="12">
                <SelfInput type="3"  labelName="初次申请时间"  keyName="apply_time_1" :val="formData.apply_time_1" :required="true" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="12">
                <SelfInput  labelName="经营许可证编号" keyName="license_number" :val="formData.license_number" :required="true" @changeFormVal="changeFormVal" ></SelfInput>
              </el-col>
              <el-col :sm="12">
                <SelfInput labelName="网站名称" keyName="site_name" :val="formData.site_name" :required="true" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="12">
                <SelfInput type="3" labelName="年检时间记录" keyName="annual_inspection_time" :val="formData.annual_inspection_time" :required="true" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="12">
                <SelfInput labelName="网址" keyName="site_url" :val="formData.site_url" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="12">
                <SelfInput type="3" labelName="有效期" keyName="end_time" :val="formData.end_time" :required="true" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="12">
                <SelfInput type="4" labelName="备注"   keyName="comment" :val="formData.comment" :required="true" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="15">
                <el-form-item label="附件上传">
                  <UploadFile :upload-data="icpFile" @uploadSuccess="uploadSuccess"></UploadFile>
                  <a  v-if="this.formTitle == 2" :href="formData.icp_attachment_url" class="lookFile">查看附件</a>
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
    import Treeselect from '@riophae/vue-treeselect'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'

    export default {
      data: function () {
        return {
          searchKey:'apply_time_1',
          searchKeyList: [
            {
              value:'company',
              label:'公司名称'
            },
            {
              value:'apply_time_1',
              label:'初次申请时间'
            }
          ],
          searchVal:'',
          searchValList:[],
          selectArr:[''],
          inputArr:[''],
          searchData: {
            department: ''
          },
          wareData: [],
          multipleSelection: [],    //当前选中的行数据
          currentPage: 1,
          currentPageSize:10,
          total: 20,
          dialogFormVisible:false,
          formTitle: '1',
          formData: {
          },
          dialogLoading: false,
          editDate: '2019-5-14',
          typeList:[
          ],
          companyList:[
          ],
          icpFile:{
            name:'icpFile'
          },
          validDate:[]   //有效期
        }
      },
      created(){
        this.$Store.getAssetTypeList().then((data)=>{
          this.assetTypeList = data;
        })

        this.$Store.getDepartmentList().then((data)=>{
          this.companyList = data;
        })
      },
      methods:{
        init(){
           this.fetchData();
        },
        funTreeSel1(node){
          console.log(JSON.stringify(node.id))
          let val = node.id;
          this.formData.company = val;
        },
        uploadSuccess(res){
          let uuid = res[0].uuid;
          this.formData['attachment'] = uuid;
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

          this.$axios.Asset.icp('GET',data).then(res=>{
             console.log(res);
            this.wareData = res.data;
            this.total = res.meta.total
          })
        },
        // 新增,修改
        clickBtn(type){
          this.formTitle = type;
          this.editDate = this.$Store.formatDate();
          this.formData = this.$Store.resetForm(this.formData);
          if(typeof this.formData.company != undefined){
            this.formData.company = null;
          }

          if(type === 2){
            if(this.multipleSelection.length === 1){
              this.formData = Object.assign({},this.multipleSelection[0]);
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
              this.$axios.Asset.icp('DELETE',item).then(res=>{
                deleteNum+=1;
                if(data.length === deleteNum){
                  this.tipMessage('删除成功！');
                  this.fetchData();
                }
              })
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
        confirmBtn(){
          let id = this.formData.id;
          let data = this.formData;
          if(this.formTitle == '1'){
            this.$axios.Asset.icp('POST',data).then(res=>{
              // this.tipMessage('新增成功！');
              this.$message({
                message:'新增成功！',
                type:'success'
              })
              this.fetchData();
              this.dialogFormVisible = false;
            })
          }else{
            this.$axios.Asset.icp('PUT',data).then(res=>{
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
      watch:{
        validDate:{
          handler(val,oldval){
            console.log(val);
            this.formData.validDate = val.join('-');
          },
          deep:true
        }
      },
      components:{
        EditorInfo,
        SelfInput,
        UploadFile,
        Treeselect
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
