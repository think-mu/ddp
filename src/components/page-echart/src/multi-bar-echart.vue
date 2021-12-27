<template>
  <div class="bar-chart">
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
    xData: {
      type: Array
    },
    yData: {
      type: Array
    },
    source: {
      type: Array
    },
    dimensions: {
      type: Array
    }
  },
  data() {
    return {
      optionLabel: {
        show: true,
        color: '#000',
        fontSize: 14,
        position: "top",
        formatter: function (params) {
          // console.log(params,"000");
          // return params.value
        }
      },
    }
  },
  mounted() {},
  computed: {
    options() {
      
      return {
        legend: {},
        tooltip: {},
        grid: {  
          bottom:'20%'  
        },  
        dataset: {
          dimensions: this.dimensions,
          source: this.source
        },
        xAxis: { 
          type: 'category' ,
          axisLabel: {  
            interval:0,  
            rotate:30  
          }  
        },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar',label: this.optionLabel }, { type: 'bar',label: this.optionLabel }, { type: 'bar',label: this.optionLabel }]
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
