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
          <el-form-item label="商铺名称：">
            <el-input style="width: 200px" v-model="listQuery.name" aria-placeholder="商铺名称/关键字"></el-input>
          </el-form-item>
          <el-form-item label="商铺类型：">
            <el-select v-model="listQuery.type" placeholder="全部" clearable class="input-width">
              <el-option
                v-for="item in selectTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态：">
            <el-select v-model="listQuery.auditStatus" placeholder="全部" clearable class="input-width">
              <el-option
                v-for="item in selectAuditStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="店主名字：">
            <el-input style="width: 200px" v-model="listQuery.keeperName" aria-placeholder="店主名字"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：">
            <el-input style="width: 200px" v-model="listQuery.phoneNumber" aria-placeholder="联系电话"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-card>
  <el-card class="operate-container" shadow="never">
    <i class="el-icon-tickets"></i>
    <span>商铺列表</span>
    <el-button
      class="btn-add"
      @click="handleAddShop()"
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
      <el-table-column label="商铺名称" align="center">
        <template slot-scope="scope">{{scope.row.name}}</template>
      </el-table-column>
      <el-table-column label="商铺类型" width="200" align="center">
        <template slot-scope="scope">{{scope.row.type | typeFilter}}</template>
      </el-table-column>
      <el-table-column label="LOGO" width="100" align="center">
        <template slot-scope="scope">{{scope.row.logo}}</template>
      </el-table-column>
      <el-table-column label="店主" width="100" align="center">
        <template slot-scope="scope">{{scope.row.keeperName}}</template>
      </el-table-column>
      <el-table-column label="联系电话" width="150" align="center">
        <template slot-scope="scope">{{scope.row.phoneNumber}}</template>
      </el-table-column>
      <el-table-column label="审核状态" width="200" align="center">
        <template slot-scope="scope">{{scope.row.auditStatus | auditStatusFilter}}</template>
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
import {fetchShopList, deleteShop} from '@/api/shop'
export default {
  created () {
    this.getList()
  },
  data () {
    return {
      listLoading: false,
      total: null,
      listQuery: {
        name: null,
        type: null,
        keeperName: null,
        phoneNumber: null,
        auditStatus: null,
        pageNum: 1,
        pageSize: 5
      },
      list: [],
      selectAuditStatusOptions: [
        {
          value: 0,
          label: '审核拒绝'
        }, {
          value: 1,
          label: '审核中'
        }, {
          value: 2,
          label: '审核通过'
        }
      ],
      selectTypeOptions: [
        {
          value: 1,
          label: '自营'
        }, {
          value: 2,
          label: '平台'
        }
      ]
    }
  },
  filters: {
    auditStatusFilter (value) {
      if (value === 0) {
        return '审核拒绝'
      } else if (value === 1) {
        return '审核中'
      } else if (value === 2) {
        return '审核通过'
      }
    },
    typeFilter (value) {
      if (value === 1) {
        return '自营'
      } else if (value === 2) {
        return '平台'
      }
    }
  },
  methods: {
    getList () {
      this.listLoading = true
      fetchShopList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.data.records
        this.total = response.data.total
      })
    },
    handleAddShop () {
      this.$router.push('/product/addShop')
    },
    handleUpdate (index, row) {
      this.$router.push({path: '/product/updateShop', query: {id: row.id}})
    },
    handleDelete (index, row) {
      this.$confirm('是否要删除该品牌', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteShop(row.id).then(response => {
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
