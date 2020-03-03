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
          <el-form-item label="广告位置：">
            <el-select v-model="listQuery.type" placeholder="全部" clearable class="input-width">
              <el-option
                v-for="item in selectTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上线状态：">
            <el-select v-model="listQuery.status" placeholder="全部" clearable class="input-width">
              <el-option
                v-for="item in selectStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-card>
  <el-card class="operate-container" shadow="never">
    <i class="el-icon-tickets"></i>
    <span>广告列表</span>
    <el-button
      class="btn-add"
      @click="handleAddHomeAdvertise()"
      size="mini">
      添加
    </el-button>
  </el-card>
  <div class="table-container">
    <el-table style="width: 100%"
              :data="list"
              v-loading="listLoading" border>
      <el-table-column label="序号" width="100" align="center">
        <template slot-scope="scope">{{scope.row.sortId}}</template>
      </el-table-column>
      <el-table-column label="主题" align="center">
        <template slot-scope="scope">{{scope.row.theme}}</template>
      </el-table-column>
      <el-table-column label="位置" align="center">
        <template slot-scope="scope">{{scope.row.type | typeFilter}}</template>
      </el-table-column>
      <el-table-column label="上线状态" align="center">
        <template slot-scope="scope">{{scope.row.status | statusFilter}}</template>
      </el-table-column>
      <el-table-column label="图片" width="300" align="center">
        <template slot-scope="scope"><img style="height: 80px" :src="scope.row.imgUrl"></template>
      </el-table-column>
      <el-table-column label="跳转链接" width="100" align="center">
        <template slot-scope="scope">{{scope.row.forwardUrl}}</template>
      </el-table-column>
      <el-table-column label="备注" width="100" align="center">
        <template slot-scope="scope">{{scope.row.note}}</template>
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
import {fetchHomeAdvertiseList, removeHomeAdvertise} from '@/api/homeAdvertise'
export default {
  name: 'homeAdvertise',
  created () {
    this.getList()
  },
  filters: {
    typeFilter (value) {
      if (value === 0) {
        return '首页轮播图'
      } else if (value === 1) {
        return '首页活动位'
      }
    },
    statusFilter (value) {
      if (value === 0) {
        return '未上线'
      } else if (value === 1) {
        return '已上线'
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
        type: null,
        status: null
      },
      list: [],
      selectTypeOptions: [
        {
          value: 0,
          label: '首页轮播图'
        }, {
          value: 1,
          label: '首页活动位'
        }
      ],
      selectStatusOptions: [
        {
          value: 0,
          label: '未上线'
        }, {
          value: 1,
          label: '已上线'
        }
      ]
    }
  },
  methods: {
    getList () {
      this.listLoading = true
      fetchHomeAdvertiseList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.data.records
        this.total = response.data.total
      })
    },
    handleAddHomeAdvertise () {
      this.$router.push('/activity/addHomeAdvertise')
    },
    handleUpdate (index, row) {
      this.$router.push({path: '/activity/updateHomeAdvertise', query: {id: row.id}})
    },
    handleDelete (index, row) {
      this.$confirm('是否要删除该广告信息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeHomeAdvertise(row.id).then(response => {
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
