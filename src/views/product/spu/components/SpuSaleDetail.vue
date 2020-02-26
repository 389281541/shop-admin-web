<template>
  <div style="margin-top: 50px">
    <el-form :model="value" ref="productSaleForm" label-width="120px" style="width: 600px" size="small">
      <el-form-item label="积分购买限制：">
        <el-input v-model="value.useIntegrationLimit"></el-input>
      </el-form-item>
      <el-form-item label="促销限购数量：">
        <el-input v-model="value.promotionPerLimit"></el-input>
      </el-form-item>
      <el-form-item label="选择优惠方式：">
        <el-radio-group v-model="value.promotionType" size="small">
          <el-radio-button :label="0">无优惠</el-radio-button>
          <el-radio-button :label="1">特惠促销</el-radio-button>
          <el-radio-button :label="2">满减价格</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-show="value.promotionType === 1">
        <div>
          开始时间：
          <el-date-picker
            v-model="value.promotionStartTime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            :picker-options="pickerOptions1"
            placeholder="选择开始时间">
          </el-date-picker>
        </div>
        <div class="littleMargin">
          结束时间：
          <el-date-picker
            v-model="value.promotionEndTime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            :picker-options="pickerOptions1"
            placeholder="选择结束时间">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item v-show="value.promotionType===2">
        <el-table :data="value.spuFullReductionList"
                  style="width: 80%" border>
          <el-table-column
            label="满"
            align="center"
            width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.fullPrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="立减"
            align="center"
            width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.reducePrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="handleRemoveFullReduction(scope.$index, scope.row)">删除</el-button>
              <el-button type="text" @click="handleAddFullReduction(scope.$index, scope.row)">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步，填写商品信息</el-button>
        <el-button type="primary" size="medium" @click="handleFinishCommit">完成，提交商品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SpuSaleDetail',
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 日期选择器配置
      pickerOptions1: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      }
    }
  },
  created () {
  },
  methods: {
    handleRemoveFullReduction (index, row) {
      let fullReductionList = this.value.spuFullReductionList
      if (fullReductionList.length === 1) {
        fullReductionList.pop()
        fullReductionList.push({
          fullPrice: 0,
          reducePrice: 0
        })
      } else {
        fullReductionList.splice(index, 1)
      }
    },
    handleAddFullReduction (index, row) {
      let fullReductionList = this.value.spuFullReductionList
      if (fullReductionList.length < 3) {
        fullReductionList.push({
          fullPrice: 0,
          reducePrice: 0
        })
      } else {
        this.$message({
          message: '最多只能添加三条',
          type: 'warning'
        })
      }
    },
    handlePrev () {
      this.$emit('prevStep')
    },
    handleFinishCommit () {
      this.$emit('finishCommit', this.isEdit)
    }
  }
}
</script>

<style scoped>
  .littleMargin {
    margin-top: 10px
  }
</style>
