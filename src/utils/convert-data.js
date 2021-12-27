let areaData = ['荔湾区','海珠区','越秀区','天河区','黄埔区','白云区','番禺区','南沙区','从化区','花都区','增城区']
const coordinateData = {
  荔湾区: [113.243038, 23.124943],
  海珠区: [113.262008, 23.103131],
  越秀区: [113.280714, 23.125624],
  天河区: [113.335367, 23.13559],
  黄埔区: [113.450761, 23.103239],
  白云区: [113.262831, 23.162281],
  番禺区: [113.364619, 22.938582],
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
        value: geoCoord.concat(data[i].value).reverse()
        // value: data[i].value
      })
    }
  }
  return res
}
//重构分类分级地图数据
export const levelData = function (data) {
  // console.log(data);
  let res = []
  let arr = []  
  let dataInfo = {};
  data.forEach((item, index) => {
    let { REGION,ID } = item;
    if (!dataInfo[REGION]) {
      dataInfo[REGION] = [
        {REGION: item.REGION}
      ]
    }
    let obj = {}
    obj[ID] = item.NUM,
    dataInfo[REGION].push(obj);
  });
  console.log(dataInfo,"dataInfo");
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
    return item.REGION
  })  
  areaData.forEach((item,index) => {
      if(rArr.indexOf(item)==-1){
        arr.push({REGION:item,A:0,B:0,C:0,D:0,"未评级":0})
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

  console.log(arr,"level");
  return res
}