<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
        <slot name='select'></slot>
        <i class="el-icon-refresh-left" v-if="isShowIcon" @click="changeShowIcon"></i>
      </div>
    </template>
    <div class="item" :style="{ display : flex}">
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
    },
    flex: {
      type: String,
      default: ''
    },
    isShowIcon: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    changeShowIcon() {
      this.$emit('changeShowIcon', false)
    }
  }
}
</script>

<style scoped lang="less">
.box-card {
  // background-color: #D7EFF8; //ui设计
  background: linear-gradient(to right,#b5dcf7, #e3eff3) !important;
  
  /deep/ .el-card__header {
    padding: 10px 20px !important;
    border-bottom: 1px solid #ffffff;  //ui设计
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
  // display: flex;
  // flex: 1;
  // justify-content: space-between;
  // border: 1px solid red;
}
</style>
