<template>
  <div class="enforce">
        <el-row :gutter="20">
      <el-col :span="11">
        <s-card title="监督执法统计" class="map">
          <map-echart height="750px" :mapData="mapData" mapName="enforce"></map-echart>
        </s-card>
      </el-col>
      <el-col :span="13" class="content-right">
        <s-card
          title="药品违法案件情况"
          class="content-right-pie"
        >
        <template v-slot:select>
          <el-select v-model="value" @change="pieSelect">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
          <pie-echart
            style="padding-left: 20%;"
            height="325px"
            :pieData="pieAllData"
          ></pie-echart>
        </s-card>
        <s-card
          title="药品违法案件情况"
        >
        <template v-slot:select>
          <el-select v-model="valueBar" @change="barSelect">
            <el-option
              v-for="item in optionsBar"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
          <!-- <bar-echart
            height="280px"
            :xData="xData"
            :yData="yData"
            @barClick="barClick"
            v-show="!isShowIcon"
          ></bar-echart>-->
          <bar-echart
            height="325px"
            :xData="xData"
            :yData="yData"
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
import { mainInfo } from 'service/main/main'
import { levelData,convertData } from '@/utils/convert-data'

  export default {
    name: "",
    components: {
      SCard,
      PieEchart,
      BarEchart,
      MapEchart
    },
    data() {
      return {
        mapData: [],
        pieAllData: [],
        pieAreaData: [
          {value: 100, name: "番禺区"},
          {value: 100, name: "荔湾区"},
          {value: 100, name: "天河区"},
          {value: 100, name: "白云区"}
        ],
        pieTitle1: "监督执法",
        xData: [], //柱形图x轴数据
        xData1: [],
        yData: [], //柱形图y轴数据
        yData1: [],
        isShowIcon: false, //是否现实柱形图返回按钮
        mainData:[],
        options: [{
          value: 'LANUM',
          label: '立案数量'
        }, {
          value: 'CZNUM',
          label: '处置数量'
        }, {
          value: 'YSNUM',
          label: '移送数量'
        }],
        optionsBar: [{
          value: 'LANUM',
          label: '立案数量'
        }, {
          value: 'CZNUM',
          label: '处置数量'
        }, {
          value: 'YSNUM',
          label: '移送数量'
        }],
        value: '立案数量',
        valueBar: '立案数量'
      }
    },
    created() {
      this.getMapInfo()
      
      // this.getLevelInfo()
      // this.getPieAraeData("A")
    },
    mounted() {
      
    },
    methods: {
      /* 数据获取 start */
      //获取地图数据
      getMapInfo() {
        const data = {
          region: '',
          action: 'punish',
          year: 2021,
          type: 'T01',
          level: 1,
        }
        mainInfo(qs.stringify(data)).then((res) => {
          this.mapData = res.data.map((item) => {
            return {
              name: item.REGIONNAME,
              value: item
            }
          })
          this.mainData = res.data
          this.getPieInfo("LANUM")
          this.getBarInfo("LANUM")
          // console.log(this.mapData,"map")
        })
      },
      //获取饼图数量
      getPieInfo(val) {
        this.pieAllData = this.mainData.map((item)=> {
          return {
              name: item.REGIONNAME,
              value: item[val]
          }
        })
      },
      getBarInfo(val) {
        // console.log(val);
        this.xData = this.mainData.map((item)=> {
          return {
              value: item.REGIONNAME
          }
        })
        this.yData = this.mainData.map((item)=> {
          return {
              value: item[val]
          }
        })
      },


      /* 数据获取 end */
      /* 饼形图事件 start*/
      //全市分级饼形图--点击事件
      pieSelect(param) {
        console.log(param,"并行");
        this.getPieInfo(param)
        
      },
      /* 饼形图事件 end*/

      /* 柱形图事件 start*/
      barSelect(param) {
        this.getBarInfo(param)
        console.log(param, '柱形图')
      },
      changeShowIcon(val) {
        console.log(val)
        this.isShowIcon = val
      }
      /* 柱形图事件 end*/
      }
  }
</script>

<style scoped lang='less'>
.enforce {
  // height: 100%;
  .el-row,
  .el-col {
    height: 100% !important;
  }
  .content-right {
    height: 100%;
    display: flex;
    flex-direction: column;
    &-pie {
      margin-bottom: 15px;
    }
  }
}
</style>
