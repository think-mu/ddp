let BASE_URL = ''
let TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
}else if(process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://rcjg.gzfda.gov.cn'
  // BASE_URL = 'http://10.194.145.5'
}else{
  BASE_URL = 'http://tsst/'
}

export { BASE_URL, TIME_OUT}