<template>
  <div class="map-chart">
    <base-echart :options="options" :height="height"></base-echart>
  </div>
</template>

<script>
import BaseEchart from '@/base-ui/echart/base-echart'
import { convertData } from '@/utils/convert-data'
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
    mapData: {
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
        grid: {
          left: '0%',
          top: '10%',
          right: '0%',
          bottom: '4%',
          containLabel: true
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return params.name + ' : ' + params.data.value[2]
          }
        },
        series: [
          {
            type: 'map',
            roam: false,
            map: 'gz',
            center: [113.465367, 23.28559],
            aspectScale: 1,
            zoom: 1.2,
            data: convertData(this.mapData),
            showLegendSymbol: true,

            label: {
              show: true,
              color: '#fff',
              fontSize: 10
            },
            itemStyle: {
              areaColor: '#0E4287',
              borderColor: '#0378DA'
            },

            emphasis: {
              label: {
                color: '#000'
              }
            }
          }
        ]
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
