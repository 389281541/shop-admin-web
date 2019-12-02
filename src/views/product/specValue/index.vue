<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">{{specName}}：属性值列表</span>
      <el-button
        class="btn-add"
        @click="handleAdd()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table style="width: 100%"
                :data="list"
                v-loading="listLoading" border>
        <el-table-column label="序号" width="150" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="属性值" width="200" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="创建时间"  align="center">
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
import {fetchSpecValueList, deleteSpecValue} from '@/api/SpecValue'
export default {
  name: 'SpecValue',
  data () {
    return {
      specName: '',
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
    this.listQuery.id = this.$route.query.id
    this.getList()
  },
  methods: {
    getList () {
      this.listLoading = true
      fetchSpecValueList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.data.specValuePage.records
        this.total = response.data.specValuePage.total
        this.specName = response.data.specName
      })
    },
    handleAdd () {
      this.$router.push('/product/addSpecValue')
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
      this.$router.push({path: '/product/updateSpecValue', query: {id: row.id}})
    },
    handleDelete (index, row) {
      this.$confirm('是否要删除该类别', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSpecValue(row.id).then(response => {
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
