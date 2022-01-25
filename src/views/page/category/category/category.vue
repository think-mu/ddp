<template>
  <div class="category">
        <el-row :gutter="20">
      <el-col :span="11">
        <s-card :title="titleLabel1" class="map">
          <template v-slot:select>
            <el-date-picker
              v-model="cYear"
              type="year"
              :clearable="false"
              popper-class="yselect"
              :picker-options="pickerOptions"
              :popper-append-to-body="false"
              @change="changeYear"
              placeholder="选择年份">
            </el-date-picker>
            <el-select v-model="typeValue" @change="typeSelect" class="content-select" :popper-append-to-body="false" >
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
          <map-echart height="750px" :mapData="mapData" mapName="category"></map-echart>
        </s-card>
      </el-col>
      <el-col :span="13" class="content-right">
        <s-card
          :title="titleLabel2"
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
          :title="titleLabel2"
          :isShowIcon="isShowIcon"
          @changeShowIcon="changeShowIcon"
          class="content-right-bar"
        >
          <div class="content-right-bar-total">
            <span class="content-right-bar-total-label">{{aLabel}}</span>
            <span class="content-right-bar-total-num" v-show="!isShowIcon">{{aTotal}}</span>
            <span class="content-right-bar-total-num" v-if="isShowIcon">{{bTotal}}</span>
          </div>
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
import { categoryInfo } from 'service/main/category/category'
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
        pieAreaData: [],
        pieTitle1: "药品企业信用情况",
        pieTitle2: "A级别药品企业数量",
        xData: [], //柱形图x轴数据
        xData1: [],
        yData: [], //柱形图y轴数据
        yData1: [],
        isShowIcon: false, //是否现实柱形图返回按钮
        typeOptions: [],//企业类型
        typeValue: "全部",
        titleLabel1: '全部企业信用分级',
        titleLabel2: '全部企业信用分级',
        pickerOptions: {
          disabledDate(time) {
            return (  //Date.now()
              time.getTime() > new Date('2021') ||
              time.getTime() < new Date('2015')
            )
          },
        },//年份选择器
        cYear: new Date('2021'),
        aTotal: 0,//柱形图全市企业数量
        bTotal: 0,
        aLabel: "各级别药品企业总数（家）",//柱形图全市某企业类型数量
      }
    },
    created() {
      this.getCategoryInfo()
      this.getLevelInfo()
      this.getPieAraeData("A")
    },
    methods: {
      /* 数据获取 start */
      //获取地图数据
      getCategoryInfo({ vYear = 2021, vClassName = '' } = {}) {
        let arr = this.$store.state.typeValue
        // this.typeOptions = arr.map((item,index) => {
        //   return { label: item.value, value: item.value }
        // })
        this.typeOptions = [
          {label: "全部",value: "全部"},
          {label: "连锁门店",value: "连锁门店"},
          {label: "零售药店",value: "零售药店"},
          {label: "药品生产企业",value: "药品生产企业"},
          {label: "药品批发企业",value: "药品批发企业"},
          {label: "连锁总部",value: "连锁总部"},
          {label: "医疗机构",value: "医疗机构"},
          ]
        const data = {
          region: '',
          action: 'credit',
          year: vYear,
          type: 'T01',
          level: 2,
          classname: vClassName
        }
        categoryInfo(qs.stringify(data)).then((res) => {
          this.mapData = levelData(res.data)
        })
      },
      //获取全市各级别企业数量
      getLevelInfo({ vYear = 2021, vClassName = '' } = {}) {
        const data = {
          region: '',
          action: 'credit',
          year: vYear,
          type: 'T01',
          level: 3,
          classname: vClassName
        }
        categoryInfo(qs.stringify(data)).then((res) => {
          this.pieAllData = res.data.map((item) => {
            return {
              name: item.CREDIT_CLASS,
              value: item.NUM
            }
          })
          //更新柱形图x轴值
          this.xData = res.data.map((item) => {
            return {
              value: item.CREDIT_CLASS
            }
          })
          //更新柱形图y轴值
          this.yData = res.data.map((item) => {
            return {
              value: item.NUM
            }
          })
          this.aTotal = res.data.map((item) => {
            return item.NUM
          }).reduce((prev,curr) => {
              return prev+curr
          })
        })
      },
      //获取更新饼形图辖区分级数据
      getPieAraeData(param) {
        setTimeout(() => {
          try {
            this.pieAreaData = this.mapData.map((item) => {
              return {
                name: item.name,
                value: item.value[0][param]
              }
            })
          } catch (error) {}
        }, 500)
        
      },
      //获取更新柱形图辖区分级数据
      getBarAraeData(param) {
          setTimeout(() => {
            try {
              this.xData1 = this.mapData.map((item) => {
                return {
                  value: item.name,
                  // value: item.value[0][param]
                }
              })
              this.yData1 = this.mapData.map((item) => {
                return {
                  value: item.value[0][param]
                }
              })
            } catch (error) {}
          }, 500)
          //更新柱形图x轴值
         /*  this.xData1 = res.data.map((item) => {
            return {
              value: item.REGION
            }
          })
          //更新柱形图y轴值
          this.yData1 = res.data.map((item) => {
            return {
              value: item.NUM
            }
          }) */
    
      },
      /* 数据获取 end */
      /* 饼形图事件 start*/
      //全市分级饼形图--点击事件
      pieClick(param) {
        // console.log(param,"并行");
        this.getPieAraeData(param.name)
        this.pieTitle2 = param.name + '级别药品企业数量'
        
      },
      /* 饼形图事件 end*/

      /* 柱形图事件 start*/
      barClick(param) {
        this.bTotal = param.value
        this.getBarAraeData(param.name)
        this.isShowIcon = true
        this.aLabel = param.name+"级别总数（家）"
        // console.log(param, '柱形图')
      },
      changeShowIcon(val) {
        // console.log(val)
        this.isShowIcon = val
        this.aLabel = "各级别药品企业总数（家）"
      },
      /* 柱形图事件 end*/
      //企业类型选择事件
      typeSelect(param) {
        console.log(this.cYear);
        if(param == "全部"){
          this.getCategoryInfo({ vYear: this.cYear.getFullYear() })
          this.getLevelInfo({ vYear: this.cYear.getFullYear() })
          this.titleLabel1 = "全部企业信用分级"
          this.titleLabel2 = "全部企业信用分级"
        }else {
          this.getLevelInfo({ vClassName: param, vYear: this.cYear.getFullYear() })
          this.getCategoryInfo({ vClassName: param, vYear: this.cYear.getFullYear()})
          this.titleLabel1 = param+"信用分级"
          this.titleLabel2 = param+"信用分级"

        }
        this.pieTitle2 = "A级别药品企业数量"
        this.getPieAraeData("A")

      },
      // 时间选择器事件
      changeYear(param) {
        this.getCategoryInfo({ vYear: param.getFullYear() })
        this.getLevelInfo({ vYear: param.getFullYear() })
        this.getPieAraeData("A")
        this.pieTitle2 = "A级别药品企业数量"
      },
    }
  }
