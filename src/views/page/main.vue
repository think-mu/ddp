<template>
  <div class="main">
    <el-container class="main-content">
      <el-header>
          <nav-header/>
      </el-header>
      <el-container class="page">
        <el-aside class="page-aside">
          <nav-menu/>
        </el-aside>
        <el-main class="page-content">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import qs from 'qs'
import { login } from 'service/main/main'
import NavMenu from '@/components/nav-menu/nav-menu'
import NavHeader from '@/components/nav-header/nav-header'
import userMenus from 'utils/nav-menu.js'

export default {
  name: '',
  components: {
    NavMenu,
    NavHeader
  },
  data() {
    return {}
  },
  created() {
    const data = {
      region: "白云区",
      level: 2,
      action: "companyInfo",
      type: "T01"
    }
    login(qs.stringify(data)).then((res) => {
      console.log(res.data, 'xxxxx')
    })
    this.getUserMenus()
  },
  methods: {
    getUserMenus() {
      // this.$store.commit('changeUserMenus', userMenus)
      this.$store.dispatch('saveMenus',userMenus)
    }
  }
}
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-content {
  height: 100%;
}

.page {
  height: calc(100% - 90px);
} 

.el-header {
  padding: 0;
  background: url('../../assets/img/bgh.png');
  height: 90px !important;
  display: flex;
  text-align: center;
  align-items: center;
}



.el-aside {
  width: 180px !important;
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #D7EFF8;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}

</style>
