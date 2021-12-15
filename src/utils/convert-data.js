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
        value: geoCoord.concat(data[i].value)
      })
    }
  }
  return res
}
