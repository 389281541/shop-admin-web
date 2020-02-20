<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="coupon"
             :rules="rules"
             ref="couponForm"
             label-width="150px"
             size="small">
      <el-form-item label="优惠券类型：">
        <el-select v-model="coupon.type">
          <el-option
            v-for="type in typeOptions"
            :key="type.value"
            :label="type.label"
            :value="type.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="优惠券名称：" prop="name">
        <el-input v-model="coupon.name" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="总发行量：" prop="publishNum">
        <el-input v-model.number="coupon.publishNum" placeholder="只能输入正整数" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="面额：" prop="amount">
        <el-input v-model.number="coupon.amount" placeholder="面值只能是数值，限2位小数" class="input-width">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="每人限领：">
        <el-input v-model="coupon.receiveNumLimit" placeholder="只能输入正整数" class="input-width">
          <template slot="append">张</template>
        </el-input>
      </el-form-item>
      <el-form-item label="使用门槛：" prop="useConditionLimit">
        <el-input v-model.number="coupon.useConditionLimit" placeholder="只能输入正整数" class="input-width">
          <template slot="prepend">满</template>
          <template slot="append">分可用</template>
        </el-input>
      </el-form-item>
      <el-form-item label="有效期：">
        <el-date-picker type="date" placeholder="选择日期" v-model="coupon.startEffectTime" style="width: 150px" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        <span style="margin-left: 20px;margin-right: 20px">至</span>
        <el-date-picker type="date" placeholder="选择日期" v-model="coupon.endEffectTime" style="width: 150px" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
      </el-form-item>
      <el-form-item label="可使用商品：">
        <el-radio-group v-model="coupon.scopeType">
          <el-radio-button :label="0">全场通用</el-radio-button>
          <el-radio-button :label="1">指定分类</el-radio-button>
          <el-radio-button :label="2">指定商品</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-show="coupon.scopeType===1">
        <el-cascader
          clearable
          placeholder="请选择分类名称"
          v-model="selectSpuItem"
          :options="itemOptions">
        </el-cascader>
        <el-button @click="handleAddProductCategoryRelation()">添加</el-button>
        <el-table ref="productCateRelationTable"
                  :data="coupon.couponItemList"
                  style="width: 100%; margin-top: 20px"
                  border>
          <el-table-column label="分类名称" align="center">
            <template slot-scope="scope">{{scope.row.parentItemName}}>{{scope.row.itemName}}</template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="100">
            <template slot-scope="scope">
              <el-button size="mini"
                         type="text"
                         @click="handleDeleteProductCateRelation(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item v-show="coupon.scopeType===2">
        <el-select
          v-model="selectProduct"
          filterable
          remote
          reserve-keyword
          placeholder="商品名称/商品货号"
          :remote-method="searchSpuMethod"
          :loading="selectProductLoading">
          <el-option
            v-for="item in selectSpuOptions"
            :key="item.spuId"
            :label="item.spuName"
            :value="item.spuId">
            <span style="float: left">{{ item.spuName }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">NO.{{ item.spuNo }}</span>
          </el-option>
        </el-select>
        <el-button @click="handleAddSpuRelation()">添加</el-button>
        <el-table ref="productRelationTable"
                  :data="coupon.couponSpuList"
                  style="width: 100%;couponSpuList: 20px"
                  border>
          <el-table-column label="商品名称" align="center">
            <template slot-scope="scope">{{scope.row.spuName}}</template>
          </el-table-column>
          <el-table-column label="货号" align="center"  width="120" >
            <template slot-scope="scope">NO.{{scope.row.spuNo}}</template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="100">
            <template slot-scope="scope">
              <el-button size="mini"
                         type="text"
                         @click="handleDeleteProductRelation(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input
          class="input-width"
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="coupon.note">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('couponForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('couponForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import {createCoupon, getCoupon, updateCoupon} from '@/api/coupon'
import {fetchSimpleList as fetchSpuList} from '@/api/spu'
import {fetchListWithChildren} from '@/api/item'
const defaultCoupon = {
  id: null,
  type: 0,
  name: null,
  amount: null,
  receiveNumLimit: 1,
  useConditionType: null,
  useConditionLimit: null,
  startEffectTime: null,
  endEffectTime: null,
  scopeType: 0,
  note: null,
  publishNum: null,
  couponSpuList: [],
  couponItemList: []
}
const defaultTypeOptions = [
  {
    label: '全场赠券',
    value: 0
  },
  {
    label: '会员赠券',
    value: 1
  },
  {
    label: '购物赠券',
    value: 2
  },
  {
    label: '注册赠券',
    value: 3
  }
]
export default {
  name: 'CouponDetail',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      coupon: Object.assign({}, defaultCoupon),
      typeOptions: Object.assign({}, defaultTypeOptions),
      rules: {
        name: [
          {required: true, message: '请输入优惠券名称', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        ],
        publishNum: [
          {type: 'number', required: true, message: '只能输入正整数', trigger: 'blur'}
        ],
        amount: [
          {type: 'number', required: true, message: '面值只能是数值，0.01-10000，限2位小数', trigger: 'blur'}
        ],
        minPoint: [
          {type: 'number', required: true, message: '只能输入正整数', trigger: 'blur'}
        ]
      },
      selectProduct: null,
      selectProductLoading: false,
      selectSpuOptions: [],
      selectSpuItem: null,
      itemOptions: []
    }
  },
  created () {
    if (this.isEdit) {
      this.id = this.$route.query.id
      getCoupon(this.id).then(response => {
        this.coupon = response.data
      })
    }
    this.getProductCateList()
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否提交数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.coupon.useConditionLimit === 0) {
              this.coupon.useConditionType = 0
            } else {
              this.coupon.useConditionType = 1
            }
            if (this.isEdit) {
              this.coupon.id = this.id
              this.$set(this.coupon, 'id', this.id)
              updateCoupon(this.coupon).then(response => {
                this.$refs[formName].resetFields()
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 1000
                })
                this.$router.back()
              })
            } else {
              createCoupon(this.coupon).then(response => {
                this.$refs[formName].resetFields()
                this.$message({
                  message: '提交成功',
                  type: 'success',
                  duration: 1000
                })
                this.$router.back()
              })
            }
          })
        } else {
          this.$message({
            message: '验证失败',
            type: 'error',
            duration: 1000
          })
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.coupon = Object.assign({}, defaultCoupon)
    },
    searchSpuMethod (query) {
      if (query !== '') {
        this.selectProductLoading = true
        fetchSpuList({keyword: query}).then(response => {
          this.selectProductLoading = false
          let productList = response.data
          this.selectSpuOptions = []
          for (let i = 0; i < productList.length; i++) {
            let item = productList[i]
            this.selectSpuOptions.push({spuId: item.id, spuName: item.name, spuNo: item.spuNo})
          }
        })
      } else {
        this.selectSpuOptions = []
      }
    },
    handleAddSpuRelation () {
      if (this.selectProduct === null) {
        this.$message({
          message: '请先选择商品',
          type: 'warning'
        })
        return
      }
      this.coupon.couponSpuList.push(this.getProductById(this.selectProduct))
      this.selectProduct = null
    },
    handleDeleteProductRelation (index, row) {
      this.coupon.couponSpuList.splice(index, 1)
    },
    handleAddProductCategoryRelation () {
      if (this.selectSpuItem === null || this.selectSpuItem.length === 0) {
        this.$message({
          message: '请先选择商品分类',
          type: 'warning'
        })
        return
      }
      this.coupon.couponItemList.push(this.getProductCateByIds(this.selectSpuItem))
      this.selectSpuItem = []
    },
    handleDeleteProductCateRelation (index, row) {
      this.coupon.couponItemList.splice(index, 1)
    },
    getProductById (id) {
      for (let i = 0; i < this.selectSpuOptions.length; i++) {
        if (id === this.selectSpuOptions[i].spuId) {
          return this.selectSpuOptions[i]
        }
      }
      return null
    },
    getProductCateList () {
      fetchListWithChildren().then(response => {
        let list = response.data
        this.itemOptions = []
        for (let i = 0; i < list.length; i++) {
          let children = []
          if (list[i].children != null && list[i].children.length > 0) {
            for (let j = 0; j < list[i].children.length; j++) {
              children.push({label: list[i].children[j].name, value: list[i].children[j].id})
            }
          }
          this.itemOptions.push({label: list[i].name, value: list[i].id, children: children})
        }
      })
    },
    getProductCateByIds (ids) {
      let name
      let parentName
      for (let i = 0; i < this.itemOptions.length; i++) {
        if (this.itemOptions[i].value === ids[0]) {
          parentName = this.itemOptions[i].label
          for (let j = 0; j < this.itemOptions[i].children.length; j++) {
            if (this.itemOptions[i].children[j].value === ids[1]) {
              name = this.itemOptions[i].children[j].label
            }
          }
        }
      }
      return {itemId: ids[1], itemName: name, parentItemName: parentName}
    }
  }
}
</script>
<style scoped>
  .input-width {
    width: 60%
  }
</style>
