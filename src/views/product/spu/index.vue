<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          @click="handleSearchList()"
          type="primary"
          size="small">
          查询结果
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="商品名称：">
            <el-input style="width: 203px" v-model="listQuery.name" placeholder="商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品编号：">
            <el-input style="width: 203px" v-model="listQuery.spuNo" placeholder="商品编号"></el-input>
          </el-form-item>
          <el-form-item label="商品分类：">
            <el-cascader
              clearable
              v-model="selectProductItemValue"
              :options="productItemOptions">
            </el-cascader>
          </el-form-item>
          <el-form-item label="商品品牌：">
            <el-select v-model="listQuery.brandId" placeholder="请选择品牌" clearable>
              <el-option
                v-for="item in brandOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品店铺：">
            <el-select v-model="listQuery.shopId" placeholder="全部" clearable>
              <el-option
                v-for="item in shopOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上架状态：">
            <el-select v-model="listQuery.saleStatus" placeholder="全部" clearable>
              <el-option
                v-for="item in saleStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态：">
            <el-select v-model="listQuery.auditStatus" placeholder="全部" clearable>
              <el-option
                v-for="item in auditStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="推荐状态：">
            <el-select v-model="listQuery.recommendStatus" placeholder="全部" clearable>
              <el-option
                v-for="item in recommendStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="handleAddSpu()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="productTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="120" align="center">
          <template slot-scope="scope">{{scope.row.spuNo}}</template>
        </el-table-column>
        <el-table-column label="商品名称" width="200" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.name}}</p>
          </template>
        </el-table-column>
        <el-table-column label="商品品牌" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.brandName}}</p>
          </template>
        </el-table-column>
        <el-table-column label="商品类别" width="80" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.itemName}}</p>
          </template>
        </el-table-column>
        <el-table-column label="商品店铺" width="120" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.shopName}}</p>
          </template>
        </el-table-column>
        <el-table-column label="销量" width="50" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.sale}}</p>
          </template>
        </el-table-column>
        <el-table-column label="标签" width="140" align="center">
          <template slot-scope="scope">
            <p>上架：
              <el-switch
                @change="handlePublishStatusChange(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.saleStatus">
              </el-switch>
            </p>
            <p>推荐：
              <el-switch
                @change="handleRecommendStatusChange(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.recommendStatus">
              </el-switch>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="SKU管理" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="handleShowSkuEditDialog(scope.$index, scope.row)" circle></el-button>
          </template>
        </el-table-column>
        <el-table-column label="排序" width="60" align="center">
          <template slot-scope="scope">{{scope.row.sortId}}</template>
        </el-table-column>
        <el-table-column label="审核状态" width="100" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.auditStatus | auditStatusFilter}}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
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
    <div class="batch-operate-container">
      <el-select
        size="small"
        v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small">
        确定
      </el-button>
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
    <el-dialog
      title="编辑商品信息"
      :visible.sync="editSkuInfo.dialogVisible"
      width="60%">
      <span>商品编号：</span>
      <span>{{editSkuInfo.spuNo}}</span>
      <el-input placeholder="按sku编号搜索" v-model="editSkuInfo.keyword" size="small" style="width: 50%;margin-left: 20px">
        <el-button slot="append" icon="el-icon-search" @click="handleSearchEditSku"></el-button>
      </el-input>
      <el-table style="width: 100%;margin-top: 20px"
                :data="editSkuInfo.skuList"
                border>
        <el-table-column
          label="SKU编号"
          width="180"
          align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.skuNo"></el-input>
          </template>
        </el-table-column>
        <el-table-column :label="item" v-for="item in headers" :key="item">
          <template slot-scope="scope">
            {{scope.row.skuSpecMap[item]}}
          </template>
        </el-table-column>
        <el-table-column
          label="商品库存"
          width="100"
          align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.stock"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="库存预警值"
          width="120"
          align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.lowStock"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="销量"
          width="110"
          align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.sale" :disabled="true"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="销售价格"
          width="100"
          align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.price"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="原价"
          width="100"
          align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.originalPrice"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editSkuInfo.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditSkuConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {fetchListWithChildren} from '@/api/item'
