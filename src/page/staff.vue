<template>
    <div id="staff">
      <!--操作-->
      <el-row class="optBtns">
        <el-button type="primary" @click="checkAsset">盘点</el-button>
        <el-button type="primary" @click="cancleAsset">退库</el-button>
      </el-row>
      <!--表格-->
      <el-table :data="personAsset"  @selection-change="handleSelectionChange" ref="multipleTable"  border stripe fit style="overflow-x: auto">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" label="序列" width="60" align="center">
        </el-table-column>
        <el-table-column  label="资产盘点状态" width="120"  align="center">
          <template slot-scope="scope">
             {{scope.row.status == '1'?'在':'不在'}}
          </template>
        </el-table-column>
        <el-table-column  label="照片"  align="center">
          <template slot-scope="scope">
            <img class="tabPic" :src="scope.row.src" />
          </template>
        </el-table-column>
        <el-table-column  label="资产编码" prop="code"  align="center">
        </el-table-column>
        <el-table-column  label="资产名称" prop="name"  align="center">
        </el-table-column>
        <el-table-column  label="资产类别" prop="type"  align="center">
        </el-table-column>
        <el-table-column  label="规格型号" prop="size"  align="center">
        </el-table-column>
        <el-table-column  label="SN号" prop="SN"  align="center">
        </el-table-column>
        <el-table-column  label="购入时间" prop="purchaseDate"  align="center">
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
      <el-dialog
        :close-on-click-modal="false" :close-on-press-escape="false"
        title="盘点"
        :visible.sync="visible"
        width="960px"
        top="80px">
        <el-scrollbar class="dialogZone">
          <el-form :model="formData"  label-width="auto"  class="demo-form-inline self-input">
            <el-row class="dialog_subtitle">基本信息</el-row>
            <el-row>
              <el-col :sm="12">
                <SelfInput type="2" labelName="资产盘点状态" :selectList="statusList" keyName="status" :val="formData.status" :required="true"  @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="12">
                <SelfInput labelName="资产编码"  keyName="code" :val="formData.code" :disabled="true"  @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="12">
                <SelfInput labelName="资产编码"  keyName="code" :val="formData.code" :disabled="true"  @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
              <el-col :sm="12">
                <SelfInput labelName="资产编码"  keyName="code" :val="formData.code" :disabled="true"  @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="12">
                <SelfInput labelName="资产编码"  keyName="code" :val="formData.code" :disabled="true"  @changeFormVal="changeFormVal"></SelfInput>
              </el-col>
            </el-row>
          </el-form>
        </el-scrollbar>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="confirmBtn">确 定</el-button>
        </div>
      </el-dialog>

    </div>
</template>

<script>
    import SelfInput from '../components/common/selfInput'
    export default {
      data(){
        return {
          personAsset:[
            {
              status:1,
              src:'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1557731166&di=a35f2105642f239a24a5e6483b0f2a67&src=http://pic2.52pk.com/files/allimg/090626/1553504U2-2.jpg',
              code:'0000',
              name:'电脑',
              type:'办公设备',
              size:'',
              SN:'000000',
              purchaseDate:'2017-9-1',
              remarks:''
            },
            {
              status:1,
              src:'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1557731166&di=a35f2105642f239a24a5e6483b0f2a67&src=http://pic2.52pk.com/files/allimg/090626/1553504U2-2.jpg',
              code:'0000',
              name:'电脑',
              type:'办公设备',
              size:'',
              SN:'000000',
              purchaseDate:'2017-9-1',
              remarks:''
            }
          ],
          multipleSelection:[],    //当前选中的行数据
          currentPage:1,
          total:20,
          visible:false,
          formData:{
            status:1,
            code:'111',
            name:'电脑',
            type:'办公设备',
            size:'xxx',
            sn:'12345',
            purchaseDate:'2019-09-09',
            remark:''
          },
          statusList:[
            {
              value:'存在'
            },
            {
              value:'报废'
            }
          ],
        }
      },
      methods:{
        checkAsset(){
          this.visible = true;
        },
        cancleAsset(){

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

        },
        changeFormVal([key,val]){
          console.log(val);
          this.formData[key] = val;
        },
      },
      components:{
        SelfInput
      }
    }
</script>

<style lang="less">
  .optBtns{
    margin-bottom: 15px;
  }


</style>
