<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div class="dashboard-text">menus: <span v-for="menu in menus" :key="menu">{{ menu }}</span></div>
    <el-divider />
    <div class="dashboard-text">env: {{ env }}</div>
    <div class="dashboard-text">url: {{ url }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      env: process.env.NODE_ENV,
      url: process.env.VUE_APP_BASE_API
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'menus'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
