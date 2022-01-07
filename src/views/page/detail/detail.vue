<template>
  <div class="detail">
    <el-row :gutter="20">
      <el-col :span="11">
        <s-card title="药品企业数量" class="map">
          <div class="map-total">
            <div class="map-total-hd">
              <ul>
                <li><span>{{ totalData.FZS }}</span><span>许可证发证数</span></li>
                <li><span>{{ totalData.GQS }}</span><span>许可证过期数</span></li>
              </ul>
            </div>
          </div>
          <map-echart height="750px" :mapData="mapData" mapName="detail"></map-echart>
        </s-card>
      </el-col>
      <el-col :span="13" class="content-right">
        <s-card
          title="各类型药品企业数量"
          class="content-right-pie"
          flex="flex"
        >
          <pie-echart
            height="325px"
            :pieData="pieAllData"
            :pieTitle="pieTitle1"
            @pieClick="pieClick"
          ></pie-echart>
          <pie-echart
            height="325px"
            :pieData="pieAreaData"
            :pieTitle="pieTitle2"
          ></pie-echart>
        </s-card>
        <s-card
          title="各类型药品企业数量"
          :isShowIcon="isShowIcon"
          @changeShowIcon="changeShowIcon"
        >
          <bar-echart
            height="325px"
            :xData="xData"
            :yData="yData"
            @barClick="barClick"
            v-show="!isShowIcon"
          ></bar-echart>
          <bar-echart
            height="325px"
            :xData="xData1"
            :yData="yData1"
            v-if="isShowIcon"
          ></bar-echart>
        </s-card>
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
import { entInfo, dataTotal } from 'service/main/detail/detail'

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
      pieAllData: [], //饼图数据
      pieAreaData: [
        {value: 100, name: "番禺区"},
        {value: 100, name: "荔湾区"},
        {value: 100, name: "天河区"},
        {value: 100, name: "白云区"}],
      pieTitle1: '各类型药品企业数量', //各类型药品企业数量饼图title
      pieTitle2: '药品生产企业数量',
      xData: [], //柱形图x轴数据
      xData1: [],
      yData: [], //柱形图y轴数据
      yData1: [],
      mapData: [], //地图数据
      isShowIcon: false, //是否现实柱形图返回按钮
      totalData: [] //今日统计数据
    }
  },
  created() {
    //获取图表数据
    this.getMapData()
    this.getPieAllData()
    this.getPieAraeData('药品生产企业')
    this.getTotalData()
  },
  mounted() {},
  methods: {
    /* 数据获取 start */
    //获取今天统计数据
    getTotalData() {
      const data = {
        region: '',
        action: 'today',
        type: 'T01',
        model: 2
      }
      dataTotal(qs.stringify(data)).then((res) => {
        this.totalData = res.data[0]
        // console.log(res.data)
      })
    },
    //获取地图数据
    getMapData() {
      const data = {
        region: '',
        level: 1,
        action: 'companyInfo',
        type: 'T01',
        classname: ''
      }
      entInfo(qs.stringify(data)).then((res) => {
        this.mapData = res.data.map((item) => {
          return {
            name: item.REGION,
            value: item.NUM
          }
        })
      })
    },
    //获取全市各类型企业数量
    getPieAllData() {
      const data = {
        region: '',
        level: 2,
        action: 'companyInfo',
        type: 'T01',
        classname: ''
      }
      entInfo(qs.stringify(data)).then((res) => {
        //更新饼图全市各类型企业数量
        this.pieAllData = res.data.map((item) => {
          return {
            name: item.COMPANY_TYPE,
            value: item.NUM
          }
        })
        //更新柱形图x轴值
        this.xData = res.data.map((item) => {
          return {
            value: item.COMPANY_TYPE
          }
        })
        //更新柱形图y轴值
        this.yData = res.data.map((item) => {
          return {
            value: item.NUM
          }
        })
      })
    },
    //根据企业类型获取各区数量
    getPieAraeData(area) {
      const data = {
        region: '',
        level: 3,
        action: 'companyInfo',
        type: 'T01',
        classname: area
      }
      entInfo(qs.stringify(data)).then((res) => {
        this.pieAreaData = res.data.map((item) => {
          return {
            name: item.REGION,
            value: item.NUM
          }
        })
      })
    },

    getBarAraeData(area) {
      const data = {
        region: '',
        level: 3,
        action: 'companyInfo',
        type: 'T01',
        classname: area
      }
      entInfo(qs.stringify(data)).then((res) => {
        //更新柱形图x轴值
        this.xData1 = res.data.map((item) => {
          return {
            value: item.REGION
          }
        })
        //更新柱形图y轴值
        this.yData1 = res.data.map((item) => {
          return {
            value: item.NUM
          }
        })
      })
    },
    /* 数据获取 end */

    /* 饼图事件 start*/
    pieClick(param) {
      this.getPieAraeData(param.name)
      this.pieTitle2 = param.name + '数量'
    },
    /* 饼图事件 end*/

    /* 柱形图事件 start*/
    barClick(param) {
      this.getBarAraeData(param.name)
      this.isShowIcon = true
      // console.log(param, '柱形图')
    },
    changeShowIcon(val) {
      // console.log(val)
      this.isShowIcon = val
    }
    /* 柱形图事件 end*/
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
  .map {
    position: relative;
    .map-content {
      position: absolute;
      bottom: 30px;
      left: 20px;
      height: 200px;
      width: 200px;
      display: flex;
      align-items: center;
      flex-direction: column;
      .map1 {
        position: relative;
       
      }
      .point {
        position:absolute;
        top: 2px;
        left: -24px;
        margin-right: 10px;
        height: 16px;
        width: 16px;
        background: rgb(34, 141, 202);
      }
      // border: 1px rgb(26, 205, 218) solid;
    }
    .map-total {
      position: absolute;
      top: 70px;
      left: 0px;
      // height: 100px;
      
      
      &-hd {
        ul {
          display: flex;
          width: 260px;
          li {
            flex: 1;
            list-style-type: none;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            text-align: center;
            height: 113px;
            background: url('../../../assets/img/total-icon.png') no-repeat center top;
          }
          span:first-child {
            font-family: 'electronicFont';
            line-height: 40px;
            font-size: 40px;
            margin-top: 10px;
            // color: #faa60b;
            background-image:-webkit-linear-gradient(bottom,#FF7200,#FFEE30);
            -webkit-background-clip:text;
            -webkit-text-fill-color:transparent;
          }
          span:last-child {
            font-family: 'electronicFont';
            line-height: 18px;
            font-size: 18px;
            color: #e5f0f1;
            text-shadow:2px 2px 8px #aaf2ff;
            margin-top: 30px;
          }
          
        }
      }
    }
  }
}

.content-right {
  height: 100%;
  display: flex;
  flex-direction: column;
  &-pie {
    margin-bottom: 15px;
  }

}
</style>