</script>

<style scoped lang='less'>
  ::v-deep { 

    .el-input__inner {
      background-color: rgba(166, 255, 0, 0) !important;
      border:1px transparent solid;
      border-image:linear-gradient(to right,rgba(4,127,156,1),#e9eceb,#01cfff) 1 10;
      box-shadow: 0px 0px 3px 1px #01cfff;
      z-index: 10;
      color: #fff;
      font-size: 16px;
      width: 180px;
      text-align: left;
    }
    .el-select-dropdown {
      background-color: rgba(20, 74, 116, 0.322);
      .el-scrollbar{
        background-color: rgba(9, 39, 61, 0.87);
        color: #fff !important;
        border:1px transparent solid;
        border-image:linear-gradient(to right,rgba(4,127,156,1),#e9eceb,#01cfff) 1 10;
        box-shadow: 0px 0px 3px 1px #01cfff;
        .el-scrollbar__view {
          color: #fff !important;
          .el-select-dropdown__item {
            font-size: 16px;
            text-align: left;
            color: #fff !important;
          }
          .hover {
            background-image: linear-gradient(to right,rgba(2,157,193,1), rgb(3, 64, 110)) !important;
          }
          .selected {
            font-weight: bold;
            color: #00efff !important;
          }
        }
      }
    } 
    .el-picker-panel {
      background-color: rgba(20, 74, 116, 0.322) !important;
      .el-picker-panel__body-wrapper {
        background-color: rgba(9, 39, 61, 0.87) !important;

      }
    }
  }
.category {
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
    &-bar {
      position: relative;
      &-total {
        position: absolute;
        top: 70px;
        left: 56px;
        width: 312px;
        height: 73px;
        background: url('../../../../assets/img/card/total-bg.png') no-repeat;
        background-size: 100% 100% !important;
        display: flex;
        align-items: center;
        font-size: 14px;
        text-align: center;
        justify-content: center;
        &-label {
          background-image:-webkit-linear-gradient(bottom,#6EDBFF,#FFFFFF);
          font-weight: bold;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
        }
        &-num {
          font-weight: bold;
          text-shadow: 2px 2px 22px #52d5ec;
          // text-shadow: 0px 2px 0px #fff, 0 0 2px #fff, 0 0 0px #fff, 0 0 4px #52d5ec, 0 0 4px #52d5ec;
          font-size: 22px;
          color: #FFFFFF;
        }
      }
    }
  }
}
</style>
