<template>
    <div id="back">
       <el-row>
         <el-button type="primary" @click="confirmBack">确认退库</el-button>
       </el-row>
      <el-table :data="data"  @selection-change="handleSelectionChange" ref="multipleTable"  border stripe fit style="overflow-x: auto;margin:20px 0;">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" label="序号" width="60" align="center">
        </el-table-column>
        <el-table-column  label="姓名" prop="name"  align="center">
        </el-table-column>
        <el-table-column  label="所属部门"  prop="depart"  align="center">
        </el-table-column>
      </el-table>
      <el-dialog
        :close-on-click-modal="false" :close-on-press-escape="false"
        title="退库确认"
        :visible.sync="visible"
        width="960px"
        top="80px">
        <el-row class="dialog_subtitle">退库人信息</el-row>
        <el-form :model="personData" :inline="true" label-width="auto"  class="demo-form-inline back-input border">
          <el-form-item label="姓名" label-width="40px">
            <el-input v-model="personData.name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="所在机构" label-width="70px">
            <el-input v-model="personData.org" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="所在部门" label-width="70px">
            <el-input v-model="personData.depart" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="退库申请时间" label-width="100px">
            <el-input v-model="personData.date" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
        <el-table :data="assetData"  @selection-change="handleSelectionChange" ref="multipleTable"  border stripe fit style="overflow-x: auto">
          <el-table-column type="index" label="序号" width="60" align="center">
          </el-table-column>
          <!--<el-table-column  label="照片"  align="center">-->
          <!--<template slot-scope="scope">-->
          <!--<img class="tabPic" :src="scope.row.src" />-->
          <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column  label="资产名称" width="100" prop="name"  align="center">
          </el-table-column>
          <el-table-column  label="资产类别" prop="category"  align="center">
          </el-table-column>
          <el-table-column  label="资产编码" prop="assetNo"  align="center">
          </el-table-column>
          <el-table-column  label="规格型号" prop="model"  align="center">
          </el-table-column>
          <el-table-column  label="SN号" width="130" prop="serialNo"  align="center">
          </el-table-column>
          <el-table-column  label="购入时间" width="120" sortable prop="purchaseDate"  align="center">
          </el-table-column>
          <!--<el-table-column  label="所属公司" prop="blong"  align="center">-->
          <!--</el-table-column>-->
          <el-table-column  label="发票号码" width="100" prop="invoice"  align="center">
          </el-table-column>
          <el-table-column  label="实付金额" prop="amount"  align="center">
          </el-table-column>
          <!--<el-table-column  label="使用公司" prop="useCompany"  align="center">-->
          <!--</el-table-column>-->
          <!--<el-table-column  label="使用部门" prop="useDepart"  align="center">-->
          <!--</el-table-column>-->
          <!--<el-table-column  label="使用人" prop="usePerson"  align="center">-->
          <!--</el-table-column>-->
          <!--<el-table-column  label="供应商" prop="supplier"  align="center">-->
          <!--</el-table-column>-->
          <!--<el-table-column  label="联系人(供应商)" width="130" prop="contacts"  align="center">-->
          <!--</el-table-column>-->
          <!--<el-table-column  label="联系电话(供应商)" width="130" prop="tel"  align="center">-->
          <!--</el-table-column>-->
          <el-table-column  label="存放地点" prop="storedPosition"  align="center">
          </el-table-column>
          <!--<el-table-column  label="创建人" prop="creater"  align="center">-->
          <!--</el-table-column>-->
          <!--<el-table-column  label="创建时间" width="120" sortable prop="createDate"   align="center">-->
          <!--</el-table-column>-->
          <el-table-column  label="备注" prop="memo"  align="center">
          </el-table-column>

        </el-table>


        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
      data(){
        return {
          multipleSelection:[],
          data:[
            {
              name:'小李',
              depart:'技术部',
            },
            {
              name:'小李2',
              depart:'技术部2',
            }
          ],
          visible:false,
          personData:{
            name:'小明',
            org:'集团',
            depart:'部门',
            date:'2019-06-06'
          },
          assetData:[]

        }
      },
      methods:{
        confirmBack(){
          if(this.multipleSelection.length === 1){
            this.visible = true;
          }else{
            this.$message({
              message:'请选择一个要退库的人员',
              type:'warning'
            })
          }
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        confirm(){
          this.$message({
            message:'退库成功！',
            type:'success'
          })
          this.visible = false;

        }
      }
    }
</script>

<style>
  .back-input{
    border-bottom:1px solid #aee2ff;
    margin-bottom: 20px;
  }
  .back-input .el-input__inner{
    width: 145px;
  }

</style>
