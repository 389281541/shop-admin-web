<template>
<div class="app-container">
  <el-card class="filter-container" shadow="never">
    <div>
      <i class="el-icon-search"></i>
      <span>筛选搜索</span>
      <el-button
        @click="searchBrandList()"
        type="primary"
        size="small"
        style="float: right">
        查询结果
      </el-button>
      <div style="margin: 15px;" >
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="品牌名称：">
            <el-input style="width: 200px" v-model="listQuery.keyword" aria-placeholder="品牌名称/关键字"></el-input>
          </el-form-item>
          <el-form-item label="品牌分类：">
            <el-select v-model="listQuery.itemId" placeholder="请选择分类" clearable class="input-width">
              <el-option
                v-for="item in brandItemList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-card>
  <el-card class="operate-container" shadow="never">
    <i class="el-icon-tickets"></i>
    <span>品牌列表</span>
    <el-button
      class="btn-add"
      @click="handleAddBrand()"
      size="mini">
      添加
    </el-button>
  </el-card>
  <div class="table-container">
    <el-table style="width: 100%"
              :data="list"
              v-loading="listLoading" border>
      <el-table-column label="编号" width="100" align="center">
        <template slot-scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column label="名称" width="100" align="center">
        <template slot-scope="scope">{{scope.row.name}}</template>
      </el-table-column>
    </el-table>
  </div>

</div>
</template>
<script>
export default {
  data () {
    return {
      listQuery: {
        pageNum: 1,
        pageSize: 5,
        keyword: '',
        itemId: null
      },
      brandItemList: [],
      list: []
    }
  },
  methods: {
    searchBrandList () {

    },
    handleAddBrand () {
    }
  }
}
</script>
