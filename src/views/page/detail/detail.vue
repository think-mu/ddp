<template>
  <div class="detail">
    <el-row :gutter="20">
      <el-col :span="12">
        <s-card title="药品企业数量">
          <map-echart height="615px" :mapData="mapData"></map-echart>
        </s-card>
      </el-col>
      <el-col :span="12" class="content-right">
        <s-card title="各类型药品企业数量">
          <pie-echart height="240px" :pieData="pieData"></pie-echart>
        </s-card>
        <s-card title="各类型药品企业数量">
          <bar-echart height="280px" :xData="xData" :yData="yData"></bar-echart>
        </s-card>
        <!--         <div class="content-right-chart"></div>
        <div class="content-right-chart"></div> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import qs from 'qs'
import SCard from '@/base-ui/card/card'
import PieEchart from '@/components/page-echart/src/pie-echart'
import BarEchart from '@/components/page-echart/src/bar-echart'
import MapEchart from '@/components/page-echart/src/map-echart'
import { mapInfo } from 'service/main/detail/detail'

export default {
  name: '',
  components: {
    SCard,
    PieEchart,
    BarEchart,
    MapEchart
  },
  data() {
    return {
      option: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      },
      pieData: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' }
      ],
      xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      yData: [10, 52, 200, 334, 390, 330, 220],
      mapData: []
    }
  },
  created() {
    this.getMapData()
  },
  mounted() {},
  methods: {
    //获取地图数据
    getMapData() {
      const data = {
        region: '',
        level: 1,
        action: 'companyInfo',
        type: 'T01'
      }
      mapInfo(qs.stringify(data)).then((res) => {
        this.mapData = res.data.map((item) => {
          return {
            name: item.REGION,
            value: item.NUM
          }
        })
        console.log(rdata,"rdata");
      })
    },
    reData() {
      this.pieData[0].value += 200
    }
  }
}
</script>

<style scoped lang="less">
.detail {
  // height: 100%;
  .el-row,
  .el-col {
    height: 100% !important;
  }
}
.content-right {
  height: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  .el-card:last-child {
    margin-top: 15px;
  }
}
</style>
