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
            <el-form-item label="属性名称：">
              <el-input style="width: 200px" v-model="listQuery.name" aria-placeholder="属性名称/关键字"></el-input>
            </el-form-item>
            <el-form-item label="属性分类：">
                <el-cascader placeholder="请选择分类" clearable class="input-width"
                  v-model="selectProductItemValue"
                  :options="productItemOptions">
                </el-cascader>
            </el-form-item>
            <el-form-item label="颜色属性：">
              <el-select v-model="listQuery.color" placeholder="全部" clearable class="input-width">
                <el-option
                  v-for="item in booleanOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="枚举属性：">
              <el-select v-model="listQuery.enumeration" placeholder="全部" clearable class="input-width">
                <el-option
                  v-for="item in booleanOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="输入属性：">
              <el-select v-model="listQuery.input" placeholder="全部" clearable class="input-width">
                <el-option
                  v-for="item in booleanOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="关键属性：">
              <el-select v-model="listQuery.key" placeholder="全部" clearable class="input-width">
                <el-option
                  v-for="item in booleanOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="销售属性：">
              <el-select v-model="listQuery.sku" placeholder="全部" clearable class="input-width">
                <el-option
                  v-for="item in booleanOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="搜索属性：">
              <el-select v-model="listQuery.search" placeholder="全部" clearable class="input-width">
                <el-option
                  v-for="item in booleanOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="多选属性：">
              <el-select v-model="listQuery.multiple" placeholder="全部" clearable class="input-width">
                <el-option
                  v-for="item in booleanOptions"
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
      <span>属性列表</span>
      <el-button
        class="btn-add"
        @click="handleAddSpecName()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table style="width: 100%"
                :data="list"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="80" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="属性名称" width="100" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
<!--        <el-table-column label="存在别名" width="100" align="center">-->
<!--          <template slot-scope="scope">{{scope.row.existAlias | verifyStatusFilter}}</template>-->
<!--        </el-table-column>-->
        <el-table-column label="颜色属性" width="80" align="center">
          <template slot-scope="scope">{{scope.row.color | verifyStatusFilter}}</template>
        </el-table-column>
        <el-table-column label="枚举属性" width="80" align="center">
          <template slot-scope="scope">{{scope.row.enumeration | verifyStatusFilter}}</template>
        </el-table-column>
        <el-table-column label="输入属性" width="80" align="center">
          <template slot-scope="scope">{{scope.row.input | verifyStatusFilter}}</template>
        </el-table-column>
        <el-table-column label="关键属性" width="80" align="center">
          <template slot-scope="scope">{{scope.row.key | verifyStatusFilter}}</template>
        </el-table-column>
        <el-table-column label="销售属性" width="80" align="center">
          <template slot-scope="scope">{{scope.row.sku | verifyStatusFilter}}</template>
        </el-table-column>
        <el-table-column label="搜索属性" width="80" align="center">
          <template slot-scope="scope">{{scope.row.search | verifyStatusFilter}}</template>
        </el-table-column>
        <el-table-column label="多选属性" width="80" align="center">
          <template slot-scope="scope">{{scope.row.multiple | verifyStatusFilter}}</template>
        </el-table-column>
        <el-table-column label="属性值" align="center">
          <template slot-scope="scope">{{scope.row.specValues | specValueFilter}}</template>
        </el-table-column>
        <el-table-column label="属性值设置" width="100" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="handleEditSpecValues(scope.$index, scope.row)" circle>
            </el-button>
          </template>
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
import {fetchSpecNameList, deleteSpecName} from '@/api/specName'
import {fetchListWithChildren} from '@/api/item'
export default {
  name: 'SpecName',
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
        id: null,
        name: '',
        color: null,
        enumeration: null,
        input: null,
        key: null,
        sku: null,
        search: null,
        multiple: null,
        pageNum: 1,
        pageSize: 5
      },
      booleanOptions: [
        {
          value: 1,
          label: '是'
        }, {
          value: 0,
          label: '否'
        }],
      list: [],
      productItemOptions: [],
      selectProductItemValue: null
    }
  },
  filters: {
    verifyStatusFilter (value) {
      if (value === 1) {
        return '是'
      } else {
        return '否'
      }
    },
    specValueFilter (value) {
      let specValues = value
      let result = ''
      for (let i = 0; i < specValues.length; i++) {
        result = result + specValues[i].name
        if (i !== specValues.length - 1) {
          result = result + ','
        }
      }
      return result
    }
  },
  methods: {
    getList () {
      this.listLoading = true
      fetchSpecNameList(this.listQuery).then(response => {
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
    handleAddSpecName () {
      this.$router.push('/product/addSpecName')
    },
    handleUpdate (index, row) {
      this.$router.push({path: '/product/updateSpecName', query: {id: row.id}})
    },
    handleDelete (index, row) {
      this.$confirm('是否要删除该属性', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSpecName(row.id).then(response => {
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
    },
    handleEditSpecValues (index, row) {
      this.$router.push({path: '/product/SpecValue', query: {id: row.id}})
    }
  }
}
</script>
