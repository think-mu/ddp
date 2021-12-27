<template>
  <div class="review">
    <el-row :gutter="20">
      
        <!-- <s-card title="tie" class="map"></s-card> -->
     
      <el-col :span="14">
        <div class="board">
          <div class="board-btn">
            <!-- <el-button round v-for="(item,index) in btnName" :key="index">{{item}}</el-button> -->
          <el-radio-group v-model="radio" @change="selectItem">
            <!-- <el-button round v-for="(item,index) in btnName" :key="index">{{item}}</el-button> -->
            <el-radio-button v-for="(item,index) in btnName" :label="item"></el-radio-button>
          </el-radio-group>
          </div>
          <div class="board-data">
            <div class="board-data-item" v-for="(item,index) in totalData" :key="index">
              <i :class="item.icon"></i>
              <div class="board-data-item-content">
                <span>{{item.name}}</span>
                <span>{{item.num}}</span>
              </div>
            </div>
          </div>
        </div>
        <s-card title="监督检查" class="map">
          <map-echart
            height="475px"
            width='60%'
            :mapData="mapData"
            :mapName="mapItem"
          ></map-echart>
        </s-card>
      </el-col>
      <el-col :span="10" class="content-right">
        <s-card title="监督检查" >
          <line-echart
            height="240px"
            :xLineData="xLineData"
            :LineData="LineData"
            @pieClick="pieClick"
            v-if="isShowFri"
          ></line-echart>
          <mix-echart
            height="240px"
            @pieClick="pieClick"
            :mixXdata='mixXdata'
            :mixLineData='mixLineData'
            :mixBarData='mixBarData'
            v-if="isShowSec"
          ></mix-echart>
          <stack-echart
            height="240px"
            @pieClick="pieClick"
            :stackData = 'stackData'
            v-if="isShowThi"
          ></stack-echart>
        </s-card>
        <s-card
          title="监督检查"
          :isShowIcon="isShowIcon"
          @changeShowIcon="changeShowIcon"
        >
          <!-- <bar-echart
            height="280px"
            :xData="xData"
            :yData="yData"
            @barClick="barClick"
            v-show="!isShowIcon"
          ></bar-echart> -->
          <multi-bar-echart
            height="280px"
            :source="source"
            :dimensions="dimensions"
            @barClick="barClick"
            v-if="isShowFri"
          ></multi-bar-echart>
          <multi-bar-echart
            height="280px"
            :source="source"
            :dimensions="dimensions"
            @barClick="barClick"
            v-if="isShowSec"
          ></multi-bar-echart>

          <stack-simple-echart
            height="280px"
            @pieClick="pieClick"
            :stackData='stackSimpleData'
            v-if="isShowThi"
          ></stack-simple-echart>
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
import LineEchart from '@/components/page-echart/src/line-echart'
import MixEchart from '@/components/page-echart/src/mix-echart'
import StackEchart from '@/components/page-echart/src/stack-echart'
import StackSimpleEchart from '@/components/page-echart/src/stack-simple-echart'
import MultiBarEchart from '@/components/page-echart/src/multi-bar-echart'
import MapEchart from '@/components/page-echart/src/map-echart'
import { dataTotal } from 'service/main/detail/detail'
import { mainInfo } from 'service/main/main'

