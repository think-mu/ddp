import axios from 'axios'
import { Loading } from 'element-ui'
//设置请求动画默认值
const DEAFULT_LOADING = false
class SRequest {
  instance
  showLoad
  loading
  constructor(config) {
    this.instance = axios.create(config)

    this.showLoad = config.showLoad || DEAFULT_LOADING
    //请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 判断是否存在token
        if (this.showLoad) {
          this.loading = Loading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
            target: document.querySelector('.page-content')
          })
        }

        return config
      },
      (err) => {}
    )
    //响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        if (this.showLoad) {
          setTimeout(() => {
            this.loading.close()
          }, 1000)
        }
        return res.data
      },
      (err) => {
        console.log(err)
        if (this.showLoad) {
          this.loading.close()
        }
        //判断httperrorCOde 显示不同的错误信息
        if (err.response) {
          // console.log('44')
        }
      }
    )
  }
  request(config) {
    //单独拦截
    return new Promise((resolve, reject) => {
      // 单个请求对请求config的处理
      if (config.interceptors) {
        config = config.interceptors.requestInterceptor(config)
      }
      //判断是否需要loading
      if (config.showLoad === true) {
        this.showLoad = config.showLoad
      }
      this.instance
        .request(config)
        .then((res) => {
          if (config.interceptors) {
            res = config.interceptors.requestInterceptor(res)
          }
          this.showLoad = DEAFULT_LOADING
          resolve(res)
        })
        .catch((err) => {
          this.showLoad = DEAFULT_LOADING
          reject(err)
          return err
        })
    });
  }
  get(config) {
    return this.request({...config,method:'GET'})
  }
  post(config) {
    return this.request({...config,method:'POST'})
  }
  delete(config) {
    return this.request({...config,method:'DELETE'})
  }
}

export default SRequest
