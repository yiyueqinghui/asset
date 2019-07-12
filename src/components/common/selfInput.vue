<template>
    <div class="slefInput">
      <!--输入框-->
      <el-form-item  :class="{labelStyle:labelStyle}" v-if="this.type==1" :label="labelName" :rules="{required:required}">
        <el-input @input="changeVal" v-model="modelVal" :disabled="disabled"></el-input>
      </el-form-item>
      <!--选择框-->
      <el-form-item  v-else-if="this.type==2" :class="{labelStyle:labelStyle}" :label="labelName" :rules="{required:required}">
        <el-select v-model="modelVal" filterable placeholder="请选择" @input="changeVal" :disabled="disabled">
          <el-option
            v-for="item in selectList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!--日期-->
      <el-form-item   v-else-if="this.type==3" :class="{labelStyle:labelStyle}" :label="labelName" :rules="{required:required}">
        <el-date-picker @input="changeVal" style="width: 180px;"
          v-model="modelVal"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          :disabled="disabled">
        </el-date-picker>
      </el-form-item>
      <!--备注-->
      <el-form-item  v-else-if="this.type==4" :disabled="disabled"  :label="labelName" :class="{labelStyle:labelStyle,remarks:true}" :rules="{required:required}" >
        <el-input
          rows="4"
          type="textarea"
          placeholder="请输入内容"
          v-model="modelVal"
          @input="changeVal">
        </el-input>
      </el-form-item>
      <!--金额-->
      <el-form-item v-else-if="this.type==5" :label="labelName" :class="{labelStyle:labelStyle,remarks:true,chineseMoney:true}" :rules="{required:required}">
        <el-input  v-model="modelVal" :disabled="disabled" @input="changeVal"></el-input>
        <el-input  v-model="chineseMoney" :title="chineseMoney" :disabled="true"></el-input>
      </el-form-item>
      <!--树形下拉选择-->
      <el-form-item v-else-if="this.type==6" :label="labelName" :rules="{required:required}">
        <treeselect
          v-model="modelVal"
          @select="changeVal"
          :multiple="false"
          placeholder="请选择..."
          :show-count="false"
          :options="selectList" />
      </el-form-item>

    </div>
</template>

<script>
    import Treeselect from '@riophae/vue-treeselect'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    export default {
      props:{
        type:{
          type:String,
          default:'1'
        },
        labelName:{
          type:String,
          default:''
        },
        keyName:{
          type:String,
          default:''
        },
        val:{
          default:''
        },
        required:{
          type:Boolean,
          default:false
        },
        selectList:{
          type:Array,
          default:function(){
            return [];
          }
        },
        disabled:{
          type:Boolean,
          default:false
        }

      },
      name: "self-input",
      data(){
        return {
           modelVal:'',
           labelStyle:false,
           isRequired:false,
           paddingSpace:0,
           showMoney:0,
           numMoney:0,
           chineseMoney:'零元'
        }
      },
      methods:{
        changeVal(val){
          if(this.type === '5'){
            let reg = /[0-9,'.']/;
            if(!reg.test(this.modelVal)) return;
            this.chineseMoney = this.toChinese(val);
          }else if(this.type === '6'){
            val = val.id;
          }

          this.$emit('changeFormVal',[this.keyName,val]);
        },
        toChinese(num){
          let chineseMoney = this.$Store.NumberToChinese(num);
          console.log(chineseMoney);
          return chineseMoney;
        }
      },
      components:{
        Treeselect
      },
      watch:{
        val:(newVal,oldVal)=>{
          this.modelVal = newVal;
        }
      },
      mounted(){
        this.modelVal = this.val ? this.val : null;
        if(this.labelName.length < 4){
          this.labelStyle = true;
        }
        if(this.type==='5') {
          this.chineseMoney = this.toChinese(this.val);
        }
      }
    }
</script>

<style>
  .chineseMoney .el-input{
    display: inline;
  }
  .chineseMoney .el-input .el-input__inner{
    width: 90px!important;
  }

</style>
