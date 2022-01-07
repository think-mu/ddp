<template>
  <div class="map-chart">
    <base-echart
      :options="options"
      :height="height"
      :width="width"
    ></base-echart>
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
    },
    mapName: {
      type: String
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
        geo: {
          tooltip: {
            show: false
          },
          label: {
            show: false
          },
          select: {
            label: {
              show: false
            }
          },
          map: 'gz',
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
          
          aspectScale: 1,
          layoutCenter: ['50%', '52.5%'], //地图位置
          layoutSize: '90%',
          emphasis: {
            label: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              shadowColor: 'rgba(0,228,242,0.5)',
              shadowBlur: 2,
              // color: 'rgba(21,190,245,.6)',
              color: 'rgba(19,106,182,.9)'
              // shadowOffsetX: 10,
              // shadowOffsetY: 11
            },
            emphasis: {
              areaColor: 'rgba(21,190,245,.6)'
            }
          },
          z: 2
        },

        tooltip: {
          show: true,
          trigger: 'item',
          formatter: function (params) {
            console.log(params, 'params')
            if (params.seriesName == 'detail') {
              return params.name + ' : ' + params.data.value[0] + '家'
            } else if (params.seriesName == 'category') {
              return (
                params.name +
                '</br>' +
                'A级:' +
                params.data.value[0].A +
                '</br>' +
                'B级:' +
                params.data.value[0].B +
                '</br>' +
                'C级:' +
                params.data.value[0].C +
                '</br>' +
                'D级:' +
                params.data.value[0].D +
                '</br>' +
                '未评级:' +
                params.data.value[0]['未评级']
              )
            } else if (params.seriesName == 'review') {
              // console.log(params,"review");
              return (
                params.name +
                '</br>' +
                '出动人次:' +
                params.data.value[0].CDRC +
                '</br>' +
                '需整改数量:' +
                params.data.value[0].XYZG +
                '</br>' +
                '已整改数量:' +
                params.data.value[0].YZGCNUM +
                '</br>' +
                '检查数量:' +
                params.data.value[0].CHECKNUM +
                '</br>' +
                '检查覆盖率:' +
                params.data.value[0].FGL
              )
            } else if (params.seriesName == 'review1') {
              return (
                params.name +
                '</br>' +
                '计划数:' +
                params.data.value[0].PLANNUM +
                '</br>' +
                '检查数:' +
                params.data.value[0].YJC +
                '</br>' +
                '待复核检查数:' +
                params.data.value[0].DFH +
                '</br>' +
                '未检查数:' +
                params.data.value[0].WJC +
                '</br>' +
                '符合数:' +
                params.data.value[0].FH +
                '</br>' +
                '限期整改:' +
                params.data.value[0].XQZG +
                '</br>' +
                '复核检查数:' +
                params.data.value[0].FHJC +
                '</br>' +
                '严重违反:' +
                params.data.value[0].YZWF +
                '</br>' +
                '停业:' +
                params.data.value[0].TY +
                '</br>' +
                '完成百分比:' +
                params.data.value[0].WCBFB
              )
            } else if (params.seriesName == 'enforce') {
              // console.log(params);
              return (
                params.name +
                '</br>' +
                '处置数:' +
                params.data.value[0].CZNUM +
                '</br>' +
                '立案数:' +
                params.data.value[0].LANUM +
                '</br>' +
                '移送数:' +
                params.data.value[0].YSNUM
              )
            }
          }
        },

        series: [
          {
            zlevel: 2,
            symbolSize: 5,
            geoIndex: 0,
            label: {
              normal: {
                formatter: '{b}',
                position: 'left',
                show: true,
                color: '#fff'
              },
              emphasis: {
                show: true
              }
            },

            itemStyle: {
              normal: {
                color: '#fff',

              }
            },
            name: this.mapName,
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(this.mapData)
          },
          {
            type: 'map',
            roam: false,
            map: 'gz',
            center: [113.505367, 23.22559],
            aspectScale: 1,
            zoom: 1.1,
            selectedMode: false,
            data: convertData(this.mapData),
            showLegendSymbol: true,
            name: this.mapName,
            zlevel: 2,
            label: {
              show: true,
              color: '#fff',
              fontSize: 14,
              // formatter: '{b}: {@value.data[2]}',
              formatter: function (params) {
                // console.log(params);
                if (params.seriesName == 'detail') {
                  return params.data.value[0] + '家' + '\n' + params.name
                } else if (params.seriesName == 'category') {
                  return params.name
                } else if (params.seriesName == 'review') {
                  // console.log(params,"review2");
                  // return params.name
                }
              }
            },
            //   itemStyle: {
            //     normal: {
            //       areaColor: '#031525',
            //       borderColor: '#FFFFFF'
            //     },
            //     emphasis: {
            //       areaColor: '#2B91B7'
            //     }
            //   },

            itemStyle: {
              normal: {
                areaColor: 'rgba(19,106,182,.9)',
                borderColor: '#fff', //线
                // shadowColor: '#B1DEF6', //外发光
                // shadowBlur: 10,

              },
              emphasis: {
                label: {
                  color: '#fff'
                },
                areaColor: '#177AD1' //悬浮区背景
              }
            },
            
          }
          /* {
            name: this.mapName,
            type: 'map',
            map: 'gz',
            geoIndex: 0,
            data: convertData(this.mapData)
          }, */
        ]
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
