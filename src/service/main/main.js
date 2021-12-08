import sRequest from '../index';

export function login(data) {
  return sRequest.post({
    url: '/rcms/EagleActions/ncStatisticsAction',
    data: data
  })
}