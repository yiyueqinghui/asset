<template>
    <div id="circleId" :style="{width:width,height:height}" ref="circlePie">

    </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    props:{
      width: {
        type: String,
        default: 'auto'
      },
      height: {
        type: String,
        default: '500px'
      }
    },
    data(){
      return{
        chart:null
      }
    },
    methods:{
      init(){
        this.chart = echarts.init(this.$refs.circlePie);
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            right:0,
            top:'middle',
            data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
          },
          series: [
            {
              name:'访问来源',
              type:'pie',
              center: ['40%', '50%'],
              radius: ['30%', '55%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '18',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
              ]
            }
          ]
        };
        this.chart.setOption(option);

      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.init();
      })
    }

  }
</script>

<style scoped>
   #circleId{
     display: inline-block;
     text-align: center;
   }
</style>
