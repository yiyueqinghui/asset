<template>
    <div id="brand">
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
        <el-table-column  label="公司名称" prop="company"  align="center">
        </el-table-column>
        <el-table-column  label="中文名称" prop="name_zh"  align="center">
        </el-table-column>
        <el-table-column  label="英文名称" prop="name_en"  align="center">
        </el-table-column>
        <el-table-column  label="商标分类" prop="category"  align="center">
        </el-table-column>
        <el-table-column  label="注册日期" prop="reg_time"  align="center">
        </el-table-column>
        <el-table-column  label="有效日期" prop="end_time"  align="center">
        </el-table-column>

        <el-table-column  label="（照片）商标"  align="center">
          <template slot-scope="scope">
            <img class="tabPic" :src="scope.row.src" />
          </template>
        </el-table-column>
        <el-table-column  label="创建人" prop="creater"  align="center">
        </el-table-column>
        <el-table-column  label="创建时间" prop="createDate"  align="center">
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
      <el-dialog
        :close-on-click-modal="false" :close-on-press-escape="false"
        :title="formTitle"
        :visible.sync="dialogFormVisible"
        width="960px">
        <EditorInfo :edit-date="editDate"></EditorInfo>
        <el-form :inline="true" :model="formData"  label-width="auto"  class="demo-form-inline date-range-input">
          <el-row class="dialog_subtitle">基本信息</el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput type="1" labelName="公司名称" keyName="company" :val="formData.company" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput type="1"  labelName="中文名称"  keyName="name_zh" :val="formData.name_zh" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput  labelName="英文名称" keyName="name_en" :val="formData.name_en" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput type="1" labelName="商标分类" keyName="category" :val="formData.category" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput type="3" labelName="注册日期" keyName="reg_time" :val="formData.reg_time" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput type="3" labelName="有效期" keyName="end_time" :val="formData.end_time" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>



            <!--<el-col :sm="12">
              <el-form-item label="有效期">
                <el-date-picker
                  v-model="validDate"
                  type="end_time"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyyMMdd">
                </el-date-picker>
              </el-form-item>
            </el-col>-->
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput :disabled="true"  type="4" labelName="备注" :selectList="typeList"  keyName="comment" :val="formData.comment" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>




          <el-row>
            <el-col :sm="12">
              <el-form-item label="附件上传">
<!--                <UploadFile :upload-data="fileData" @uploadSuccess="uploadSuccess"></UploadFile>-->
                  <input type="file" name="attachment" :val="formData.attachment">
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
          wareData: [
          ],
          multipleSelection: [],    //当前选中的行数据
          currentPage: 1,
          total: 20,
          dialogFormVisible:false,
          formTitle: '新增',

          formData: {
              company: '',
              name_zh: '',
              name_en: '',
              category: '',
              reg_time:'',
              end_time: '',
              comment: '',
              // attachment: ''
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
          fileData:{
            name:'brandFile'
          },
          validDate:[]   //有效期

        }
      },
      methods:{
        init(){
          this.fetchData();
        },
        uploadSuccess(res){
          let key = res[1],
            val = res[0].message;
          this.formData[key] = val;
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
          this.$axios.Asset.brand('GET',{}).then(res=>{
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
            this.$axios.Asset.brand('POST',data).then(res=>{
              // this.tipMessage('新增成功！');
              this.$message({
                message:'新增成功！',
                type:'success'
              })
              this.fetchData();
              this.dialogFormVisible = false;
            })
          }else{
            this.$axios.Asset.brand('PUT',data).then(res=>{
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
              this.$axios.Asset.brand('DELETE',item).then(res=>{
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
        // let arr = new Array(5).fill(this.wareData[0]);
        // this.wareData = arr;
        // this.$Store.NumberToChinese(101.31);
        // console.log(this.$Store.data.statusList)

      }
    }
</script>

<style lang="less">

</style>