import {fetchBrandList} from '@/api/brand'
import {fetchShopList} from '@/api/shop'
import {fetchSpuList, deleteSpu, setRecommendStatus, setSaleStatus} from '@/api/spu'
import {fetchSkuList, updateSkuList} from '@/api/sku'
export default {
  name: 'spu',
  data () {
    return {
      listQuery: {
        pageNum: 1,
        pageSize: 5,
        name: null,
        spuNo: null,
        brandId: null,
        itemId: null,
        shopId: null,
        saleStatus: null,
        auditStatus: null,
        recommendStatus: null
      },
      saleStatusOptions: [{
        value: 1,
        label: '上架'
      }, {
        value: 0,
        label: '下架'
      }],
      auditStatusOptions: [{
        value: 0,
        label: '审核拒绝'
      }, {
        value: 1,
        label: '审核中'
      }, {
        value: 2,
        label: '审核通过'
      }],
      recommendStatusOptions: [{
        value: 1,
        label: '推荐'
      }, {
        value: 0,
        label: '不推荐'
      }],
      selectProductItemValue: null,
      multipleSelection: [],
      productItemOptions: [],
      brandOptions: [],
      shopOptions: [],
      list: [],
      operateType: null,
      listLoading: false,
      total: null,
      operates: [
        {
          label: '商品上架',
          value: 'publishOn'
        },
        {
          label: '商品下架',
          value: 'publishOff'
        },
        {
          label: '设为推荐',
          value: 'recommendOn'
        },
        {
          label: '取消推荐',
          value: 'recommendOff'
        },
        {
          label: '刪除',
          value: 'recycle'
        }
      ],
      editSkuInfo: {
        dialogVisible: false,
        spuId: null,
        spuNo: '',
        skuList: [],
        specMap: {},
        keyword: null
      },
      headers: []
    }
  },
  created () {
    this.getShopOptions()
    this.getBrandOptions()
    this.getProductItemOptions()
    this.getList()
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
    }
  },
  watch: {
    selectProductItemValue: function (newValue) {
      if (newValue != null && newValue.length === 2) {
        this.listQuery.itemId = newValue[1]
      } else {
        this.listQuery.itemId = null
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.listQuery.pageNum = 1
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.listQuery.pageNum = val
      this.getList()
    },
    handleSearchList () {
      this.listQuery.pageNum = 1
      this.getList()
    },
    getList () {
      this.listLoading = true
      fetchSpuList(this.listQuery).then(response => {
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
    getBrandOptions () {
      fetchBrandList({pageNum: 1, pageSize: 1000}).then(response => {
        this.brandOptions = []
        let brandList = response.data.records
        for (let i = 0; i < brandList.length; i++) {
          this.brandOptions.push({label: brandList[i].name, value: brandList[i].id})
        }
      })
    },
    getShopOptions () {
      fetchShopList({pageNum: 1, pageSize: 1000}).then(response => {
        this.shopOptions = []
        let shopList = response.data.records
        for (let i = 0; i < shopList.length; i++) {
          this.shopOptions.push({label: shopList[i].name, value: shopList[i].id})
        }
      })
    },
    handleAddSpu () {
      this.$router.push({path: '/product/addSpu'})
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handlePublishStatusChange (index, row) {
      let ids = []
      ids.push(row.id)
      this.updateSaleStatus(row.saleStatus, ids)
    },
    handleRecommendStatusChange (index, row) {
      let ids = []
      ids.push(row.id)
      this.updateRecommendStatus(row.recommendStatus, ids)
    },
    updateSaleStatus (saleStatus, ids) {
      setSaleStatus({
        status: saleStatus,
        ids: ids
      })
    },
    updateRecommendStatus (recommendStatus, ids) {
      setRecommendStatus({
        status: recommendStatus,
        ids: ids
      })
    },
    handleUpdate (index, row) {
      this.$router.push({path: '/product/updateSpu', query: {id: row.id}})
    },
    handleDelete (index, row) {
      this.$confirm('是否要删除该商品', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSpu(row.id).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1000
          })
          this.getList()
        })
      })
    },
    handleBatchOperate () {
      if (this.operateType === null) {
        this.$message({
          message: '请选择操作类型',
          type: 'warning',
          duration: 1000
        })
        return
      }
      if (this.multipleSelection === null || this.multipleSelection.length < 1) {
        this.$message({
          message: '请选择要操作的商品',
          type: 'warning',
          duration: 1000
        })
        return
      }
      this.$confirm('是否要进行该批量操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id)
        }
        switch (this.operateType) {
          case this.operates[0].value:
            this.updateSaleStatus(1, ids)
            break
          case this.operates[1].value:
            this.updateSaleStatus(0, ids)
            break
          case this.operates[2].value:
            this.updateRecommendStatus(1, ids)
            break
          case this.operates[3].value:
            this.updateRecommendStatus(0, ids)
            break
          default:
            break
        }
        this.getList()
      })
    },
    handleShowSkuEditDialog (index, row) {
      this.editSkuInfo.dialogVisible = true
      this.editSkuInfo.spuId = row.id
      this.editSkuInfo.spuNo = row.spuNo
      this.editSkuInfo.keyword = null
      fetchSkuList({id: row.id, keyword: this.editSkuInfo.keyword}).then(response => {
        this.editSkuInfo.skuList = response.data
        this.headers = []
        // 获取header
        for (let i = 0; i < this.editSkuInfo.skuList[0].skuSpecList.length; i++) {
          this.headers.push(this.editSkuInfo.skuList[0].skuSpecList[i].specName)
        }
      })
    },
    handleSearchEditSku () {
      fetchSkuList({id: this.editSkuInfo.spuId, keyword: this.editSkuInfo.keyword}).then(response => {
        this.editSkuInfo.skuList = response.data
      })
    },
    handleEditSkuConfirm () {
      if (this.editSkuInfo.skuList === null || this.editSkuInfo.skuList.length <= 0) {
        this.$message({
          message: '暂无sku信息',
          type: 'warning',
          duration: 1000
        })
        return
      }
      this.$confirm('是否要进行修改', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateSkuList({skuUpdateDTOList: this.editSkuInfo.skuList}).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          })
          this.editSkuInfo.dialogVisible = false
        })
      })
    }
  }
}

</script>
<style></style>
