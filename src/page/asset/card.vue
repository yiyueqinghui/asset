<template>
    <div id="card">
      <!--查寻-->
      <el-form :inline="true"  :model="searchData" >
         <el-form-item label="">
           <el-input v-model="searchData.department" filterable placeholder="请输入搜索内容">
           </el-input>
         </el-form-item>
         <el-form-item>
           <el-button type="primary" icon="el-icon-search" @click="fetchData">查询</el-button>
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
          userList: [],
          companyList:[
          ],
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
          },
          dialogLoading: false,
          editDate: '2019-5-14',
          identifyFile:{
            name:'file'
          }

        }
      },
      methods:{
        init(){
          this.fetchData();
          this.getDepartmentList();
          this.getUserList();
        },
        funTreeSel1(node){
          console.log(JSON.stringify(node.id))
          let val = node.id;
          this.formData.dep_owner = val;
        },
        getUserList() {
          this.$axios.Asset.user('GET', {}).then(res => {
            let _departList = res.data;
            this.userList = trasfer2ViewListofUser(_departList);
          })

          function trasfer2ViewListofUser(list){
            let retList = [];
            list.forEach((item)=>{
              let node = {};
              node.value = item.id;
              node.label = item.name;
              retList.push(node);
            })
            return retList;
          }
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
          this.formData['id_card_file'] = uuid;
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
          this.$axios.Asset.card('GET',{}).then(res=>{
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
        },
        handleCurrentPage(val) {
          console.log(`当前页: ${val}`);
          this.currentPage = val;
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
