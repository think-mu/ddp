<template>
  <div class="nav-menu">
    <el-menu
      default-active="1"
      class="el-menu-vertical"
      unique-opened
      background-color="#5F88AF"
      text-color="#fff"
      active-text-color="#fff">
      <div v-for="item in userMenus" :key="item.id">
        <template v-if="item.type === 1">
          <el-submenu :index="item.id + ''">
            <template slot="title">
              <span>{{ item.name }}</span>
            </template>
            <!-- 遍历子项 -->
            <template v-for="subitem in item.children" >
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>  
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''" class="amenu-item"
          @click="handleMenuItemClick(item)">
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </div>  
    </el-menu>
  </div>
</template>

<script>
import userMenus from 'utils/nav-menu.js'
  export default {
    name: "",
    data() {
      return {
        userMenus :""
      }
    },
    created() {
      this.userMenus = userMenus
      // console.log(userMenus,"nav");
    },
    methods: {
      handleMenuItemClick(item) {
        // console.log(item);
        if(item){
          this.$router.push(item.url)
        }else{
          this.$router.push('/not-found')
        }
      }
    }
  }
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background: #000000 !important;
    z-index: 99;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      line-height: 40px;
      height: 40px;
      padding-left: 30px !important;
      background: 5F88AF !important;
      // background-image: linear-gradient(to top,#5dabf5, #cedfeb) !important;
    }
  }
  .amenu-item {
    background: linear-gradient(to top,#6BBAE3 15px, #cedfeb) !important;
  }  


  ::v-deep .el-submenu__title {
    height: 40px;
    line-height: 40px;
    background: linear-gradient(to top,#6BBAE3, #cedfeb) !important;

    // background-color: #65aaeb !important;
  }
  .el-menu-item {
    height: 40px;
    line-height: 40px;
  }
  // hover 高亮
  .el-menu-item:hover {
    background-color: #a9bdd6 !important;
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    // color: #fff !important;
    background: linear-gradient(to top,#2372c7, #50c2f0) !important;

    // background: #1466bd !important;
  }

}


// .el-menu-vertical:not(.el-menu--collapse) {
//   width: 100%;
//   height: 100%;
// }
</style>
