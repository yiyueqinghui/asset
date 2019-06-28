<template>
    <div id="icp">
      <!--查寻-->
      <el-form :inline="true"  :model="searchData" >
         <el-form-item label="">
           <el-input v-model="searchData.department" filterable placeholder="请填写搜索内容">
           </el-input>
         </el-form-item>
         <el-form-item>
           <el-button type="primary" icon="el-icon-search" @click="fetchData">查询</el-button>
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
          formTitle: '1',
          formData: {
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
          companyList:[
          ],
          icpFile:{
            name:'icpFile'
          },
          validDate:[]   //有效期
        }
      },
      methods:{
        init(){
           this.fetchData();
            this.getDepartmentList();
        },
        funTreeSel1(node){
          console.log(JSON.stringify(node.id))
          let val = node.id;
          this.formData.company = val;
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
        getDepartmentList(){
          this.$axios.Asset.department('GET',{}).then(res=>{
            // console.log(" result ==" + res.data.tree);
            let _departList = res.data.tree;
            let result = this.transData2Tree(_departList);
            // this.departList = result;
            this.companyList = result;
          })
        },
        uploadSuccess(res){
          let uuid = res[0].uuid;
          this.formData['attachment'] = uuid;
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
          this.$axios.Asset.icp('GET',{}).then(res=>{
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
        },
        handleCurrentPage(val) {
          console.log(`当前页: ${val}`);
          this.currentPage = val;
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


      }
    }
</script>

<style lang="less">

</style>
