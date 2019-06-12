<template>
    <div id="wareHousing">
      <!--查寻-->
      <el-form :inline="true"  :model="searchData" >
         <el-form-item label="使用公司部门">
           <el-select v-model="searchData.department" filterable placeholder="请选择">
             <el-option
               v-for="item in departmentList"
               :key="item.value"
               :value="item.value">
             </el-option>
           </el-select>
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
        <el-table-column  label="状态" prop="status" width="120" filterable :filters="this.$Store.data.statusList"
           :filter-method="filterStatus" filter-placement="bottom-end"  align="center">
          <template slot-scope="scope">
            {{scope.row.status | turnStatus }}
          </template>
        </el-table-column>
        <el-table-column  label="照片"  align="center">
          <template slot-scope="scope">
            <img class="tabPic" :src="scope.row.src" />
          </template>
        </el-table-column>
        <el-table-column  label="资产名称" width="100" prop="name"  align="center">
        </el-table-column>
        <el-table-column  label="资产类别" prop="type"  align="center">
        </el-table-column>
        <el-table-column  label="资产编码" prop="code"  align="center">
        </el-table-column>
        <el-table-column  label="规格型号" prop="size"  align="center">
        </el-table-column>
        <el-table-column  label="SN号" width="130" prop="SN"  align="center">
        </el-table-column>
        <el-table-column  label="购入时间" width="120" sortable prop="purchaseDate"  align="center">
        </el-table-column>
        <el-table-column  label="所属公司" prop="blong"  align="center">
        </el-table-column>
        <el-table-column  label="发票号码" width="100" prop="bill"  align="center">
        </el-table-column>
        <el-table-column  label="实付金额" prop="money"  align="center">
        </el-table-column>
        <el-table-column  label="使用公司" prop="useCompany"  align="center">
        </el-table-column>
        <el-table-column  label="使用部门" prop="useDepart"  align="center">
        </el-table-column>
        <el-table-column  label="使用人" prop="usePerson"  align="center">
        </el-table-column>
        <el-table-column  label="供应商" prop="supplier"  align="center">
        </el-table-column>
        <el-table-column  label="联系人(供应商)" width="130" prop="contacts"  align="center">
        </el-table-column>
        <el-table-column  label="联系电话(供应商)" width="130" prop="tel"  align="center">
        </el-table-column>
        <el-table-column  label="存放地点" prop="site"  align="center">
        </el-table-column>
        <el-table-column  label="创建人" prop="creater"  align="center">
        </el-table-column>
        <el-table-column  label="创建时间" width="120" sortable prop="createDate"   align="center">
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
        top="20px">
        <el-scrollbar class="dialogZone">
          <EditorInfo v-if="dialogFormVisible" :edit-date="editDate"></EditorInfo>
          <el-form :inline="true" :model="formData"  label-width="auto"  class="demo-form-inline self-input">
            <el-row class="dialog_subtitle">基本信息</el-row>
            <el-row>
              <el-col :sm="8">
                <SelfInput  labelName="资产名称" keyName="name" :val="formData.name" :required="true"  @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="8">
                <SelfInput type="2"  labelName="资产类别" :selectList="typeList"  keyName="type" :required="true" :val="formData.type"  @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="8">
                <SelfInput  labelName="资产编码" keyName="code" :val="formData.code" :required="true" @changeFormVal="changeFormVal" :disabled="true"></SelfInput>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="8">
                <SelfInput  labelName="规格型号" keyName="size" :val="formData.size" :required="true" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="8">
                <SelfInput  labelName="SN号" keyName="SN" :val="formData.SN" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="8">
                <SelfInput  type="3" labelName="购入时间" keyName="purchaseDate" :val="formData.purchaseDate" :required="true" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="8">
                <SelfInput type="2" labelName="所属机构" :selectList="typeList"  keyName="blong" :val="formData.blong" :required="true" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="8">
                <SelfInput labelName="发票号码" keyName="bill" :val="formData.bill" :required="true" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="8">
                <SelfInput type="5" labelName="实付金额" keyName="money" :val="formData.money" :required="true" @changeFormVal="changeFormVal"></SelfInput>
                <!--<el-form-item label="实付金额" :rules="{required:true}">-->
                <!--<el-input type="number" v-model="formData.money" @blur="toChinese" @focus="toNum"></el-input>-->
                <!--</el-form-item>-->
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="8">
                <SelfInput type="2"  labelName="使用公司" :selectList="companyList"  keyName="useCompany" :val="formData.useCompany" :required="true" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="8">
                <SelfInput type="2" labelName="使用部门" :selectList="departList" keyName="useDepart" :val="formData.useDepart" :required="true" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="8">
                <SelfInput labelName="使用人" keyName="usePerson" :val="formData.usePerson" :required="true" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="8">
                <SelfInput  labelName="存放地点"  keyName="site" :val="formData.site" :required="true" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <SelfInput type="4" labelName="备注"  keyName="remarks" :val="formData.remarks" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            </el-row>
            <!--维保信息-->
            <el-row class="dialog_subtitle">维保信息</el-row>
            <el-row>
              <el-col :sm="8">
                <SelfInput  labelName="供应商"  keyName="supplier" :val="formData.supplier" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="8">
                <SelfInput  labelName="联系人"  keyName="contacts" :val="formData.contacts" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="8">
                <SelfInput  labelName="联系方式"  keyName="tel" :val="formData.tel" @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="12">
                <SelfInput type="4" labelName="维保说明"  keyName="explain" :val="formData.explain" @changeFormVal="changeFormVal"></SelfInput>
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
    import downloadModule from '../../utils/download'
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
              type: '办工卓01',
              code: '办公设备',
              size: '双人',
              SN: '002110C0D0034',
              purchaseDate: '2018-3-1',
              blong: '测试机构',
              bill: '102110987',
              money: 200,
              moneyChinese:'',
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
            {
              status: '2',
              src: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1557731166&di=a35f2105642f239a24a5e6483b0f2a67&src=http://pic2.52pk.com/files/allimg/090626/1553504U2-2.jpg',
              name: '11010001',
              type: '办工卓02',
              code: '办公设备',
              size: '双人',
              SN: '002110C0D0034',
              purchaseDate: '2018-3-2',
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
              createDate: '2018-10-8',
              remarks: ''
            }
          ],
          multipleSelection: [],    //当前选中的行数据
          currentPage: 1,
          total: 20,
          dialogFormVisible:false,
          formTitle: '新增',
          formData: {
            editDate:'',
            name: '',
            type: '',
            code: '',
            size: '',
            SN: '',
            purchaseDate: '',
            blong: '',
            bill: '',
            money:0,
            showMoney:0,
            chineseMoney:'',
            numMoney:'',
            useCompany: '',
            useDepart: '',
            usePerson: '',
            site: '',
            remarks: '',
            supplier: '',
            contacts: '',
            tel: '',
            explain:''
          },
          dialogLoading: false,
          editDate: '2019-05-11',
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
          uploadVisible:false
        }
      },
      methods:{
        init(){

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
          this.editDate = type == 1 ? this.$Store.formatDate() : this.formData.editDate;
          if(this.multipleSelection.length != 1 && type == 2){
            this.$message({
              message: '请选择一条要修改的数据',
              type: 'warning'
            });
            return;
          }else{
            this.formData = Object.assign({},this.multipleSelection[0]);
          }
          this.dialogFormVisible = true;
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
        UploadExcel
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
