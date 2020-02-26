<template>
  <el-card class="form-container" shadow="never">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="填写商品信息"></el-step>
      <el-step title="填写商品关联属性"></el-step>
      <el-step title="填写商品促销"></el-step>
    </el-steps>
    <spu-info-detail
      v-show="showStatus[0]"
      v-model="spuParam"
      :is-edit="isEdit"
      @nextStep="nextStep">
    </spu-info-detail>
    <spu-attr-detail
      v-show="showStatus[1]"
      v-model="spuParam"
      :is-edit="isEdit"
      @nextStep="nextStep"
      @prevStep="prevStep">
    </spu-attr-detail>
    <spu-sale-detail
      v-show="showStatus[2]"
      v-model="spuParam"
      :is-edit="isEdit"
      @prevStep="prevStep"
      @finishCommit="finishCommit">
    </spu-sale-detail>
  </el-card>
</template>
<script>
import SpuInfoDetail from './SpuInfoDetail'
import SpuAttrDetail from './SpuAttrDetail'
import SpuSaleDetail from './SpuSaleDetail'
import {createSpu, getSpu, updateSpu} from '@/api/spu'
import {fetchListByItemId} from '@/api/specName'

const defaultSpuParam = {
  id: null,
  name: null,
  spuNo: null,
  brandId: null,
  brandName: null,
  itemId: null,
  parentItemId: null,
  itemName: null,
  shopId: null,
  shopName: null,
  sale: null,
  unit: null,
  description: null,
  saleStatus: null,
  auditStatus: null,
  sortId: null,
  recommendStatus: null,
  useIntegrationLimit: null,
  promotionPerLimit: null,
  promotionType: null,
  promotionStartTime: null,
  promotionEndTime: null,
  skuList: [],
  spuImgList: [],
  spuSpecList: [],
  spuFullReductionList: [{fullPrice: 0, reducePrice: 0}],
  attrHeaders: [],
  skuSpecNameList: [],
  spuSpecNameList: []
  // ,
  // selectSpuItemValue: []
}
export default {
  name: 'SpuDetail',
  components: {SpuInfoDetail, SpuAttrDetail, SpuSaleDetail},
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      id: null,
      active: 0,
      spuParam: Object.assign({}, defaultSpuParam),
      showStatus: [true, false, false],
      showAttr: false
    }
  },
  created () {
    if (this.isEdit) {
      this.spuParam.id = this.$route.query.id
      this.id = this.spuParam.id
      this.spuParam.showAttr = false
      getSpu(this.id).then(response => {
        this.spuParam = response.data
        this.getSpecList(this.spuParam.itemId, this.spuParam.id)
        // this.spuParam.selectSpuItemValue = []
        // this.spuParam.selectSpuItemValue.push(this.spuParam.parentItemId)
        // this.spuParam.selectSpuItemValue.push(this.spuParam.itemId)
        this.spuParam.attrHeaders = []
        for (let i = 0; i < this.spuParam.skuList[0].skuSpecList.length; i++) {
          this.spuParam.attrHeaders.push(this.spuParam.skuList[0].skuSpecList[i].specName)
        }
      })
    }
  },
  methods: {
    hideAll () {
      for (let i = 0; i < this.showStatus.length; i++) {
        this.showStatus[i] = false
      }
    },
    prevStep () {
      if (this.active > 0 && this.active < this.showStatus.length) {
        this.active--
        this.hideAll()
        this.showStatus[this.active] = true
      }
    },
    nextStep () {
      if (this.active < this.showStatus.length - 1) {
        this.active++
        this.hideAll()
        this.showStatus[this.active] = true
      }
    },
    finishCommit (isEdit) {
      this.$confirm('是否要提交该产品', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (isEdit) {
          this.spuParam.id = this.id
          this.$set(this.spuParam, 'id', this.id)
          updateSpu(this.spuParam).then(response => {
            this.$message({
              type: 'success',
              message: '提交成功',
              duration: 1000
            })
            this.$router.back()
          })
        } else {
          createSpu(this.spuParam).then(response => {
            this.$message({
              type: 'success',
              message: '提交成功',
              duration: 1000
            })
            location.reload()
          })
        }
      })
    },
    getSpecList (itemId, spuId) {
      fetchListByItemId({itemId: itemId, spuId: spuId}).then(response => {
        this.spuParam.skuSpecNameList = response.data.skuSpecList
        this.spuParam.spuSpecNameList = response.data.spuSpecList
        this.spuParam.showAttr = true
      })
    }
  }
}
</script>
<style>
  .form-container {
    width: 800px;
  }
</style>
