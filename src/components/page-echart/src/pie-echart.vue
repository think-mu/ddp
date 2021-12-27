<template>
  <div class="pie-chart">
    <base-echart :options="options" :height="height" :width="width" @pieClick="pieClick"></base-echart>
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
    pieData: {
      type: Array
    },
    pieTitle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  mounted(){
  },
  computed: {
    options() {
      return {
        tooltip: {
          trigger: 'item'
        },
        // legend: {
        //   orient: 'horizontal',
        //   left: 'left'
        // },
        title: {
          text: this.pieTitle,
          // subtext: 'Fake Data',
          bottom: '0%',
          left: "center",
          textStyle: {
            color: '#434343',
            fontSize: 18,
            fontWeight: 'normal'
          }
        },
        series: [
          {
            name: '分类数据',
            label: {
              position: 'outer',
              alignTo: 'labelLine',  // 'labelLine'：label line 的末端对齐，其中最短的长度由 labelLine.length2 决定
              formatter:function (params) {
                  return params.name  + '-' +params.value+ '家'
                
              }
                      // 仅当 label.position 为 'outer' 并且 label.alignTo 为 'none' 或 'labelLine' 的情况有效
            },
            type: 'pie',
            radius: '50%',
            data: this.pieData,
            center: ["50%", "40%"], 　
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ] 
      }
    }
  },
  methods: {
    pieClick(param){
      this.$emit('pieClick',param)
    }
  }
}
</script>

<style scoped lang="less">
.pie-chart {
  width: 50%;
}
</style>
