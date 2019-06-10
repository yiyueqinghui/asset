<template>
    <div id="assetHome">
       <el-row>
         <el-button type="primary" @click="setting">自定义设置</el-button>
       </el-row>
      <el-row class="cardList">
        <el-col class="card" v-for="item in data">
          <el-card class="box-card" shadow="hover">
            <p class="title">{{item.title}}</p>
            <table>
              <tr class="item">
                <td>
                  <i class="icon01 icon"></i> 闲置 <b>{{item.aside}}</b>
                </td>
              </tr>
              <tr class="item">
                <td>
                  <i class="icon02 icon"></i> 在用 <b>{{item.used}}</b>
                </td>
              </tr>
              <tr class="item">
                <td>
                  <i class="icon03 icon"></i> 借出 <b>{{item.borrow}}</b>
                </td>
              </tr>
              <tr class="item">
                <td>
                  <i class="icon04 icon"></i> 调拨 <b>{{item.allot}}</b>
                </td>
              </tr>
            </table>
          </el-card>
        </el-col>
      </el-row>
      <el-dialog
        :close-on-click-modal="false" :close-on-press-escape="false"
        title="自定义设置面板"
        :visible.sync="dialogVisible"
        width="960px"
        top="80px">
        <el-row style="overflow: hidden;">
          <el-col :span="12">
            <el-button type="primary">当前面板展示</el-button>
            <el-button type="primary" @click="addCategory">添加分类</el-button>
          </el-col>
          <el-col :span="12" style="width: 200px;float: right;">
            <el-input v-model="searchVal"  suffix-icon="el-icon-search" @blur="search"  placeholder="请输入内容进行查寻"/>
          </el-col>
        </el-row>
        <el-row class="tabList">
          <el-tag
            v-for="(item,index) in currentTags"
            :key="item.label"
            effect="dark"
            type=""
            closable
            @close="closeTag(index,item.id)"
          >
            {{ item.label }}
          </el-tag>
        </el-row>
        <el-row v-for="(item,index) in tags" :key="index" class="tabList" v-show="item.list.length>0">
          <el-button type="primary">{{item.category}}</el-button>
          <el-row>
            <el-tag
              v-for="(tag,tagIndex) in item.list"
              :key="tagIndex"
              effect="dark"
              :type="tag.type"
              @click="addTag(tag,tagIndex,index)"
            >
              {{ tag.label }}
            </el-tag>
          </el-row>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
      </el-dialog>


      <el-dialog
        :close-on-click-modal="false" :close-on-press-escape="false"
        title="添加分类"
        :visible.sync="categoryVisible"
        width="960px"
        top="80px">
        <el-form :inline="true" v-if="categoryVisible" :model="cateData"  label-width="auto"  class="demo-form-inline self-input border">
          <el-row>
            <el-col :sm="8">
              <SelfInput v-if="categoryVisible" :selectList="cateList" type="2" labelName="大类"   keyName="cate" :val="cateData.cate" @changeFormVal="changeForm"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <SelfInput v-if="categoryVisible" labelName="详情"   keyName="miniCate" :val="cateData.miniCate" @changeFormVal="changeForm"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <el-button type="primary" @click="addBigCate">新增大类</el-button>
            </el-col>
          </el-row>
          <el-row v-if="bigCateVisible">
            <el-col :sm="8">
              <SelfInput labelName="大类"   keyName="cate" :val="cateData.cate" @changeFormVal="changeForm"></SelfInput>
            </el-col>
            <el-col :sm="8">
              <el-button type="primary" @click="addCateBtn">新增</el-button>
            </el-col>
          </el-row>
        </el-form>


        <div slot="footer" class="dialog-footer">
          <el-button @click="categoryVisible = false">取 消</el-button>
          <el-button type="primary" @click="categoryConfirm">确 定</el-button>
        </div>
      </el-dialog>

    </div>
</template>

