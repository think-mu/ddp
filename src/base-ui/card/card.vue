<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
      </div>
    </template>
    <div class="item">
      <slot></slot>
    </div>
  </el-card>
</template>

<script>
export default {
  name: '',
  props: {
    title: {
      type: String,
      default: 'Title'
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped lang="less">
.box-card {
  /deep/ .el-card__header {
    padding: 10px 20px !important;
  }
  /deep/ .el-card__body {
    padding: 10px !important;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
}

.item {
  margin-bottom: 10px;
  // border: 1px solid red;
}
</style>
