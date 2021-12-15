import sRequest from '../index';

export function login(data) {
  return sRequest.post({
    url: '/rcms/EagleActions/ncStatisticsAction',
    data: data,
    showLoad: false //是否添加请求加载动画 
  })
}