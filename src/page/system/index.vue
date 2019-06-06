<template>
    <div id="home">
       <div class="echartZone" ref="myEchart"></div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
      data(){
        return {
          companyNum:38,
          departNum:101,
          employeeNum:666,
          roleNum:6,
          adminNum:3

        }
      },
      methods:{
        initChart() {
          this.chart = echarts.init(this.$refs.myEchart);

          let option = {
            calculable : false,
            series : [
              {
                type: 'tree',
                lineStyle: {
                  color: '#000000',
                  width: 1,
                  curveness: 0.5,
                  type: 'solid' // 'curve'|'broken'|'solid'|'dotted'|'dashed'
                },
                expandAndCollapse:false,
                orient: 'vertical',  // vertical horizontal
                rootLocation: {x: 100, y: '60%'}, // 根节点位置  {x: 'center',y: 10}
                nodePadding: 20,
                symbolSize: 40,
                itemStyle:{
                  color:'#ff6e7d',
                  borderColor:'#ff6e7d'
                },
                label:{
                  color:'#ffffff',
                  fontSize:16,
                  lineHeight:25
                },
                data: [
                  {
                    symbolSize: [70, 50],
                    symbol: 'image://../../static/img/topOrg.jpg',
                    children: [
                      {
                        // name: '组织',
                        symbol: 'image://../../static/img/org.png',
                        symbolSize: [50, 35],
                        children: [
                          {
                            name: this.companyNum+"\n公司",
                            symbol: 'rect',
                            symbolSize: [70,50],


                          },
                          {
                            name: this.departNum+'\n部门',
                            symbol: 'rect',
                            symbolSize: [70,50]
                          },
                          {
                            name: this.employeeNum+'\n人员',
                            symbol: 'rect',
                            symbolSize: [70,50]
                          }
                        ]
                      },
                      {
                        // name: '权限',
                        symbol: 'image://../../static/img/key.png',
                        symbolSize: [50, 35],
                        children: [
                          {
                            name: this.roleNum+'\n角色组',
                            symbol: 'rect',
                            symbolSize: [70,50],
                            itemStyle:{
                              color:'#209eff',
                              borderColor:'#209eff'
                            },
                          },
                          {
                            name: this.adminNum+'\n管理员',
                            symbol: 'rect',
                            symbolSize: [70,50],
                            itemStyle:{
                              color:'#209eff',
                              borderColor:'#209eff'
                            },
                          }
                        ]
                      }
                    ]
                  }
                ]
              }]
          };
          // 把配置和数据放这里
          this.chart.setOption(option);
        }
      },
      mounted(){
        this.$nextTick(()=>{
          this.initChart();
        })
      }
    }
</script>

<style scoped>
  .echartZone{
    width: 100%;
    height:500px;
  }

</style>
