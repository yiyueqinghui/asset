<template>
    <div id="pie" :style="{width:width,height:height}" ref="myPie">

    </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: "pie",
    props: {
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
      return {
        chart:null
      }
    },
    methods:{
      initPie(){
        this.chart = echarts.init(this.$refs.myPie);
        let option = {
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            top:'middle',
            right:0,
            orient:'vertical',
            data: ['西凉', '益州','兖州','荆州','幽州']
          },
          series : [
            {
              type: 'pie',
              radius : '55%',
              center: ['40%', '50%'],
              right:'10%',
              selectedMode: 'single',
              data:[
                { value:1548, name: '幽州'},
                {value:535, name: '荆州'},
                {value:510, name: '兖州'},
                {value:634, name: '益州'},
                {value:735, name: '西凉'}
              ],
              label:{
                show:false,
                position:'inside'
              },
              labelLine:{
                show:false
              },
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };

        this.chart.setOption(option);

      },
      genData(count) {
          var nameList = [
            '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危'
          ];
          var legendData = [];
          var seriesData = [];
          var selected = {};
          for (var i = 0; i < 50; i++) {
            name = Math.random() > 0.65
              ? makeWord(4, 1) + '·' + makeWord(3, 0)
              : makeWord(2, 1);
            legendData.push(name);
            seriesData.push({
              name: name,
              value: Math.round(Math.random() * 100000)
            });
            selected[name] = i < 6;
          }

          return {
            legendData: legendData,
            seriesData: seriesData,
            selected: selected
          };

          function makeWord(max, min) {
            var nameLen = Math.ceil(Math.random() * max + min);
            var name = [];
            for (var i = 0; i < nameLen; i++) {
              name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
            }
            return name.join('');
          }
        }
    },
    mounted(){
      this.initPie();
    }
  }
</script>

<style scoped>
  #pie{
    display:inline-block;
  }
</style>
