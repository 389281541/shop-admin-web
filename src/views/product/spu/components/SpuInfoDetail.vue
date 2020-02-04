<template>
  <div style="margin-top: 50px">
    <el-form :model="value" :rules="rules" ref="spuInfoForm" label-width="120px" style="width: 600px" size="small">
      <el-form-item label="商品名称：" prop="name">
        <el-input v-model="value.name"></el-input>
      </el-form-item>
      <el-form-item label="商品编号：">
        <el-input v-model="value.spuNo"></el-input>
      </el-form-item>
      <el-form-item label="商品品牌：" prop="brandId">
        <el-select
          v-model="value.brandId"
          @change="handleBrandChange"
          placeholder="请选择品牌">
          <el-option
            v-for="item in brandOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品店铺：" prop="shopId">
        <el-select
          v-model="value.shopId"
          @change="handleShopChange"
          placeholder="请选择店铺">
          <el-option
            v-for="item in shopOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="销量：">
        <el-input v-model="value.sale" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="计量单位：">
        <el-input v-model="value.unit"></el-input>
      </el-form-item>
      <el-form-item label="商品介绍：" prop="description">
        <el-input
          :autoSize="true"
          v-model="value.description"
          type="textarea"
          placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="商品上架：">
        <el-switch
          v-model="value.saleStatus"
          :active-value="0"
          :inactive-value="1">
        </el-switch>
      </el-form-item>
      <el-form-item label="商品推荐：">
        <el-switch
          v-model="value.recommendStatus"
          :active-value="0"
          :inactive-value="1">
        </el-switch>
      </el-form-item>
      <el-form-item label="排序：" prop="sortId">
        <el-input v-model="value.sortId"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleNext('spuInfoForm')">下一步，填写商品关联属性</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {fetchBrandList} from '@/api/brand'
import {fetchShopList} from '@/api/shop'
export default {
  name: 'SpuInfoDetail',
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      itemOptions: [],
      brandOptions: [],
      shopOptions: [],
      selectProductItemValue: null,
      rules: {
        name: [
          {required: true, message: '请输入商品名称', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        ],
        shopId: [{required: true, message: '请选择店铺', trigger: 'blur'}],
        brandId: [{required: true, message: '请选择商品品牌', trigger: 'blur'}],
        description: [{required: true, message: '请输入商品介绍', trigger: 'blur'}],
        sortId: [{required: true, message: '请输入排序', trigger: 'blur'}]
      }
    }
  },
  created () {
    this.getBrandOptions()
    this.getShopOptions()
  },
  methods: {
    handleBrandChange (val) {
      let brandName = ''
      for (let i = 0; i < this.brandOptions.length; i++) {
        if (this.brandOptions[i].value === val) {
          brandName = this.brandOptions[i].label
          break
        }
      }
      this.value.brandName = brandName
    },
    handleShopChange (val) {
      let shopName = ''
      for (let i = 0; i < this.shopOptions.length; i++) {
        if (this.shopOptions[i].value === val) {
          shopName = this.shopOptions[i].label
          break
        }
      }
      this.value.shopName = shopName
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
    handleNext (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('nextStep')
        } else {
          this.$message({
            message: '验证失败',
            type: 'error',
            duration: 1000
          })
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
</style>
