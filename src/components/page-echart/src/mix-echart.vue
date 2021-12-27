<template>
  <div class="line-chart">
    <base-echart
      :options="options"
      :height="height"
      @pieClick="barClick"
    ></base-echart>
  </div>
</template>

<script>
import BaseEchart from '@/base-ui/echart/base-echart'
export default {
  name: '',
  components: {
    BaseEchart
  },
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    mixXdata: {
      type: Array
    },
    mixLineData: {
      type: Array
    },
    mixBarData: {
      type: Array
    }
  },
  data() {
    return {}
  },
  mounted() {},
  computed: {
    options() {
      return {
        color: ['#B2D233', '#29C3F8'],
        // title: {
        //   text: '2012-2018年中国B2B电子商务市场交易规模',
        //   left: 'center'
        // },
        tooltip: {
          trigger: 'axis',
          // axisPointer: {
          //     type: 'cross',
          //     label: {
          //         backgroundColor: '#283b56'
          //     }
          // }
        },
        legend: {
          data: ['检查任务量', '完成百分比（%）'],
          y: 'bottom'
        },
        xAxis: {
          type: 'category',

          data: this.mixXdata,
          axisTick: {
            show: false
          },
          axisLabel: {  
            interval:0,  
            rotate:30  
          }  
        },
        yAxis: [
          {
            type: 'value',
            show: true,
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            }
          },
          {
            show: false,
            type: 'value',
            name: '增长率',
            min: -150,
            max: 100,
            interval: 20
          }
        ],
        series: [
          {
            data: this.mixBarData,
            type: 'bar',
            name: '检查任务量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            }
          },
          {
            name: '完成百分比（%）',
            type: 'line',
            data: this.mixLineData,
            yAxisIndex: 1,
            symbol: 'circle',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'top',
                  formatter: '{c}%'
                }
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    barClick(param) {
      this.$emit('barClick', param)
    }
  }
}
</script>

<style scoped lang="less"></style>
