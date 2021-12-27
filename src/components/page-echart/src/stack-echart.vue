<template>
  <div class="stack-chart">
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
        legend: {},
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
          }
        ],
        series: [
          // {
          //   name: 'Search Engine',
          //   type: 'bar',
          //   barWidth: 20,
          //   data: [862, 1018, 964, 1026, 1679, 1600, 1570],
          //   emphasis: {
          //     focus: 'series'
          //   },
          //   markLine: {
          //     lineStyle: {
          //       type: 'dashed'
          //     }
          //     // data: [[{ type: 'min' }, { type: 'max' }]]
          //   }
          // },
          {
            name: '符合',
            type: 'bar',
            barWidth: 20,
            stack: 'Search Engine',
            emphasis: {
              focus: 'series'
            },
            data: this.stackData.FH
          },
          {
            name: '限期整改',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
              focus: 'series'
            },
            data: this.stackData.XQZG
          },
          {
            name: '复核检查',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
              focus: 'series'
            },
            data: this.stackData.FHJC
          },
          {
            name: '严重违反',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
              focus: 'series'
            },
            data: this.stackData.YZWF
          },
          {
            name: '停业',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
              focus: 'series'
            },
            data: this.stackData.TY
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
