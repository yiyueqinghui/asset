<template>
    <div id="workplace">
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
         </el-form-item>
      </el-form>
      <!--表格-->
      <el-table :data="wareData"  @selection-change="handleSelectionChange" ref="multipleTable"  border stripe fit style="overflow-x: auto">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" label="序号" width="60" align="center">
        </el-table-column>
        <el-table-column  label="状态" width="120"  align="center">
          <template slot-scope="scope">
            {{scope.row.status | turnStatus }}
          </template>
        </el-table-column>
        <el-table-column  label="照片（合同）"  align="center">
          <template slot-scope="scope">
            <img class="tabPic" :src="scope.row.src" />
          </template>
        </el-table-column>
        <el-table-column  label="公司名称" prop="company"  align="center">
        </el-table-column>
        <el-table-column  label="职场类型" prop="use_type"  align="center">
        </el-table-column>
        <el-table-column  label="职场地址" prop="address"  align="center">
        </el-table-column>
        <el-table-column  label="租赁面积" prop="area_num"  align="center">
        </el-table-column>
        <el-table-column  label="金额/平米" prop="area_charge_unit"  align="center">
        </el-table-column>
        <el-table-column  label="工位数" prop="station_num"  align="center">
        </el-table-column>
        <el-table-column  label="会议室数" prop="meeting_room_num"  align="center">
        </el-table-column>
        <el-table-column  label="可注册公司数" prop="registerable_company_num"  align="center">
        </el-table-column>
        <el-table-column  label="已注册公司名称" prop="registered_companies"  align="center">
        </el-table-column>
        <el-table-column  label="合同起始日期" prop="contract_start"  align="center">
        </el-table-column>
        <el-table-column  label="合同终止日期" prop="contract_end"  align="center">
        </el-table-column>
        <el-table-column  label="合同总金额" prop="contract_money"  align="center">
        </el-table-column>
        <el-table-column  label="支付方式" prop="pay_mode"  align="center">
        </el-table-column>
        <el-table-column  label="支付类型" prop="pay_interval"  align="center">
        </el-table-column>
        <el-table-column  label="租金金额" prop="rent_money"  align="center">
        </el-table-column>
        <el-table-column  label="保证金金额" prop="deposit_money"  align="center">
        </el-table-column>
        <el-table-column  label="物业费/月" prop="property_charge"  align="center">
        </el-table-column>
        <el-table-column  label="水费/立方米" prop="water_charge"  align="center">
        </el-table-column>
        <el-table-column  label="电费/度" prop="energy_charge"  align="center">
        </el-table-column>
        <el-table-column  label="网费/月" prop="internet_charge"  align="center">
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
        <EditorInfo v-if="dialogFormVisible" :edit-date="editDate"></EditorInfo>
        <el-form :inline="true" :model="formData"  label-width="auto"  class="demo-form-inline self-input">
          <el-row class="dialog_subtitle">基本信息</el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput  labelName="公司名称" keyName="company" :val="formData.company" :required="true"  @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput type="1"  labelName="职场类型" :selectList="typeList"  keyName="use_type" :required="true" :val="formData.tuse_type"  @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput  labelName="职场地址" keyName="address" :val="formData.address" :required="true" @changeFormVal="changeFormVal" :disabled="false"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput  labelName="租赁面积" keyName="area_num" :val="formData.area_num" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput  labelName="金额/平米" keyName="area_charge_unit" :val="formData.area_charge_unit" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput  labelName="工位数" keyName="station_num" :val="formData.station_num" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput  type="1" labelName="会议室数量" keyName="meeting_room_num" :val="formData.meeting_room_num" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput type="1" labelName="可注册公司数" :selectList="typeList"  keyName="registerable_company_num" :val="formData.registerable_company_num" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput labelName="已注册公司名称" keyName="registered_companies" :val="formData.registered_companies" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput type="3"  labelName="合同起始日期" :selectList="companyList"  keyName="contract_start" :val="formData.contract_start" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput type="3" labelName="合同终止日期" :selectList="departList" keyName="contract_end" :val="formData.contract_end" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput labelName="合同总金额" keyName="contract_money" :val="formData.contract_money" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput  type="1" labelName="支付方式"  :selectList="companyList" keyName="pay_mode" :val="formData.pay_mode" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput  type="1" labelName="支付类型"  :selectList="companyList" keyName="pay_interval" :val="formData.pay_interval" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput  type="1" labelName="租金金额"  :selectList="companyList" keyName="rent_money" :val="formData.rent_money" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput  type="1" labelName="保证金"  :selectList="companyList" keyName="deposit_money" :val="formData.deposit_money" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput  type="1" labelName="物业费/月"  :selectList="companyList" keyName="property_charge" :val="formData.property_charge" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput  type="1" labelName="水费/立方米"  :selectList="companyList" keyName="water_charge" :val="formData.water_charge" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <SelfInput  type="1" labelName="电费/度"  :selectList="companyList" keyName="energy_charge" :val="formData.energy_charge" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
            <el-col :sm="12">
              <SelfInput  type="1" labelName="网费/月"  :selectList="companyList" keyName="internet_charge" :val="formData.internet_charge" :required="true" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <SelfInput type="4" labelName="备注"  keyName="comment" :val="formData.remarks" @changeFormVal="changeFormVal"></SelfInput>
            </el-col>
          </el-row>

          <el-row>
            <el-col :sm="12">
              <SelfInput  type="1" labelName="（附件）合同"  keyName="contract_attachment" :val="formData.contract_attachment" :required="true" @changeFormVal="changeFormVal"></SelfInput>
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
          wareData: [],
          multipleSelection: [],    //当前选中的行数据
          currentPage: 1,
          total: 20,
          dialogFormVisible:false,
          formTitle: '新增',
          formData: {
            editDate:'',
            name: '',
            company: '',
            use_type: '',
            address: '',
            area_num: '',
            station_num: '',
            meeting_room_num: '',
            registerable_company_num: '',
            registered_companies:0,
            contract_start:0,
            contract_end:'',
            contract_money:'',
            contract_attachment: '',
            pay_interval: '',
            rent_money: '',
            deposit_money: '',
            property_charge: '',
            water_charge: '',
            energy_charge: '',
            internet_charge: '',
            comment:''
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


        }
      },
      methods:{
        init(){
          this.fetchData();
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
          // console.log(this.multipleSelection);
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentPage(val) {
          console.log(`当前页: ${val}`);
          this.currentPage = val;
        },
        fetchData(){
          this.$axios.Asset.workplace('GET',{}).then(res=>{
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
            this.$axios.Asset.workplace('POST',data).then(res=>{
              // this.tipMessage('新增成功！');
              this.$message({
                message:'新增成功！',
                type:'success'
              })
              this.fetchData();
              this.dialogFormVisible = false;
            })
          }else{
            this.$axios.Asset.workplace('PUT',data).then(res=>{
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
              this.$axios.Asset.workplace('DELETE',item).then(res=>{
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
          console.log(val);
          this.formData[key] = val;
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
        this.init();
      }
    }
</script>

<style lang="less">

</style>
