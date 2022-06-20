<template>
  <div class="review">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="board">
          <div class="board-btn">
            <el-radio-group v-model="radio" @change="selectItem">
              <el-radio-button
                v-for="(item, index) in btnName"
                :label="item"
                :key="item"
              ></el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="map-hd">
            <p class="title">今日统计数据 ▶</p>
            <ul>
              <li>
                <span>{{ totalData[0].JCS }}</span><span>总检查数</span>
              </li>
            </ul>
            <ul>
              <li>
                <span>{{ totalData[0].FHS }}</span><span>通过数</span>
              </li>
            </ul>  
            
            <ul>
              <li>
                <span>{{ totalData[0].BFHS }}</span><span>不通过数</span>
              </li>
            </ul>  
            <ul>  
              <li>
                <span>{{ totalData[0].ZGS }}</span><span>限期整改数</span>
              </li>
            </ul>
        </div>
        <s-card :title="titleLabel1" class="map">
          <template v-slot:select >
            <el-date-picker
              v-model="mapYear"
              type="year"
              :clearable="false"
              popper-class="yselect"
              :picker-options="mapOptions"
              :popper-append-to-body="false"
              @change="changeMapYear"
              placeholder="选择年份">
            </el-date-picker>
          </template>
          <!-- <div class="map-hd">
            <ul>
              <li>
                <span>{{ totalData[0].FHS }}</span><span>符合数</span>
              </li>
            </ul>  
            <ul>
              <li>
                <span>{{ totalData[0].JCS }}</span><span>检查数</span>
              </li>
            </ul>
            <ul>
              <li>
                <span>{{ totalData[0].BFHS }}</span><span>不符合数</span>
              </li>
            </ul>  
            <ul>  
              <li>
                <span>{{ totalData[0].ZGS }}</span><span>整改数</span>
              </li>
            </ul>
          </div> -->
          <map-echart
            height="605px"
            width="100%"
            :mapData="mapData"
            :mapName="mapItem"
            @barClick="showArea"
          ></map-echart>
        </s-card>
        <el-dialog :title="dialogTitle" :visible.sync="dialogTableDate" :modal='false' height="200" center :modal-append-to-body="true" >
          <el-table :data="gridDateData" height="500">
            <el-table-column property="REGIONNAME" label="街道" width="220"></el-table-column>
            <el-table-column property="XYZG" label="需整改数量" ></el-table-column>
            <el-table-column property="YZGCNUM" label="已整改数量" ></el-table-column>
            <el-table-column property="CHECKNUM" label="检查数量" ></el-table-column>
          </el-table>
        </el-dialog>
      </el-col>
      <el-col :span="12" class="content-right">
        <s-card :title="titleLabel2" class="content-right-pie">

          <template v-slot:select v-if="isShowSec||isShowThi">
            <el-switch
              v-model="switchValue"
              v-if="isShowSec"
              >
            </el-switch>
            <el-date-picker
              class="content-right-pie-gsp"
              v-if="isShowThi"
              v-model="stackYear"
              type="year"
              :clearable="false"
              popper-class="yselect"
              :picker-options="stackOptions"
              :popper-append-to-body="false"
              @change="changeStackYear"
              placeholder="选择年份">
            </el-date-picker>
            <el-date-picker
              v-if="!switchValue && isShowSec"
              v-model="mixYear"
              type="year"
              :clearable="false"
              popper-class="yselect"
              :picker-options="mixOptions"
              :popper-append-to-body="false"
              @change="changeMixYear"
              placeholder="选择年份">
            </el-date-picker>

            <el-form
              v-if="switchValue"
              :inline="true"
              :model="formSpecial"
              class="content-form"
              size="mini"
              :rules="rules" 
              ref="ruleForm"
            >
              <el-form-item label-width="60" prop="year">
                <el-date-picker
                  v-model="formSpecial.year"
                  type="year"
                  :clearable="false"
                  size="mini"
                  popper-class="yselect"
                  :picker-options="pickerOptions"
                  @change="changePlanYear"
                  :popper-append-to-body="false"
                  placeholder="选择年">
                </el-date-picker>
              </el-form-item>
              <el-form-item prop="plan">
                <el-select v-model="formSpecial.plan" placeholder="方案名称" :popper-append-to-body="false">
                  <el-option
                    v-for="item in planData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit('ruleForm')" >查询</el-button>
              </el-form-item>
            </el-form>
          </template>
          <line-echart
            height="325px"
            :xLineData="xLineData"
            :LineData="LineData"
            @pieClick="pieClick"
            v-if="isShowFri"
          ></line-echart>
          <mix-echart
            height="325px"
            @pieClick="pieClick"
            :mixXdata="mixXdata"
            :mixLineData="mixLineData"
            :mixBarData="mixBarData"
            :successData="successData"
            v-if="!switchValue && isShowSec"
          ></mix-echart>
          <!-- <stack-echart  测试版本
            height="325px"
            ref="stackRef"
            @pieClick="pieClick"
            :stackData="stackData"
            v-if="isShowThi"
          ></stack-echart> -->
          <multi-bar-echart-gsp
            height="325px"
            :source="sourceGsp"
            :dimensions="dimensionsGsp"
            v-if="isShowThi"
          ></multi-bar-echart-gsp>

          <stack-simple-echart-se
            ref="se"
            height="325px"
            :fromData='formSpecial'
            :stackData='stackSimpleDatai'
            v-if="switchValue"
          ></stack-simple-echart-se>
        </s-card>
        <s-card
          :title="titleLabel2"
          :isShowIcon="isShowIcon"
          @changeShowIcon="changeShowIcon"
        >
          <template v-slot:select >
            <el-date-picker
              v-model="barYear"
              type="year"
              :clearable="false"
              popper-class="yselect"
              :picker-options="barOptions"
              :popper-append-to-body="false"
              @change="changeBarYear"
              placeholder="选择年份">
            </el-date-picker>
          </template>
          <multi-bar-echart
            height="325px"
            :source="source"
            :dimensions="dimensions"
            @barClick="barClick"
            v-if="isShowFri"
          ></multi-bar-echart>
          <multi-bar-echart
            height="325px"
            :source="source"
            :dimensions="dimensions"
            @barClick="barClick"
            v-if="isShowSec"
          ></multi-bar-echart>

          <stack-simple-echart
            height="325px"
            ref="gspRef"
            @pieClick="pieClick"
            :stackData="stackSimpleData"
            v-if="isShowThi"
          ></stack-simple-echart>
        </s-card>
      </el-col>
    </el-row>
    <!-- <span class="tip">*建议用谷歌、360极速浏览器、火狐浏览器、QQ浏览器10+、IE10+等浏览器，否则页面可能会存在显示异常现象</span> -->
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
import StackSimpleEchartSe from '@/components/page-echart/src/stack-simple-echart-se'
import MultiBarEchart from '@/components/page-echart/src/multi-bar-echart'
import MultiBarEchartGsp from '@/components/page-echart/src/multi-bar-echart-gsp'
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
    MultiBarEchartGsp,
    LineEchart,
    MixEchart,
    StackEchart,
    StackSimpleEchart,
    StackSimpleEchartSe,
  },
  data() {
    return {
      titleLabel1:'日常检查全市情况',
      titleLabel2:'日常检查监督情况',
      titleLabel3:'日常检查监督情况',
      switchValue: false,
      btnName: [
        '日常检查',
        '专项检查',
        '零售药店GSP跟踪检查',
       /*  '有因检查',  //测试版本
        '飞行检查' */
      ],
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
      totalData: [{
        FHS: 0,
        BFHS: 0,
        JCS: 0,
        ZGS: 0
      }],
      radio: '日常检查', //业务按钮选中值
      pickYear: 2021,
      mapItem: 'review',
      source: [],
      dimensions: [],      
      sourceGsp: [],
      dimensionsGsp: [],
      sourceSe: [],
      dimensionsSe: [],
      isShowFri: true, //日常，有因，飞行
      isShowSec: false, // 专项
      isShowThi: false, // gsp
      isShowSecCh: false, // 专项具体
      xLineData: [], // 年度折线图x轴
      LineData: [], //年度折线图数据
      mixXdata: [], //专项混合图x轴数
      mixLineData: [], //专项混合图折线数据
      mixBarData: [], // 专项混合图柱形数据
      successData: [], // 专项混合图完成任务量数据
      stackData: [], //gsp堆积图数据
      stackSimpleData: [],
      stackSimpleDatai:{},//专项详细数据
      formSpecial: {
        year: new Date('2021'),
        plan: null
      }, //筛选
      PlanData1: [
        {
          value: 'LANUM',
          label: '立案数量'
        },
        {
          value: 'CZNUM',
          label: '处置数量'
        },
        {
          value: 'YSNUM',
          label: '移送数量'
        }
      ],
      planData:[],
      // timeDefaultShow: new Date('2021'),

      rules:{
        year: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        plan: [
          { required: true, message: '请选择方案', trigger: 'change' }
        ],
      },//表单验证规则
      mapYear: new Date('2021'), //地图年份选择器值
      barYear: new Date('2021'),
      mixYear: new Date('2021'),
      stackYear: new Date('2021'),
      mixOptions:{
         disabledDate(time) {
            return (  //Date.now()
              time.getTime() > Date.now() ||
              time.getTime() < new Date('2021')
            )
          },
      },
      stackOptions:{
         disabledDate(time) {
            return (  //Date.now()
              time.getTime() > Date.now() ||
              time.getTime() < new Date('2019')
            )
          },
      },
      // mapOptions: this.getOption()
      itemSelect: '',
      dialogTableDate: false, //地图弹窗响应
      gridDateData: [], //地图辖区表格数据
      dialogTitle: ''
    }
  },
  created() {
    
    this.getTotalData()
    this.getMapInfo()
    this.getBarFri()
    this.getLineInfo()
    this.getStackThi()
    this.getMixSec({ vYaer: this.mapYear.getFullYear(),vLevel: 2 })
  },
  computed: {
    pickerOptions() {
      let that = this
      return{ 
        disabledDate:(time)=> {
          return (
            time.getTime() > Date.now() ||
            time.getTime() < new Date('2021')
          )
        },
      }
    },
      mapOptions() {
        let that = this
        return{ 
          disabledDate:(time)=> {
            if(that.radio == '日常检查'||that.radio == '有因检查'||that.radio == '飞行检查'){
              return (
                time.getTime() > Date.now() ||
                time.getTime() < new Date('2016')
              )
            }else if (that.radio == '专项检查'){
               return (
                time.getTime() > Date.now() ||
                time.getTime() < new Date('2021')
              ) 
            }else if (that.radio == '零售药店GSP跟踪检查'){
               return (
                time.getTime() > Date.now() ||
                time.getTime() < new Date('2019')
              ) 
            }  
            
          },
        }
      },
      barOptions() {
        let that = this
        return{ 
          disabledDate:(time)=> {
            if(that.radio == '日常检查'||that.radio == '有因检查'||that.radio == '飞行检查'){
              return (
                time.getTime() > Date.now() ||
                time.getTime() < new Date('2016')
              )
            }else if (that.radio == '专项检查'){
               return (
                time.getTime() > Date.now() ||
                time.getTime() < new Date('2021')
              ) 
            }else if (that.radio == '零售药店GSP跟踪检查'){
               return (
                time.getTime() > Date.now() ||
                time.getTime() < new Date('2019')
              ) 
            }  
            
          },
        }
      },
  },
  methods: {
    showArea(param) {
      this.dialogTitle = param.name + '数据'
      this.dialogTableDate = true
      this.gridDateData= []
      
      if (this.itemSelect == '零售药店GSP跟踪检查') {

      }else {
        this.getStreetInfo({ VRegion: param.name,vYaer: this.mapYear.getFullYear(),vCategory: this.itemSelect})
      }
    },
    // getOption() {
    //     let that = this

    //     return{ 
          
    //       disabledDate:(time)=> {
    //         if(that.radio == '日常检查'){

    //           return (
    //             time.getTime() > Date.now() ||
    //             time.getTime() < new Date('2016')
    //           )
    //         }else if (that.radio == '专项检查'){
    //            return (
    //             time.getTime() > Date.now() ||
    //             time.getTime() < new Date('2021')
    //           ) 
    //         } 
            
    //       },
    //     }
    // },
    /* 数据获取 start */
    //今日统计数据
    getTotalData({ vCategory = '日常检查' } = {}) {
      const data = {
        region: '',
        action: 'today',
        type: 'T01',
        model: 1,
        category: vCategory
      }
      dataTotal(qs.stringify(data)).then((res) => {
        let titleArr = ['符合数', '整改数', '检查数', '不符合数']
        this.totalData = res.data 
        // let obj = res.data[0]
        // delete obj.ID
        // this.totalData = Object.values(obj).map((item, index) => {
        //   return { num: item, name: titleArr[index], icon: iconArr[index] }
        // })
      })
    },
    //获取地图数据
    getMapInfo({ vYaer = 2021, vCategory = '日常检查' } = {}) {
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
      })
    },
    getStreetInfo({ VRegion='',vYaer = 2021, vCategory = '日常检查' } = {}) {
      const data = {
        region: VRegion,
        level: 1,
        action: 'normal',
        type: 'T01',
        year: vYaer,
        category: vCategory
      }
      mainInfo(qs.stringify(data)).then((res) => {
        this.gridDateData = res.data
      })
    },
    getGspInfo({ vYaer = 2021 } = {}) {
      const data = {
        region: '',
        level: 1,
        action: 'gsp',
        year: vYaer
      }
      mainInfo(qs.stringify(data)).then((res) => {
        this.mapData = res.data.map((item) => {
          return {
            name: item.REGIONNAME,
            value: item
          }
        })
      })
    },
    //获取日常，有因，飞行检查数据
    getBarFri({ vYaer = 2021, vCategory = '日常检查' } = {}) {
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
            已整改数量: item.YZGCNUM,
            需整改数量: item.XYZG,
            检查数量: item.CHECKNUM
          }
        })
        this.dimensions = ['name', '已整改数量', '需整改数量', '检查数量']
      })
    },
    //获取折线图数据
    getLineInfo({ vCategory = '日常检查' } = {}) {
      const data = {
        region: '',
        action: 'trend',
        type: 'T01',
        model: 1,
        category: vCategory
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
    getMixSec({ vYaer = 2021,vLevel= 1,vPlanId= '' } = {}) {
      const data = {
        region: '',
        action: 'plan',
        type: 'T01',
        level: vLevel,
        year: vYaer,
        name: '',
        planId: vPlanId
      }
      mainInfo(qs.stringify(data)).then((res) => {
        if(vLevel==1){ //获取专项柱形折线混合数据
          this.mixXdata = res.data.map((item) => {
            return item.REGION
          })
          this.mixBarData = res.data.map((item) => {
            return item.JCRWL
          })
          this.successData = res.data.map((item) => {
            return item.SUCCESSNUM
          })
          this.mixLineData = res.data.map((item) => {
            return parseInt(item.WCBFB)
          })
        }else if(vLevel==2){ //获取筛选方案信息
          this.planData = res.data.map((item) => {
            return { label: item.PLAN_NAME, value: item.PLAN_ID }
          })
          this.formSpecial.plan = this.planData[0].value
          this.getPlanInfo({ vYaer: this.formSpecial.year,vPlanId: this.formSpecial.plan })

        }
        // else if(vLevel==3){ //获取筛选方案信息
        //   this.stackSimpleDatai.REGIONNAME = res.data.map((item) => {
        //     return item.GROUPNAME
        //   })
        //   this.stackSimpleDatai.PLANNUM = res.data.map((item) => {
        //     return item.PLANNUM
        //   })
        //   this.stackSimpleDatai.CHECKEDNUM = res.data.map((item) => {
        //     return item.CHECKEDNUM
        //   })
        //   this.stackSimpleDatai.RECTIFYNUM = res.data.map((item) => {
        //     return item.RECTIFYNUM
        //   })
        //   this.stackSimpleDatai.MUSTCHECKNUM = res.data.map((item) => {
        //     return item.MUSTCHECKNUM
        //   })
        //   this.stackSimpleDatai.FLAG = res.data.map((item) => {
        //     return parseInt(item.FLAG)
        //   })

        
        
      })
    },
    //获取筛选方案信息
    getPlanInfo({ vYaer = 2021,vPlanId = 860 } = {}) {
      const data = {
        region: '',
        action: 'plan',
        type: 'T01',
        level: 3,
        year: vYaer,
        name: '',
        planId: vPlanId
      }
      mainInfo(qs.stringify(data)).then((res) => {
          this.stackSimpleDatai.REGIONNAME = res.data.map((item) => {
            return item.GROUPNAME
          })
          this.stackSimpleDatai.PLANNUM = res.data.map((item) => {
            return item.PLANNUM
          })
          this.stackSimpleDatai.CHECKEDNUM = res.data.map((item) => {
            return item.CHECKEDNUM
          })
          this.stackSimpleDatai.RECTIFYNUM = res.data.map((item) => {
            return item.RECTIFYNUM
          })
          this.stackSimpleDatai.MUSTCHECKNUM = res.data.map((item) => {
            return item.MUSTCHECKNUM
          })
          this.stackSimpleDatai.FLAG = res.data.map((item) => {
            return parseInt(item.FLAG)
          })
          if(this.switchValue){
            this.$nextTick(() => { 
                  this.$refs.se.draw();
            });
          }
          
        
      })
    },

    //获取堆积图数据
    getStackThi({ vYaer = 2021,pickId='' } = {}) {
      const data = {
        region: '',
        action: 'gsp',
        level: 1,
        year: vYaer
      }
      mainInfo(qs.stringify(data)).then((res) => {
        // let arr = ['FH', 'XQZG', 'FHJC', 'YZWF', 'TY']
        // this.stackData.FH = res.data.map((item) => {  测试版本
        //   return item.FH
        // })
        // this.stackData.XQZG = res.data.map((item) => {
        //   return item.XQZG
        // })
        // this.stackData.FHJC = res.data.map((item) => {
        //   return item.FHJC
        // })
        // this.stackData.YZWF = res.data.map((item) => {
        //   return item.YZWF
        // })
        // this.stackData.TY = res.data.map((item) => {
        //   return item.TY
        // })
        // this.stackData.REGIONNAME = res.data.map((item) => {
        //   return item.REGIONNAME
        // })


       if(pickId==1){
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
            return parseFloat(item.WCBFB)
          })
          this.$nextTick(() => { 
                this.$refs.gspRef.draw();
          });
        }else if(pickId==2) {
          this.sourceGsp = res.data.map((item) => {
            return {
              name: item.REGIONNAME,
              符合: item.FH,
              限期整改: item.XQZG,
              复核检查: item.FHJC,
              严重违反: item.YZWF,
              停业: item.TY
            }
          })
          this.dimensionsGsp = ['name', '符合', '限期整改', '复核检查', '严重违反', '停业']
        }else {
          this.sourceGsp = res.data.map((item) => {
            return {
              name: item.REGIONNAME,
              符合: item.FH,
              限期整改: item.XQZG,
              复核检查: item.FHJC,
              严重违反: item.YZWF,
              停业: item.TY
            }
          })
          this.dimensionsGsp = ['name', '符合', '限期整改', '复核检查', '严重违反', '停业']

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
        }
        // if(pickId==2){
        //   this.$nextTick(() => { 
        //         // this.$refs.stackRef.draws();
        //   });
        // }
      })
    },
    //获取更新饼形图辖区分级数据
    getPieAraeData(param) {},
    //获取更新柱形图辖区分级数据
    getBarAraeData(param) {},
    /* 数据获取 end */

    // 业务按钮选择事件
    selectItem(val) {
      this.titleLabel1 = val+'全市情况'
      this.titleLabel2 = val+'监督情况'
      this.titleLabel3 = val+'监督情况'
      this.mapYear = new Date('2021')
      this.barYear = new Date('2021')
      this.getTotalData({ vCategory: val })
      this.itemSelect = val
      if (val == '零售药店GSP跟踪检查') {
        this.isShowFri = false
        this.isShowSec = false
        this.isShowThi = true
        this.mapItem = 'review1'
        this.getGspInfo({ vYaer: this.mapYear.getFullYear() })
        
        this.getStackThi({vYaer:this.barYear.getFullYear()})
        this.switchValue = false
   
      } else {
        if (val == '专项检查') {
          this.isShowFri = false
          this.isShowSec = true
          this.isShowThi = false
          
          this.getMixSec({ vYaer: this.formSpecial.year.getFullYear(),vLevel: 1 })
        } else {
          this.isShowFri = true
          this.isShowSec = false
          this.isShowThi = false
          this.switchValue = false

          this.getLineInfo({ vCategory: val })
        }
        this.switchValue = false
        this.getBarFri({ vYaer: this.barYear.getFullYear(), vCategory: val })
        this.mapItem = 'review'
        this.getMapInfo({ vYaer: this.mapYear.getFullYear(), vCategory: val })
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
      // this.isShowIcon = val
    },
    /* 柱形图事件 end*/
    onSubmit(param) {
      this.$refs[param].validate((valid) => {
        if (valid) {
          
          const yy = this.formSpecial.year.getFullYear();
          this.getPlanInfo({ vYaer: yy,vPlanId: this.formSpecial.plan })

          // this.getMixSec({ vYaer: yy,vLevel: 3, vPlanId: this.formSpecial.plan })
          // this.isShowSecCh = true
        } else {
          return false;
        }
      });
      // this.isShowSecCh = true
    },
    //年份选择器 回调函数
    changeMapYear(param) {
      if(this.radio == '零售药店GSP跟踪检查'){
        this.getGspInfo({ vYaer: param.getFullYear() })
      }else{
        this.getMapInfo({ vYaer: param.getFullYear(), vCategory: this.radio })
      }
    },
    changeBarYear(param) {
      if(this.radio == '零售药店GSP跟踪检查'){
        this.getStackThi({vYaer:param.getFullYear(),pickId:1})
      }else{
        this.getBarFri({ vYaer: param.getFullYear(), vCategory: this.radio })
      }
    },
    changeMixYear(param) {
      this.getMixSec({ vYaer: param.getFullYear(), vLevel: 1 })
    },
    changeStackYear(param) {
      this.getStackThi({vYaer:param.getFullYear(),pickId:2})
    },
    changePlanYear(param) {
      this.getMixSec({vYaer:param.getFullYear(),vLevel:2})
    },
    
  }
}
</script>

