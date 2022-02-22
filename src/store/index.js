import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    typeValue: [],
  },
  mutations: {
    
    changeTypeValue(state, param) {
      state.typeValue = param
    }
  },
  actions: {

  }
})

export function setupStore() {
  // console.log("st");
  //同步localstroe 和vuex数据，
}

export default store