<script>
    import SelfInput from '../../components/common/selfInput'
    export default {
      data(){
        return {
          data:[
            {
              title:'笔记本',
              aside:6,
              used:10,
              borrow:23,
              allot:9
            },
            {
              title:'笔记本',
              aside:6,
              used:10,
              borrow:23,
              allot:9
            },
            {
              title:'笔记本',
              aside:6,
              used:10,
              borrow:23,
              allot:9
            },
            {
              title:'笔记本',
              aside:6,
              used:10,
              borrow:23,
              allot:9
            },
            {
              title:'笔记本',
              aside:6,
              used:10,
              borrow:23,
              allot:9
            }
          ],
          dialogVisible:false,
          searchVal:'',
          currentTags: [],
          currentTagsId:[],
          tags:[
            {
              category:'电子产品类',
              list:[
                { label: '电子一',id:1 ,type:'success'},
                { label: '电子二',id:2 ,type:'success'},
                { label: '电子三',id:3 ,type:'success'}
              ]
            },
            {
              category:'家具类',
              list:[
                { label: '家具一',id:4 ,type:'success'},
                { label: '家具二',id:5 ,type:'success'},
                { label: '家具三',id:6 ,type:'success'},
                { label: '家具四',id:7 ,type:'success'},
                { label: '家具五' ,id:8,type:'success'}
              ]
            }
          ],
          categoryVisible:false,
          cateData:{
            cate:'',
            miniCate:''
          },
          cateList:[
            {
              value:'电子类一'
            },
            {
              value:'电子类二'
            },
            {
              value:'电子类三'
            }
          ],
          bigCateVisible:false
        }
      },
      methods:{
        setting(){
          this.dialogVisible = true;
        },
        confirm(){
          this.dialogVisible = false;
        },
        search(){

        },
        closeTag(index,id){
          this.currentTags.splice(index,1);
          this.tags.forEach((item,index)=>{
            item.list.forEach((tag,tagId)=>{
              if(tag.id === id){
                let newTag = Object.assign({},tag);
                newTag.type = 'success';
                this.tags[index].list.splice(tagId,1,newTag);
              }
            })
          })
        },
        addTag(tag,tagIndex,index){
          if(tag.type === 'info') return;
          tag.type = 'info';
          this.currentTags.push({
            label:tag.label,
            id:tag.id
          });
        },
        addCategory(){
          this.categoryVisible = true;
        },
        categoryConfirm(){
          this.categoryVisible = false;
        },
        changeForm([key,val]){
          this.cateData[key] = val;
        },
        addBigCate(){
          this.bigCateVisible = true;
        },
        addCateBtn(){
          this.bigCateVisible = false;
        }
      },
      watch:{
        currentTags:{
          handler:function(val,oldval){
            this.currentTagsId = [];
            val.forEach(item=>{
              this.currentTagsId.push(item.id);
            })
            console.log(this.currentTagsId)
          },
          deep:true
        }

      },
      components:{
        SelfInput
      },
      mounted(){


      }
    }
</script>

<style>
  .cardList{
    margin-top: 20px;
  }
  .cardList .card{
    width:180px;
    margin-right: 40px;
    margin-bottom: 30px;
  }
  .box-card .item{
    width: 100%;
  }
  .box-card .item b{
    padding-left: 20px;
    color: #ffffff;
  }
  .box-card .icon{
    display: inline-block;
    width: 10px;
    height: 10px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    margin-right: 10px;
  }
  .box-card .icon01{
    background-color:rgb(0,153,51);
  }
  .box-card .icon02{
    background-color:rgb(255,204,102);
  }
  .box-card .icon03{
    background-color:rgb(255,153,204);
  }
  .box-card .icon04{
    background-color:rgb(0,102,255);
  }
  .box-card .title{
    margin-bottom: 10px;
    font-weight: 600;
    color: #ffffff;
  }
  .el-card{
    background-color: #05b9ff !important;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
  }

  .tabList{
    margin-bottom: 30px;
  }
  .tabList .el-tag{
    margin:10px 10px 10px 0;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .buttonNewtag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .inputNewTag {
    width: 90px;
    margin-left: 10px;
  }
</style>
