let BASE_URL = ''
let TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://123.207.32.32:8000/'
}else if(process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://tsst/'
}else{
  BASE_URL = 'http://tsst/'
}

export { BASE_URL, TIME_OUT}