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
      </el-form>
      <!--表格-->
      <el-table :data="wareData"  @selection-change="handleSelectionChange" ref="multipleTable"  border stripe fit style="overflow-x: auto">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" label="序号" width="60" align="center">
        </el-table-column>
        <el-table-column  label="姓名" prop="name"  align="center">
        </el-table-column>
        <el-table-column  label="所属机构" prop="type"  align="center">
        </el-table-column>
        <el-table-column  label="门禁卡号" prop="code"  align="center">
        </el-table-column>
        <el-table-column  label="手机号码" prop="size"  align="center">
        </el-table-column>
        <el-table-column  label="身份证号" prop="SN"  align="center">
        </el-table-column>
        <el-table-column  label="（照片）身份证"  align="center">
          <template slot-scope="scope">
            <img class="tabPic" :src="scope.row.src" />
          </template>
        </el-table-column>
        <el-table-column  label="创建人" prop="creater"  align="center">
        </el-table-column>
        <el-table-column  label="创建时间" prop="createDate"  align="center">
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
        <el-form :model="formData"  label-width="auto"  class="demo-form-inline self-input">
          <el-row class="dialog_subtitle">基本信息</el-row>
          <el-row>
            <el-col :sm="8">
              <SelfInput type="2" labelName="姓名" keyName="name" :val="formData.name" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput type="2"  labelName="所属机构" :selectList="typeList"  keyName="type" :val="formData.type" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput  labelName="卡号" keyName="code" :val="formData.code" :required="true" @changeFormVal="changeFormVal" ></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="8">
              <SelfInput type="1" :disabled="true" labelName="手机号码" keyName="size" :val="formData.size" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput type="1" :disabled="true" labelName="身份证号" keyName="SN" :val="formData.SN" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>

          <el-row>
            <el-col :sm="12">
              <el-form-item label="身份证复印件">
                <el-upload
                  label="file"
                  class="upload-file"
                  drag
                  :action="uploadUrl"
                  :data="doorData">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将发票文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :sm="12" style="text-align: right">
               <img :src="uploadSrc" style="width: auto;height:180px;"/>
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
            {
              status: '1',
              src: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1557731166&di=a35f2105642f239a24a5e6483b0f2a67&src=http://pic2.52pk.com/files/allimg/090626/1553504U2-2.jpg',
              name: '11010001',
              type: '办工卓',
              code: '办公设备',
              size: '双人',
              SN: '002110C0D0034',
              purchaseDate: '2018-3-1',
              blong: '测试机构',
              bill: '102110987',
              money: 200,
              useCompany: '网开',
              useDepart: '研发部',
              usePerson: 'xxx',
              supplier: '供应商1',
              contacts: '张峰',
              tel: '114',
              site: '',
              creater: '李小二',
              createDate: '2018-9-8',
              remarks: ''
            }
          ],
          multipleSelection: [],    //当前选中的行数据
          currentPage: 1,
          total: 20,
          dialogFormVisible:false,
          formTitle: '新增',
          formData: {
            name: '11010001',
            type: '办工卓',
            code: '办公设备',
            size: '双人',
            SN: '002110C0D0034',
            purchaseDate: '2019-05-10',
            blong: '测试机构',
            bill: '102110987',
            money: 200,
            useCompany: '网开',
            useDepart: '研发部',
            usePerson: 'xxx',
            supplier: '供应商1',
            contacts: '张峰',
            tel: '114',
            site: '',
            creater: '李小二',
            createDate: '2018-9-8',
            remarks: ''
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
          doorData:{},
          uploadUrl:'',
          uploadSrc:require('../../assets/img/test.jpg')

        }
      },
      methods:{
        init(){

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

        },
        // 新增,修改
        clickBtn(type){
          this.editDate = this.$Store.formatDate();
          this.dialogFormVisible = true;

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
          this.dialogFormVisible = false;
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
        SelfInput
      },
      mounted(){
         let arr = new Array(30).fill(this.wareData[0]);
         this.wareData = arr;
         this.init();


      }
    }
</script>

<style lang="less">

</style>
