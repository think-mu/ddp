<template>
  <div class="stack-simple-chart">
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
    stackData: {
      type: Array
    },
  },
  data() {
    return {}
  },
  mounted() {},
  computed: {
    options() {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          // data: ['检查任务量', '完成百分比（%）'],
          // y: 'bottom'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.stackData.REGIONNAME
          }
        ],
        yAxis: [
          {
            type: 'value'
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
            name: '计划数',
            type: 'bar',
            barWidth: 15,
            data: this.stackData.PLANNUM,
            emphasis: {
              focus: 'series'
            },
            markLine: {
              lineStyle: {
                type: 'dashed'
              }
              // data: [[{ type: 'min' }, { type: 'max' }]]
            }
          },
          {
            name: '检查数',
            type: 'bar',
            barWidth: 10,
            stack: 'Search Engine',
            emphasis: {
              focus: 'series'
            },
            data: this.stackData.YJC
          },
          {
            name: '待复核检查数',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
              focus: 'series'
            },
            data: this.stackData.DFH
          },
          {
            name: '未检查数',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
              focus: 'series'
            },
            data: this.stackData.WJC
          },
          {
            name: '完成百分比（%）',
            type: 'line',
            data: this.stackData.WCBFB,
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
