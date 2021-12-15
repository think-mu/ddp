<template>
  <div class="chart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script>
import gzMap from '@/common/guangzhou.json'
import * as echarts from 'echarts'
export default {
  name: '',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    options: {
      type: Object
    }
  },
  data() {
    return {}
  },
  mounted() {
    this.draw()
  },
  methods: {
    draw() {
      
      // console.log(this.options,"options");
      const echartDivRef = this.$refs.echartDivRef
      echarts.registerMap('gz', gzMap)
      const echartInstance = echarts.init(echartDivRef)
      echartInstance.setOption(this.options,true)
      window.addEventListener('resize', () => {
        echartInstance.resize()
      })
    }
  },
  watch: {
    options: { 
      deep:true,
      handler(newVal, oldVal) {
        this.draw()
      }
    }
  },
}
</script>

<style scoped></style>