export default {
  name: '',
  components: {
    SCard,
    PieEchart,
    BarEchart,
    MapEchart,
    MultiBarEchart,
    LineEchart,
    MixEchart,
    StackEchart,
    StackSimpleEchart,
  },
  data() {
    return {
      btnName: ['日常检查','专项检查','零售药店GSP跟踪检查','有因检查','飞行检查'],
      mapData: [],
      pieAllData: [],
      pieAreaData: [],
      pieTitle1: '药品企业信用情况',
      pieTitle2: '各辖区A药品企业数量',
      xData: [], //柱形图x轴数据
      xData1: [],
      yData: [], //柱形图y轴数据
      yData1: [],
      isShowIcon: false, //是否现实柱形图返回按钮
      totalData: [],
      radio: "日常检查", //业务按钮选中值
      pickYear:2021,
      mapItem: 'review',
      source: [],
      dimensions: [],
      isShowFri: true, //日常，有因，飞行
      isShowSec: false, // 专项
      isShowThi: false, // gsp
      xLineData: [],  // 年度折线图x轴
      LineData: [],  //年度折线图数据
      mixXdata: [],  //专项混合图x轴数
      mixLineData: [], //专项混合图折线数据
      mixBarData: [],  // 专项混合图柱形数据
      stackData:[], //gsp堆积图数据
      stackSimpleData: []
    }
  },
  created() {
    this.getTotalData()
    this.getMapInfo()
    this.getBarFri()
    this.getLineInfo()
    this.getStackThi()
    // this.getMixSec()
    // this.getLevelInfo()
    // this.getPieAraeData('A')
  },
  methods: {
    /* 数据获取 start */
    //今日统计数据
    getTotalData() {
      const data = {
        region: '',
        action: 'today',
        type: 'T01',
        model: 1
      }
      dataTotal(qs.stringify(data)).then((res) => {
        let titleArr = ["符合数","整改数","检查数","不符合数"]
        let iconArr = ["el-icon-s-claim","el-icon-warning-outline","el-icon-search","el-icon-s-release"]
        let obj = res.data[0]
        delete obj.ID
        this.totalData = Object.values(obj).map((item,index)=>{
          return {num: item,name: titleArr[index],icon: iconArr[index]}
        })
        console.log(this.totalData)
      })
    },
    //获取地图数据
    getMapInfo({vYaer = 2021, vCategory = '日常检查'} = {}) {
      const data = {
        region: '',
        level: 1,
        action: 'normal',
        type: 'T01',
        year: vYaer,
        category: vCategory
      }
      mainInfo(qs.stringify(data)).then((res) => {
        this.mapData = res.data.map((item) => {
          return {
            name: item.REGIONNAME,
            value: item
          }
        })
        console.log(this.mapData,"地图数据");

      })
    },
    getGspInfo({vYaer = 2021} = {}) {
      const data = {
        region: '',
        level: 1,
        action: 'gsp',
        year: vYaer,
      }
      mainInfo(qs.stringify(data)).then((res) => {
        this.mapData = res.data.map((item) => {
          return {
            name: item.REGIONNAME,
            value: item
          }
        })
        console.log(this.mapData,"gsp地图数据");

      })
    },
    //获取日常，有因，飞行检查数据
    getBarFri({vYaer = 2021, vCategory = '日常检查'} = {}) {
      const data = {
        region: '',
        level: 2,
        action: 'normal',
        type: 'T01',
        year: vYaer,
        category: vCategory
      }
      mainInfo(qs.stringify(data)).then((res) => {
        this.source = res.data.map((item) => {
          return {
            name: item.CLASS_NAME,
            '已整改数量': item.YZGCNUM,
            '需整改数量': item.XYZG,
            '检查数量': item.CHECKNUM
          }
        })
        this.dimensions= ['name','已整改数量','需整改数量','检查数量']

      })
    },
    //获取折线图数据
    getLineInfo() {
      const data = {
        region: '',
        action: 'trend',
        type: 'T01',
        model: 1
      }
      mainInfo(qs.stringify(data)).then((res) => {
        this.xLineData = res.data.map((item) => {
          return item.YEAR
        })
        this.LineData = res.data.map((item) => {
          return item.NUM
        })
      })
    },
    //获取专项柱形折线混合数据
    getMixSec({vYaer = 2021} = {}) {
      const data = {
        region: '',
        action: 'plan',
        type: 'T01',
        level:1 ,
        year: vYaer,
        name: ''
      }
      mainInfo(qs.stringify(data)).then((res) => {
        console.log(res.data,"999");
        this.mixXdata = res.data.map((item) => {
          return item.REGION
        })
        this.mixBarData = res.data.map((item) => {
          return item.JCRWL
        })
        this.mixLineData = res.data.map((item) => {
          return parseInt(item.WCBFB) 
        })
      })
    },
    //获取堆积图数据
    getStackThi({vYaer = 2021} = {}) {
      const data = {
        region: '',
        action: 'gsp',
        level:1 ,
        year: vYaer,
      }
      mainInfo(qs.stringify(data)).then((res) => {
        console.log(res.data,"999");
        let arr = ['FH','XQZG','FHJC','YZWF','TY']
        this.stackData.FH = res.data.map((item) => {
          return item.FH
        })
        this.stackData.XQZG = res.data.map((item) => {
          return item.XQZG
        })
        this.stackData.FHJC = res.data.map((item) => {
          return item.FHJC
        })
        this.stackData.YZWF = res.data.map((item) => {
          return item.YZWF
        })
        this.stackData.TY = res.data.map((item) => {
          return item.TY
        })
        this.stackData.REGIONNAME = res.data.map((item) => {
          return item.REGIONNAME
        })
        this.stackSimpleData.REGIONNAME = res.data.map((item) => {
          return item.REGIONNAME
        })
        this.stackSimpleData.PLANNUM = res.data.map((item) => {
          return item.PLANNUM
        })
        this.stackSimpleData.YJC = res.data.map((item) => {
          return item.YJC
        })
        this.stackSimpleData.DFH = res.data.map((item) => {
          return item.DFH
        })
        this.stackSimpleData.WJC = res.data.map((item) => {
          return item.WJC
        })
        this.stackSimpleData.WCBFB = res.data.map((item) => {
          return parseInt(item.WCBFB) 
        })

        // console.log(this.stackData,'this.stackData');

      })
    },
    //获取更新饼形图辖区分级数据
    getPieAraeData(param) {
      
    },
    //获取更新柱形图辖区分级数据
    getBarAraeData(param) {
      
    },
    /* 数据获取 end */
    // 业务按钮选择事件
    selectItem(val) {
      console.log(val);
      
      if(val == "零售药店GSP跟踪检查") {
        this.isShowFri = false
        this.isShowSec = false
        this.isShowThi = true
        this.mapItem = 'review1'
        this.getGspInfo({vYaer:this.pickYear})
        // this.getStackThi({vYaer:this.pickYear})
        }else {
          if(val == "专项检查"){
            console.log("!");
            this.isShowFri = false
            this.isShowSec = true
            this.isShowThi = false
            this.getBarFri({vYaer:this.pickYear,vCategory:val})
            this.getMixSec({vYaer:this.pickYear})
          }else{
            this.isShowFri = true
            this.isShowSec = false
            this.isShowThi = false
            this.getBarFri({vYaer:this.pickYear,vCategory:val})
          }
          this.mapItem = 'review'
          this.getMapInfo({vYaer:this.pickYear,vCategory:val})
          console.log("2");

      }
    },
    /* 饼形图事件 start*/
    //全市分级饼形图--点击事件
    pieClick(param) {
      this.getPieAraeData(param.name)
      this.pieTitle2 = '各辖区' + param.name + '药品企业数量'
    },
    /* 饼形图事件 end*/

    /* 柱形图事件 start*/
    barClick(param) {
      // this.getBarAraeData(param.name)
      // this.isShowIcon = true
    },
    changeShowIcon(val) {
      console.log(val)
      // this.isShowIcon = val
    }
    /* 柱形图事件 end*/
  }
}
</script>

