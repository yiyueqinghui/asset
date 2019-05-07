<template>
  <div id="charts">
    <el-row :gutter="20">
      <el-col :lg="8" :md="12" :sm="24" class="center">
        <div class="bg">
          <chart-bar width="300px" height="300px"></chart-bar>
        </div>
      </el-col>
      <el-col :lg="8" :md="12" :sm="24" class="center">
        <div class="bg">
          <chart-pie width="300px" height="300px"></chart-pie>
        </div>
      </el-col>
      <el-col :lg="8" :md="12" :sm="24" class="center">
        <div class="bg">
           <chart-circle width="300px" height="300px"></chart-circle>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import chartBar from '../../components/bar'
  import chartPie from '../../components/pie'
  import chartCircle from '../../components/circlePie'
  export default {
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {

    },
    components:{
      chartBar,
      chartPie,
      chartCircle
    }

  }
</script>
<style lang="less">
  #charts{
    .center{
      text-align: center;
      margin-bottom: 20px;
      .bg{
        background: #ffffff;
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 20px;
      }
    }
  }

</style>
