let areaData = ['荔湾区','海珠区','越秀区','天河区','黄埔区','白云区','番禺区','南沙区','从化区','花都区','增城区']
const coordinateData = {
  荔湾区: [113.243038, 23.074943],
  海珠区: [113.372008, 23.083131],
  越秀区: [113.280714, 23.125624],
  天河区: [113.415367, 23.15559],
  黄埔区: [113.540761, 23.203239],
  白云区: [113.302831, 23.262281],
  番禺区: [113.424619, 22.938582],
  南沙区: [113.53738, 22.794531],
  从化区: [113.587386, 23.545283],
  花都区: [113.211184, 23.39205],
  增城区: [113.829579, 23.290497] 
}
export const convertData = function (data) {
  const res = []
  for (let i = 0; i < data.length; i++) {
    const geoCoord = coordinateData[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
        // value: geoCoord.concat(data[i].value).reverse()

        // value: data[i].value
      })
    }
  }
  return res
}
//重构分类分级地图数据
export const levelData = function (data) {
  let res = []
  let arr = []  
  let dataInfo = {};
  data.forEach((item, index) => {
    let { REGIONNAME,CREDIT_CLASS } = item;
    if (!dataInfo[REGIONNAME]) {
      dataInfo[REGIONNAME] = [
        {REGIONNAME: item.REGIONNAME}
      ]
    }
    let obj = {}
    obj[CREDIT_CLASS] = item.NUM,
    dataInfo[REGIONNAME].push(obj);
  });
  let level = ["A","B","C","D","未评级"]
  arr = Object.values(dataInfo).map((item)=> {
    return Object.assign({}, ...item);
  }).map((obj)=> {
    level.forEach((item) => {
      if (!obj.hasOwnProperty(item)){
        obj[item] = 0
      }
    })
      return obj
  }) 
  let rArr = arr.map((item) => {
    return item.REGIONNAME
  })  
  areaData.forEach((item,index) => {
      if(rArr.indexOf(item)==-1){
        arr.push({REGIONNAME:item,A:0,B:0,C:0,D:0,"未评级":0})
      }
  })
  arr.forEach((item)=> {
    const geoCoord = coordinateData[item.REGIONNAME]
    if (geoCoord) {
      res.push({
        name: item.REGIONNAME,
        value: [].concat(item)
      })
    }
  })

  // console.log(arr,"level");
  return res
}

//重构企业情况地图数据
export const typeData = function(data) {
  let res = []
  let arr = []  
  let dataInfo = {};
  data.forEach((item, index) => {
    let { REGION,CLASS_NAME } = item;
    if (!dataInfo[REGION]) {
      dataInfo[REGION] = [
        {REGION: item.REGION}
      ]
    }
    let obj = {}
    obj[CLASS_NAME] = item.NUM,
    dataInfo[REGION].push(obj);
  });
  
  let type = ["零售药店","药品生产企业","连锁门店","医疗机构","连锁总部","药品批发企业"]
  arr = Object.values(dataInfo).map((item)=> {  //增加缺省类型的数据值
    return Object.assign({}, ...item);
  }).map((obj)=> {
    type.forEach((item) => {
      if (!obj.hasOwnProperty(item)){
        obj[item] = 0
      }
    })
      return obj
  }) 
  let rArr = arr.map((item) => {  //提取数据中的区域集合
    return item.REGION
  }) 
  areaData.forEach((item,index) => {  //增加缺省区域默认数据
    if(rArr.indexOf(item)==-1){
      arr.push({REGION:item,"零售药店":0,"药品生产企业":0,"连锁门店":0,"医疗机构":0,"连锁总部":0,"药品批发企业":0})
    }
  })
  arr.forEach((item)=> {
    const geoCoord = coordinateData[item.REGION]
    if (geoCoord) {
      res.push({
        name: item.REGION,
        value: [].concat(item)
      })
    }
  })
  console.log(res,"---d01---");
  return res
}