<style scoped lang="less">
.review {
  .el-row,
  .el-col {
    height: 100% !important;
  }
  .board {
    height: 140px;
    width: 100%;
    border-radius: 5px;
    background: linear-gradient(to right,#82badf, #e3eff3) !important;
    margin-bottom: 10px;
    
    &-btn {
      line-height: 50px;
      width: 100%;
      border-bottom: 1px solid #ffffff;
      .el-radio-group {
        padding-top: 5px;
        padding-bottom: 5px;
        display: flex;
        flex-direction: row;
        flex: 1;
        justify-content: space-around;
        .el-radio-button{
          z-index: 9;
          color: #fff;
          border-radius: 15px !important;
          /deep/.el-radio-button__inner {
            color: #fff;
            background: linear-gradient(to top,#4CC5EC, #46D7D1) !important;
            border-radius: 15px !important;
          }
          /deep/.el-radio-button__inner:hover {
            background: linear-gradient(to top,#5756D7, #348eca) !important;
          }
        }
        .is-active {
          /deep/.el-radio-button__inner {
            color: #fff;
            background: linear-gradient(to top,#5756D7, #348eca) !important;
            border-radius: 15px !important;
          }
        }
      }
      .el-button {
        color: #fff;
        background: linear-gradient(to top,#4CC5EC, #46D7D1) !important;
      }
      .el-button:focus {
        background: linear-gradient(to top,#5756D7, #348eca) !important;
      }
      .el-button:hover {
        background: linear-gradient(to top,#5756D7, #348eca) !important;
      }

    }
    &-data {
      height: 80px;
      align-items: center;
      display: flex;
      flex-direction: row;
      flex: 1;
      justify-content: space-around;
      &-item {
        align-items: center;
        height: 100%;
        display: flex;
        &-content {
          height: 100%;
          justify-content: space-evenly;
          display: flex;
          flex-direction: column;
          color: #4f5155;
          font-size: 14px;
          span:last-child {
            font-family: 'electronicFont';
            font-size: 30px;
            color: #057d88;
          }

        }
        i {
          font-size: 24px;
          color: #fff;
          margin-right: 10px;
          line-height: 60px;
          height: 60px;
          width: 50px;
          background: #E75C4E;
          border-radius: 5px;
        }
      }
      &-item:nth-child(1) {
        i {background: #09BC1D;}
      }
      &-item:nth-child(2) {
        i {background: #F0A820;}
      }
      &-item:nth-child(3) {
        i {background: #409EFF;}
      }
    }
  }
  .content-right {
    height: 100%;
    display: flex;
    flex-direction: column;
    
    .el-card:last-child {
      margin-top: 15px;
    }
  }
}
</style>
