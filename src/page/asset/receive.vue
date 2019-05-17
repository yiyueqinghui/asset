<template>
    <div id="wareHousing">
      <!--查寻-->
      <el-form :inline="true"  :model="searchData" >
         <el-form-item label="领用日期">
           <el-date-picker
             v-model="searchData.startDate"
             type="date"
             value-format="yyyy-MM-dd"
             placeholder="选择开始日期">
           </el-date-picker>
           <span>一</span>
           <el-date-picker
             v-model="searchData.endDate"
             type="date"
             value-format="yyyy-MM-dd"
             placeholder="选择结束日期">
           </el-date-picker>
         </el-form-item>
         <el-form-item>
           <el-button type="primary" icon="el-icon-search" @click="fetchData">查询</el-button>
           <el-button  style="margin-left: 10px;" @click="clickBtn(1)" type="primary" icon="el-icon-edit">新增</el-button>
           <!--<el-button  style="margin-left: 10px;" @click="clickBtn(2)" type="primary" icon="el-icon-edit">修改</el-button>-->
           <el-dropdown trigger="hover" style="margin-left: 10px;" @command="handleCommand">
              <el-button type="primary" icon="el-icon-document-add">
                导出
              </el-button>
               <el-dropdown-menu slot="dropdown">
                 <el-dropdown-item icon="el-icon-download" command="module">下载导入模板</el-dropdown-item>
                 <!--<el-dropdown-item icon="el-icon-upload" command="upload" >批量导入资产</el-dropdown-item>-->
                 <el-dropdown-item icon="el-icon-download" command="download">导出领用数据</el-dropdown-item>
               </el-dropdown-menu>
           </el-dropdown>
         </el-form-item>
      </el-form>
      <!--表格-->
      <el-table :data="tabData"  @selection-change="handleSelectionChange" ref="multipleTable"  border stripe fit style="overflow-x: auto">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" label="序号" width="60" align="center">
        </el-table-column>
        <el-table-column  label="领用日期"  prop="date" align="center">
        </el-table-column>
        <el-table-column  label="领用人" prop="person"  align="center">
        </el-table-column>
        <el-table-column  label="领用后使用公司" width="120" prop="company"  align="center">
        </el-table-column>
        <el-table-column  label="领用后使用部门" width="120" prop="depart"  align="center">
        </el-table-column>
        <el-table-column  label="领用后区域" width="100" prop="zone"  align="center">
        </el-table-column>
        <el-table-column  label="领用后处理人" width="120" prop="dealPerson"  align="center">
        </el-table-column>
        <el-table-column  label="备注" prop="receiveRemarks"  align="center">
        </el-table-column>
        <el-table-column  label="资产明细"  align="center">
          <el-table-column label="资产名称" width="100" prop="name" align="center"></el-table-column>
          <el-table-column label="资产类别" prop="type" align="center"></el-table-column>
          <el-table-column label="资产编码" prop="code" align="center"></el-table-column>
          <el-table-column label="资产型号" prop="size" align="center"></el-table-column>
          <el-table-column label="SN号" width="150" prop="SN" align="center"></el-table-column>
          <el-table-column label="购入时间" prop="purchaseDate" align="center"></el-table-column>
          <el-table-column label="所属公司" prop="blong" align="center"></el-table-column>
          <el-table-column label="发票号码" width="100" prop="bill" align="center"></el-table-column>
          <el-table-column label="金额" prop="money" align="center"></el-table-column>
          <el-table-column label="使用公司" prop="useCompany" align="center"></el-table-column>
          <el-table-column label="使用部门" prop="useDepart" align="center"></el-table-column>
          <el-table-column label="使用人" prop="usePerson" align="center"></el-table-column>
          <el-table-column label="存放地点" prop="site" align="center"></el-table-column>
          <el-table-column label="备注" prop="remarks" align="center"></el-table-column>
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
      <!--新增-->
      <el-dialog
        :close-on-click-modal="false" :close-on-press-escape="false"
        :title="formTitle"
        :visible.sync="dialogFormVisible"
        width="960px"
        top="80px">

        <el-form :model="formData"  label-width="auto"  class="demo-form-inline self-input receivedForm">
          <el-row>
            <el-col :sm="12">
              <el-form-item label="领用人" class="receivers">
                <el-select
                  v-model="formData.name"
                  multiple
                  collapse-tags
                  style="margin-left: 20px;"
                  placeholder="请选择">
                  <el-option
                    v-for="item in nameList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="12">
              <SelfInput type="3"  labelName="领用日期"   keyName="date" :val="formData.date"  @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput type="2"  labelName="领用后使用公司" :selectList="companyList" keyName="company" :val="formData.company"  @changeFormVal="changeFormVal" ></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput  labelName="领用后所在区域" keyName="zone" :val="formData.zone" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput type="2" labelName="领用后使用部门" :selectList="departList"  keyName="depart" :val="formData.depart" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="16">
              <SelfInput type="4" labelName="备注"  keyName="receiveRemarks" :val="formData.receiveRemarks" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
        </el-form>
        <el-row class="btns">
          <el-col :sm="4">
            <el-button type="primary" @click="chooseAsset">选择资产</el-button>
          </el-col>
          <el-col :sm="4">
            <el-button @click="deleteAsset">删除</el-button>
          </el-col>
        </el-row>
        <!--已选择物品表格-->
        <el-table v-show="choosedData.length > 0"  :data="choosedData" :max-height="200"  @selection-change="handleSelection"  border stripe fit style="overflow-x: auto">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column type="index" label="序号" width="60" align="center">
          </el-table-column>
          <el-table-column  label="状态" width="120"  align="center">
            <template slot-scope="scope">
              {{scope.row.status | turnStatus }}
            </template>
          </el-table-column>
          <el-table-column  label="照片"  align="center">
            <template slot-scope="scope">
              <img class="tabPic" :src="scope.row.src" />
            </template>
          </el-table-column>
          <el-table-column width="100" label="资产名称" prop="name"  align="center">
          </el-table-column>
          <el-table-column  label="资产编码" prop="code"  align="center">
          </el-table-column>
          <el-table-column  label="规格型号" prop="size"  align="center">
          </el-table-column>
          <el-table-column  label="购入时间" prop="purchaseDate"  align="center">
          </el-table-column>
          <el-table-column  label="所属公司" prop="blong"  align="center">
          </el-table-column>
          <el-table-column  label="当前所在公司" width="110" prop="useCompany"  align="center">
          </el-table-column>
          <el-table-column  label="当前所在部门" width="110" prop="useDepart"  align="center">
          </el-table-column>
          <el-table-column  label="当前使用人" width="100" prop="usePerson"  align="center">
          </el-table-column>
          <el-table-column  label="存放地点" prop="site"  align="center">
          </el-table-column>
          <el-table-column  label="备注" prop="remarks"  align="center">
          </el-table-column>
        </el-table>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmBtn">确 定</el-button>
        </div>
      </el-dialog>

      <!--选择资产-->
      <el-dialog
        :close-on-click-modal="false" :close-on-press-escape="false"
        title="选择资产"
        :visible.sync="allAssetVisible"
        width="960px"
        top="80px">
        <el-form :inline="true"  :model="searchAsset" >
          <el-form-item>
            <el-input v-model="searchAsset.val" placeholder="请输入查寻内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="fetchAssetData">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table v-show="choosedData.length > 0"  :data="allAssets" max-height="500"  @selection-change="handleChoosed"  border stripe fit style="overflow-x: auto">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column type="index" label="序号" width="60" align="center">
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
          <el-table-column  label="购入时间" prop="purchaseDate"  align="center">
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
          <el-table-column  label="创建时间" prop="createDate"  align="center">
          </el-table-column>
          <el-table-column  label="备注" prop="remarks"  align="center">
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-row>
          <el-pagination
            background
            @size-change="handleAdjustSize"
            @current-change="handleAdjustPage"
            :current-page="newCurrentPage"
            :page-sizes="[5,10,30,50]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="newTotal">
          </el-pagination>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="allAssetVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmChoosed">确 定</el-button>
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
            startDate:'',
            endDate:''
          },
          tabData: [
            {
              date:'',
              person:'',
              company:'佳禾集团',
              depart:'xxx',
              zone:'办公区',
              dealPerson:'cj',
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
              site: '',
              remarks: '',
              receiveRemarks:''
            },
            {
              date:'',
              person:'',
              company:'佳禾集团',
              depart:'xxx',
              zone:'办公区',
              dealPerson:'cj',
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
              site: '',
              remarks: ''
            }
          ],
          multipleSelection: [],    //当前选中的行数据
          currentPage: 1,
          total: 20,
          dialogFormVisible:false,
          formTitle: '资产领用单',
          formData: {
            date:'',
            person:'',
            company:'佳禾集团',
            depart:'xxx',
            zone:'办公区',
            receiveRemarks:''
          },
          dialogLoading: false,
          nameList:[
            {
              value:1,
              label:'张三'
            },
            {
              value:2,
              label:'李忠'
            },
            {
              value:3,
              label:'张三'
            },
            {
              value:4,
              label:'李忠'
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
          choosedAsset:[],
          choosedData:[
            {
              status: '1',
              src: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1557731166&di=a35f2105642f239a24a5e6483b0f2a67&src=http://pic2.52pk.com/files/allimg/090626/1553504U2-2.jpg',
              name: '11010001',
              code: '办公设备',
              size: '双人',
              purchaseDate: '2018-3-1',
              blong: '测试机构',
              useCompany: '网开',
              useDepart: '研发部',
              usePerson: 'xxx',
              site: '',
              remarks: ''
            },
            {
              status: '1',
              src: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1557731166&di=a35f2105642f239a24a5e6483b0f2a67&src=http://pic2.52pk.com/files/allimg/090626/1553504U2-2.jpg',
              name: '11010021',
              code: '办公设备',
              size: '双人',
              purchaseDate: '2018-3-1',
              blong: '测试机构',
              useCompany: '网开',
              useDepart: '研发部',
              usePerson: 'xxx',
              site: '',
              remarks: ''
            }
          ],
          searchAsset:{
            val:''
          },
          allAssets:[
            {
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
            }
          ],
          allAssetVisible:false,
          choosedList:[],
          newCurrentPage:1,
          newTotal:20
        }
      },
      methods:{
        chooseAsset(){
          this.allAssetVisible = true;
        },
        deleteAsset(){
          let deleteItem = [];
          this.choosedAsset.forEach(item=>{
            deleteItem.push(item.name);
          })
          let data = [];
          this.choosedData.forEach((item,index)=>{
            if(deleteItem.indexOf(item.name)==-1){
              data.push(item);
            }
          })
          this.choosedData = data;

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
        handleSelection(val){
          this.choosedAsset = val;
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentPage(val) {
          console.log(`当前页: ${val}`);
          this.currentPage = val;
        },
        handleAdjustSize(val) {
          console.log(`每页 ${val} 条`);
        },
        handleAdjustPage(val){
          console.log(`当前页: ${val}`);
          this.newCurrentPage = val;
        },

        confirmBtn(){
          console.log(this.formData);
          this.dialogFormVisible = false;
        },
        changeFormVal([key,val]){
          console.log(val);
          this.formData[key] = val;
        },
        handleChoosed(val){
          this.choosedList = val;
        },
        confirmChoosed(){
          this.allAssetVisible = false;
        },
        fetchAssetData(){

        }

      },
      components:{
        EditorInfo,
        SelfInput,
        UploadExcel
      },
      watch:{
        formData:{
          handler:function(newval,oldval){
            console.log(newval);
          },
          deep:true
        }
      },
      mounted(){
         let arr = new Array(20).fill(this.allAssets[0]);
         this.allAssets = arr;

         let testArr = new Array(20).fill(this.choosedData[0]);
         this.choosedData = testArr;

      }
    }
</script>

<style lang="less">
   .receivedForm{
     width:100%;
     background:url("../../assets/img/border.png") repeat-x left bottom;
     -webkit-background-size: 100% 2px;
     background-size: 100% 2px;
   }
   .btns{
     padding:20px 0;
   }
  .receivers .el-select{
    margin-left:0!important;
  }
</style>