<style scoped lang="less">
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
/deep/ .el-picker-panel {
      background-color: rgba(20, 74, 116, 0.322) !important;
      .el-picker-panel__body-wrapper {
        background-color: rgba(9, 39, 61, 0.87) !important;
      }
    }  
.yselect {
    background-color: rgba(20, 74, 116, 0.322) !important;
    .el-picker-panel__body-wrapper {
      background-color: rgba(9, 39, 61, 0.87) !important;
    }
}    
.review {
  .el-row,
  // .tips {
  //   position: absolute;
  //   bottom: 0%;
  //   left: 50%;
  //   transform: translate(0%, -50%);
  //   color: #fff;
  // }
  .el-col {
    height: 100% !important;
  }
  .board {
    height: 50px;
    width: 100%;
    border-radius: 5px;
    // background: linear-gradient(to right, #82badf8f, #0ca6daa1) !important;
    margin-bottom: 4px;

    &-btn {
      line-height: 50px;
      width: 100%;
      .el-radio-group {
        padding-top: 5px;
        padding-bottom: 5px;
        // display: flex;
        // flex-direction: row;
        // flex: 1;
        // justify-content: space-around;
        .el-radio-button {
          z-index: 9;
          color: #fff;
          // border-radius: 15px !important;
          /deep/.el-radio-button__inner {
            color: #fff;
            background: linear-gradient(to top, #2c647700, #49a9e094) !important;
            border: 1px solid rgba(146, 239, 255, 0.315);

            // border-radius: 15px !important;
          }
          /deep/.el-radio-button__inner:hover {
            background: linear-gradient(to top, #69c2e6, #348eca) !important;
          }
        }
        .is-active {
          /deep/.el-radio-button__inner {
            color: #fff;
            font-size: 16px;
            // font-weight: bold;
            border: 1px solid rgba(134, 234, 252, 0.774);
            box-shadow: 0px 0px 6px 3px rgb(93, 204, 248) !important;
            background: linear-gradient(to top, #18befffb, #2fa6f598) !important;
            // border-radius: 15px !important;
          }
        }
      }
      .el-button {
        color: #fff;
        background: linear-gradient(to top, #4cc5ec, #46d7d1) !important;
      }
      .el-button:focus {
        background: linear-gradient(to top, #5756d7, #348eca) !important;
      }
      .el-button:hover {
        background: linear-gradient(to top, #5756d7, #348eca) !important;
      }
    }
  /*   &-data {
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
          background: #e75c4e;
          border-radius: 5px;
        }
      }
      &-item:nth-child(1) {
        i {
          background: #09bc1d;
        }
      }
      &-item:nth-child(2) {
        i {
          background: #f0a820;
        }
      }
      &-item:nth-child(3) {
        i {
          background: #409eff;
        }
      }
    } */
  }
  .map-hd {
      display: flex;
      width:100%;
      
      // align-items: flex-start;
      ul {
        width: 220px;
        li {
          flex: 1;
          list-style-type: none;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          text-align: center;
          height: 46px;
          background: url('../../../assets/img/total-icon.png') no-repeat center
            top;
          background-size: 60px 60px;
          margin-bottom: 10px;
        }
        span:first-child {
          font-family: 'electronicFont';
          line-height: 45px;
          font-size: 36px;
          margin-top: 4px;
          // color: #faa60b;
          background-image: -webkit-linear-gradient(bottom, #ff7200, #ffee30);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        span:last-child {
          font-family: 'electronicFont';
          line-height: 18px;
          font-size: 18px;
          color: #e5f0f1;
          text-shadow: 2px 2px 8px #aaf2ff;
          margin-top: 15px;
        }
      }
      .title {
        width: 220px;
        color:rgba(231, 231, 231, 0.932) !important;
        font-size: 16px;
        justify-content: center;
        margin-right: -40px;
      }
    }
  .map {
    position: relative;
  }

  .content-right {
    height: 100%;
    display: flex;
    flex-direction: column;
    
    .content-form {
      margin-top: 20px;
      // display: flex;
      align-items: center;
      // flex-direction: row-reverse;
      justify-content: space-between;
    }
    &-pie {
      margin-bottom: 15px;
      /deep/ .card-header {
        justify-content: flex-start !important;
        .card-header-title {
          margin-bottom: 0px;
        }
        .el-switch {
          margin-left: 20px;
          margin-right: 35px;
        }
      }
      &-gsp {
        margin-left: 60px;
      }
    }
  }
}
</style>
