<template>
    <div id="assetList">
      <el-dialog
        :close-on-click-modal="false" :close-on-press-escape="false"
        title="选择资产"
        :visible.sync="visible"
        :before-close="closeDialog"
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
        <el-table :data="allAssets" max-height="500"  @selection-change="handleChoosed"  border stripe fit style="overflow-x: auto">
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
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="closeDialog">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
      props:{
        visible:{
          type:Boolean,
          default:false
        }
      },
      data(){
        return {
          allAssetVisible:true,
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
            },
            {
              src: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1557731166&di=a35f2105642f239a24a5e6483b0f2a67&src=http://pic2.52pk.com/files/allimg/090626/1553504U2-2.jpg',
              name: '11010002',
              type: '办工卓2',
              code: '办公设备2',
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
          choosedList:[],
          newCurrentPage:1,
          newTotal:20
        }
      },
      methods:{
        fetchAssetData(){

        },
        closeDialog(){
          this.$emit('hideDialog',this.choosedList);
        },
        handleChoosed(val){
          this.choosedList = val;
        },
        handleAdjustSize(val) {
          console.log(`每页 ${val} 条`);
        },
        handleAdjustPage(val){
          console.log(`当前页: ${val}`);
          this.newCurrentPage = val;
        }
      },
      mounted(){
        // this.allAssets = new Array(2).fill(this.allAssets[0]);
      }
    }
</script>

<style scoped>

</style>
