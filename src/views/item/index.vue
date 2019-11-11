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
      <el-table style="width: 100%"
                :data="list"
                v-loading="listLoading" border>
        <el-table-column label="序号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="类别编码"  align="center">
          <template slot-scope="scope">{{scope.row.itemNo}}</template>
        </el-table-column>
        <el-table-column label="分类名称" width="150" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="级别" width="100" align="center">
          <template slot-scope="scope">{{scope.row.level}}</template>
        </el-table-column>
        <el-table-column label="父类名称" width="150" align="center">
          <template slot-scope="scope">{{scope.row.parentName}}</template>
        </el-table-column>
        <el-table-column label="设置" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :disabled="!scope.row.parent"
              @click="handleShowNextLevel(scope.$index, scope.row)">查看下级
            </el-button>
            <el-button
              size="mini"
              :disabled="scope.row.parent"
              @click="handleShowLastLevel(scope.$index, scope.row)">查看上级
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="300" align="center">
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
import {fetchList, deleteItem} from '@/api/item'
export default {
  name: 'itemList',
  data () {
    return {
      list: [],
      listLoading: false,
      total: null,
      listQuery: {
        id: null,
        pageNum: 1,
        pageSize: 5
      }
    }
  },
  created () {
    this.getList()
  },
  watch: {
  },
  methods: {
    getList () {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.data.records
        this.total = response.data.total
      })
    },
    handleAddItem () {
      this.$router.push('/item/add')
    },
    handleShowNextLevel (index, row) {
      this.listQuery.id = row.id
      this.getList()
    },
    handleShowLastLevel (index, row) {
      this.listQuery.id = null
      this.listQuery.pageNum = 1
      this.getList()
    },
    handleSizeChange (val) {
      this.listQuery.pageNum = 1
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.listQuery.pageNum = val
      this.getList()
    },
    handleUpdate (index, row) {
      console.log('id=' + row.id)
      this.$router.push({path: '/item/update', query: {id: row.id}})
    },
    handleDelete (index, row) {
      this.$confirm('是否要删除该品牌', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteItem(row.id).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1000
          })
          this.getList()
        })
      })
    }
  }
}
</script>
