<template>
    <div id="wareHousing">
      <!--查寻-->
      <el-form :inline="true"  :model="searchData" >
         <el-form-item label="">
           <el-input v-model="searchData.val" placeholder="请输入内容进行查寻"/>
         </el-form-item>
         <el-form-item>
           <el-button type="primary" icon="el-icon-search" @click="fetchData">查询</el-button>
           <el-button  style="margin-left: 10px;" @click="clickBtn(1)" type="primary" icon="el-icon-edit">新增</el-button>
           <el-button  style="margin-left: 10px;" @click="clickBtn(2)" type="primary" icon="el-icon-edit">修改</el-button>
           <el-button  style="margin-left: 10px;" @click="deleteBtn" type="primary" icon="el-icon-edit">删除</el-button>
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
      <el-table :data="wareData"  @selection-change="handleSelectionChange" ref="multipleTable"  border stripe fit stripe style="overflow-x: auto">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" label="序号" width="60" align="center">
        </el-table-column>
        <el-table-column  label="职场类型" width="100" prop="type"  align="center">
        </el-table-column>
        <el-table-column  label="公司名称" width="120" prop="name"  align="center">
        </el-table-column>
        <el-table-column  label="职场地址" prop="site"  align="center">
        </el-table-column>
        <el-table-column  label="职场租赁面积" width="120" prop="rentArea"  align="center">
        </el-table-column>
        <el-table-column  label="职场每㎡金额" width="120" prop="perAreaMoney"  align="center">
        </el-table-column>
        <el-table-column  label="职场工位数" width="110" prop="stationNum"  align="center">
        </el-table-column>
        <el-table-column  label="职场会议室数量" width="130" prop="meetingRoomNum"  align="center">
        </el-table-column>
        <el-table-column  label="可注册公司数量" width="130" prop="registeredNum"  align="center">
        </el-table-column>
        <el-table-column  label="已注册公司名称" width="130" prop="registeredCompany"  align="center">
        </el-table-column>
        <el-table-column  label="合同起始日期" width="120" prop="startDate"  align="center">
        </el-table-column>
        <el-table-column  label="合同终止日期" width="120" prop="endDate"  align="center">
        </el-table-column>
        <el-table-column  label="支付方式" prop="payWay"  align="center">
        </el-table-column>
        <el-table-column  label="支付类型" prop="payType"  align="center">
        </el-table-column>
        <el-table-column  label="租金金额" prop="totalMoney"  align="center">
        </el-table-column>
        <el-table-column  label="保证金金额" width="120" prop="assureMoney"  align="center">
        </el-table-column>
        <el-table-column  label="物业费金额/月" width="120" prop="propertyMoney"  align="center">
        </el-table-column>
        <el-table-column  label="电费金额/度" width="120" prop="elecMoney"  align="center">
        </el-table-column>
        <el-table-column  label="网费/月"  prop="netMoney"   align="center">
        </el-table-column>
        <el-table-column  label="水费/m³"  prop="waterMoney"   align="center">
        </el-table-column>
        <el-table-column  label="创建人"  prop="creater"   align="center">
        </el-table-column>
        <el-table-column  label="创建时间" width="120"  prop="createDate"   align="center">
        </el-table-column>
        <el-table-column  label="备注" prop="remarks"  align="center">
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
        width="960px"
        top="80px">
        <el-scrollbar class="dialogZone">
          <EditorInfo v-if="dialogFormVisible" :edit-date="editDate"></EditorInfo>
          <el-form :model="formData"  label-width="auto"  class="demo-form-inline self-input">
            <el-row class="dialog_subtitle">基本信息</el-row>
            <el-row>
              <el-col :sm="8">
                <SelfInput  labelName="公司名称" keyName="name" :val="formData.name"  @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="8">
                <SelfInput type="2"  labelName="职场类型" :selectList="typeList"  keyName="type" :val="formData.type"  @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="8">
                <SelfInput  labelName="职场地址" keyName="site" :val="formData.site"  @changeFormVal="changeFormVal" :disabled="true"></SelfInput>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="8">
                <SelfInput  labelName="职场租赁面积" keyName="rentArea" :val="formData.rentArea" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="8">
                <SelfInput  labelName="职场每㎡金额" keyName="perAreaMoney" :val="formData.perAreaMoney" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="8">
                <SelfInput  labelName="职场工位数" keyName="stationNum" :val="formData.stationNum" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="8">
                <SelfInput  labelName="职场会议室数量"   keyName="meetingRoomNum" :val="formData.meetingRoomNum"  @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="8">
                <SelfInput labelName="可注册公司数量" keyName="registeredNum" :val="formData.registeredNum"  @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="8">
                <SelfInput labelName="已注册公司名称" keyName="registeredCompany" :val="formData.registeredCompany" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="8">
                <SelfInput type="3"  labelName="合同起始日期" keyName="startDate" :val="formData.startDate"  @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="8">
                <SelfInput type="3" labelName="合同终止日期"  keyName="endDate" :val="formData.endDate" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="8">
                <SelfInput labelName="合同总金额" keyName="totalMoney" :val="formData.totalMoney" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="8">
                <SelfInput type="2" :selectList="wayList" labelName="支付方式"  keyName="payWay" :val="formData.payWay" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="8">
                <SelfInput type="2" :selectList="typeList" labelName="支付类型"  keyName="payWay" :val="formData.payWay" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="8">
                <SelfInput type="5" labelName="租金金额"  keyName="rentMoney" :val="formData.rentMoney" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="8">
                <SelfInput  labelName="保证金金额"  keyName="assureMoney" :val="formData.assureMoney" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="8">
                <SelfInput labelName="物业费金额/月"  keyName="propertyMoney" :val="formData.propertyMoney" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="8">
                <SelfInput labelName="水费/立方米"  keyName="waterMoney" :val="formData.waterMoney" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="8">
                <SelfInput labelName="电费(每度金额)"  keyName="elecMoney" :val="formData.elecMoney" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="8">
                <SelfInput labelName="网费/月"  keyName="netMoney" :val="formData.netMoney" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="12">
                <el-form-item label="合同附件上传">
                  <!--<el-upload-->
                    <!--class="upload-demo"-->
                    <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                    <!--name="contract"-->
                    <!--:headers="headers"-->
                    <!--:on-success="uploadSuccess"-->
                    <!--:multiple="false"-->
                    <!--:limit="1">-->
                    <!--<el-button size="small" type="primary">上传附件</el-button>-->
                  <!--</el-upload>-->
                  <UploadFile :upload-data="uploadData" @uploadSuccess="uploadSuccess"></UploadFile>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <SelfInput type="4" labelName="备注"  keyName="remarks" :val="formData.remarks" @changeFormVal="changeFormVal"></SelfInput>
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
            val: ''
          },
          departmentList: [
            {"value": "佳禾集团", "en": "JHJT"},
            {"value": "中恒信", "en": "ZHX"},
            {"value": "黄鱼儿", "en": "HYR"}
          ],
          wareData: [
            {
              id:1,
              editDate:'2018-02-22',
              type:'租赁',
              name:'示例公司_1',
              site:'北京',
              rentArea:100,
              perAreaMoney:10,
              stationNum:1000,
              meetingRoomNum:4,
              registeredNum:2,
              registeredCompany:'佳禾',
              startDate:'2018年5月1日',
              endDate:'2019年5月1日',
              totalMoney:100000,
              payWay:'月付',
              payType:'预付',
              rentMoney:29887,
              assureMoney:234,
              propertyMoney:109,
              elecMoney:768,
              netMoney:90,
              waterMoney:987,
              creater:'李小二',
              createDate:'2018-09-21',
              remarks:''
            },
            {
              id:2,
              editDate:'2018-02-25',
              type:'租赁',
              name:'示例公司_1',
              site:'北京',
              rentArea:100,
              perAreaMoney:10,
              stationNum:1000,
              meetingRoomNum:4,
              registeredNum:2,
              registeredCompany:'佳禾',
              startDate:'2018年5月1日',
              endDate:'2019年5月1日',
              totalMoney:100000,
              payWay:'月付',
              payType:'预付',
              rentMoney:29887,
              assureMoney:234,
              propertyMoney:109,
              elecMoney:768,
              netMoney:90,
              waterMoney:987,
              creater:'李小二',
              createDate:'2018-09-21',
              remarks:''
            }
          ],
          multipleSelection: [],    //当前选中的行数据
          currentPage: 1,
          total: 20,
          dialogFormVisible:false,
          formTitle: '新增',
          formData: {
            editDate:'',
            type:'',
            name:'',
            site:'',
            rentArea:0,
            perAreaMoney:0,
            stationNum:0,
            meetingRoomNum:0,
            registeredNum:0,
            registeredCompany:'',
            startDate:'',
            endDate:'',
            totalMoney:0,
            payWay:'',
            payType:'',
            rentMoney:0,
            assureMoney:0,
            propertyMoney:0,
            elecMoney:0,
            netMoney:0,
            waterMoney:0,
            creater:'',
            createDate:'',
            remarks:''
          },
          dialogLoading: false,
          editDate: '2019-05-11',
          wayList:[
            {
              value:'预付'
            },
            {
              value:'预付1'
            },
            {
              value:'预付2'
            }
          ],
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
            {
              value:'公司一'
            },
            {
              value:'公司二'
            }
          ],
          departList:[
            {
              value:'部门一'
            },
            {
              value:'部门二'
            }
          ],
          uploadVisible:false,
          uploadData:{
            name:'contract'
          }
        }
      },
      methods:{
        init(){

        },
        uploadSuccess(){

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
        closeUpload(){
          this.uploadVisible = false;
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
        formatJson(filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => v[j]))
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
          this.formTitle = type == 1 ? '新增':'修改';
          this.editDate = this.$Store.formatDate();
          if(type == 2){
            if(this.multipleSelection.length != 1 ){
              this.$message({
                message: '请选择一条要修改的数据',
                type: 'warning'
              });
              return;
            }else{
              this.formData = Object.assign({},this.multipleSelection[0]);
            }
          }

          this.dialogFormVisible = true;
        },
        deleteBtn(){
          let deleteItem = [];
          this.multipleSelection.forEach(item=>{
            deleteItem.push(item.id);
          })
          let newData = []
          this.wareData.forEach((item)=>{
            if(deleteItem.indexOf(item.id) === -1){
              newData.push(item);
            }
          })
          this.wareData = newData;

        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
          // console.log(this.multipleSelection);
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentPage(val) {
          console.log(`当前页: ${val}`);
          this.currentPage = val;
        },
        confirmBtn(){
          console.log(this.formData);
          this.dialogFormVisible = false;
        },
        changeFormVal([key,val]){
          console.log(val);
          this.formData[key] = val;
        },
        filterStatus(value,row){
          console.log(value);
          return row.status === value
        }
      },
      components:{
        EditorInfo,
        SelfInput,
        UploadExcel,
        UploadFile
      },
      mounted(){
         this.init();
         // let arr = new Array(5).fill(this.wareData[0]);
         // this.wareData = arr;
        this.$Store.NumberToChinese(101.31);
        console.log(this.$Store.data.statusList)

      }
    }
</script>

<style lang="less">

</style>
