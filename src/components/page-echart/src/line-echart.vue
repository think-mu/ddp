<template>
  <div class="line-chart">
    <base-echart :options="options" :height="height" @pieClick="barClick"></base-echart>
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
    xLineData: {
      type: Array
    },
    LineData: {
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
          trigger: 'axis'
        },
        grid: {  
          bottom:'15%'  
        },  
        xAxis: {
          type: 'category',
          data: this.xLineData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.LineData,
            type: 'line',
            label: {
              show: true,
              color: '#000',
              fontSize: 14,
              position: "top",
            }
          }
        ]
      };
    }
  },
  methods: {
    barClick(param){
      this.$emit('barClick',param)
    }
  }
}
</script>

<style scoped lang="less"></style>
