<template>
  <div class="container">
    <h1>df</h1>
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
  </div>
</template>

<script>
import sRquest from 'service/index.js'
  export default {
    name: "",
    data() {
      return {
      }
    },
    created() {
      sRquest.request({
        url: '/home/multidata',
        method: 'GET'
      })
    }
  }
</script>

<style scoped></style>
