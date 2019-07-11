<template>
    <div id="card">
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
            <treeselect v-if="this.searchKey === 'dep_id' "
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
         </el-form-item>
      </el-form>
      <!--表格-->
      <el-table :data="wareData"  @selection-change="handleSelectionChange" ref="multipleTable"  border stripe fit style="overflow-x: auto">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" label="序号" width="60" align="center">
        </el-table-column>
        <el-table-column  label="用户" prop="user_id_zh"  align="center">
        </el-table-column>
        <el-table-column  label="所属机构" prop="dep_id"  align="center">
        </el-table-column>
        <el-table-column  label="门禁卡号" prop="card_number"  align="center">
        </el-table-column>
        <el-table-column  label="手机号码" prop="mobile"  align="center">
        </el-table-column>
        <el-table-column  label="身份证号" prop="id_card"  align="center">
        </el-table-column>
        <el-table-column  label="（照片）身份证"  prop="id_card_file_attachment_url" align="center">
          <template slot-scope="scope">
            <img class="tabPic" :src="scope.row.id_card_file_attachment_url" />
          </template>
        </el-table-column>
        <el-table-column  label="创建人" prop="create_by_zh"  align="center">
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
        width="960px">
        <EditorInfo :edit-date="editDate"></EditorInfo>
        <el-form :inline="true" :model="formData"  label-width="auto"  class="demo-form-inline self-input">
          <el-row class="dialog_subtitle">基本信息</el-row>
          <el-row>
            <el-col :sm="8">
              <SelfInput type="2" labelName="用户" :selectList="userList" keyName="user_id" :val="formData.user_id" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput  labelName="卡号" keyName="card_number" :val="formData.card_number" :required="true" @changeFormVal="changeFormVal" ></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput type="1" :disabled="false" labelName="手机号码" keyName="mobile" :val="formData.mobile" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="8">
              <SelfInput type="1" :disabled="false" labelName="身份证号" keyName="id_card" :val="formData.id_card" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <el-form-item label="所属机构">
                <treeselect
                  v-model="formData.dep_id"
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
              <el-form-item label="身份证复印件">
                <UploadFile :upload-data="identifyFile" @uploadSuccess="uploadSuccess"></UploadFile>
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
    import UploadFile from '../../components/common/uploadFile'
    import Treeselect from '@riophae/vue-treeselect'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    export default {
      data: function () {
        return {
          searchKey:'card_number',
          searchKeyList: [
            {
              value:'card_number',
              label:'门禁卡号'
            },
            {
              value:'user_id',
              label:'用户'
            },
            {
              value:'dep_id',
              label:'所属机构'
            }
          ],
          searchVal:'',
          searchValList:[],
          selectArr:['user_id'],
          inputArr:['card_number'],
          userList: [],
          companyList:[
          ],
          searchData: {
            department: ''
          },
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
          identifyFile:{
            name:'file'
          }

        }
      },
      created(){
        this.$Store.getUserList().then((data)=>{
          this.userList = data;
        })
        this.$Store.getDepartmentList().then((data)=>{
          this.companyList = data;
        })
      },
      methods:{
        init(){
          this.fetchData();
        },
        uploadSuccess(res){
          let uuid = res[0].uuid;
          this.formData['id_card_file'] = uuid;
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

          this.$axios.Asset.card('GET',data).then(res=>{
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
          if(this.formTitle == '新增'){
            this.$axios.Asset.card('POST',data).then(res=>{
              // this.tipMessage('新增成功！');
              this.$message({
                message:'新增成功！',
                type:'success'
              })
              this.fetchData();
              this.dialogFormVisible = false;
            })
          }else{
            this.$axios.Asset.card('PUT',data).then(res=>{
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
              this.$axios.Asset.card('DELETE',item).then(res=>{
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
