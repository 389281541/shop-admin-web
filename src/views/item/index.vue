<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">类别列表</span>
      <el-button
        class="btn-add"
        @click="handleAddItem()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">

    </div>
  </div>
</template>

<script>
export default {
  name: 'itemList',
  data () {
    return {
    }
  },
  created () {
  },
  watch: {
  },
  methods: {
    handleAddItem () {
      this.$router.push('/item/add')
    }
  }
}
</script>
