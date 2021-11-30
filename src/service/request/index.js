import axios from 'axios'

class SRequest {
  instance

  constructor(config) {
    this.instance = axios.create(config)
    //请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log(config,"全部")
        return config
      },
      (err) => {}
    )
    //响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        console.log(err)
      }
    )
  }
  request(config) {
    //单独拦截
    if(config.interceptors){
      config = config.interceptors.requestInterceptor(config)
    }
    this.instance.request(config).then((res) => {
      // console.log(res)
    })
    
    
  }
}

export default SRequest
