<template>
<div class="app-container">
  <el-card class="filter-container" shadow="never">
    <div>
      <i class="el-icon-search"></i>
      <span>筛选搜索</span>
      <el-button
        @click="getList()"
        type="primary"
        size="small"
        style="float: right">
        查询结果
      </el-button>
      <div style="margin: 15px;" >
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="品牌名称：">
            <el-input style="width: 200px" v-model="listQuery.name" aria-placeholder="品牌名称/关键字"></el-input>
          </el-form-item>
          <el-form-item label="品牌分类：">
            <el-cascader placeholder="请选择分类" clearable class="input-width"
                         v-model="selectProductItemValue"
                         :options="productItemOptions">
            </el-cascader>
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
      <el-table-column label="品牌名称" align="center">
        <template slot-scope="scope">{{scope.row.name}}</template>
      </el-table-column>
      <el-table-column label="商标" width="200" align="center">
        <template slot-scope="scope"><img style="height: 80px" :src="scope.row.logo"></template>
      </el-table-column>
      <el-table-column label="创建时间" width="400" align="center">
        <template slot-scope="scope">{{scope.row.createTime}}</template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleUpdate(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="pagination-container">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes,prev, pager, next,jumper"
      :page-size="listQuery.pageSize"
      :page-sizes="[5,10,15]"
      :current-page.sync="listQuery.pageNum"
      :total="total">
    </el-pagination>
  </div>
</div>
</template>
<script>
import {fetchBrandList, deleteBrand} from '@/api/brand'
import {fetchListWithChildren} from '@/api/item'
export default {
  created () {
    this.getList()
    this.getProductItemOptions()
  },
  watch: {
    selectProductItemValue: function (newValue) {
      if (newValue != null && newValue.length === 2) {
        this.listQuery.id = newValue[1]
      } else {
        this.listQuery.id = null
      }
    }
  },
  data () {
    return {
      listLoading: false,
      total: null,
      listQuery: {
        pageNum: 1,
        pageSize: 5,
        name: '',
        id: null
      },
      productItemOptions: [],
      list: [],
      selectProductItemValue: null
    }
  },
  methods: {
    getList () {
      this.listLoading = true
      fetchBrandList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.data.records
        this.total = response.data.total
      })
    },
    getProductItemOptions () {
      fetchListWithChildren().then(response => {
        let list = response.data
        this.productItemOptions = []
        for (let i = 0; i < list.length; i++) {
          let children = []
          if (list[i].children != null && list[i].children.length > 0) {
            for (let j = 0; j < list[i].children.length; j++) {
              children.push({label: list[i].children[j].name, value: list[i].children[j].id})
            }
          }
          this.productItemOptions.push({label: list[i].name, value: list[i].id, children: children})
        }
      })
    },
    handleAddBrand () {
      this.$router.push('/product/addBrand')
    },
    handleUpdate (index, row) {
      this.$router.push({path: '/product/updateBrand', query: {id: row.id}})
    },
    handleDelete (index, row) {
      this.$confirm('是否要删除该品牌', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBrand(row.id).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1000
          })
          this.getList()
        })
      })
    },
    handleSizeChange (val) {
      this.listQuery.pageNum = 1
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.listQuery.pageNum = val
      this.getList()
    }
  }
}
</script>
