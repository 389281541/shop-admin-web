<template>
  <div style="margin-top: 50px">
    <el-form :model="value" ref="spuAttrForm" label-width="120px" style="width: 720px" size="small">
      <el-form-item label="商品类别：" prop="itemId">
        <el-cascader
          clearable
          v-model="selectProductItemValue"
          :options="itemOptions">
        </el-cascader>
      </el-form-item>
      <el-form-item label="商品规格：">
        <el-card shadow="never" class="cardBg">
        </el-card>
      </el-form-item>
      <el-form-item label="商品参数：">
      </el-form-item>

    </el-form>
  </div>
</template>
<script>
import {fetchListWithChildren} from '@/api/item'
import {fetchListByItemId} from '@/api/specName'

export default {
  data () {
    return {
      itemOptions: [],
      skuSpecList: [],
      spuSpecList: [],
      selectProductItemValue: null,
      rules: {
        itemId: [{required: true, message: '请选择商品分类', trigger: 'blur'}]
      }
    }
  },
  created () {
    this.getItemOptions()
    this.getSpecList()
  },
  watch: {
    selectProductItemValue: function (newValue) {
      if (newValue != null && newValue.length === 2) {
        this.value.itemId = newValue[1]
        this.value.itemName = this.getItemNameById(this.value.itemId)
      } else {
        this.value.itemId = null
        this.value.itemName = null
      }
    }
  },
  methods: {
    getItemOptions () {
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
    getItemNameById (id) {
      let name = null
      for (let i = 0; i < this.itemOptions.length; i++) {
        for (let j = 0; i < this.itemOptions[i].children.length; j++) {
          if (this.itemOptions[i].children[j].value === id) {
            name = this.itemOptions[i].children[j].label
            return name
          }
        }
      }
      return name
    },
    getSpecList () {
      fetchListByItemId({id: this.value.itemId}).then(response => {
        this.skuSpecList = response.data.skuSpecList
        this.spuSpecList = response.data.spuSpecList
      })
    }
  }
}

</script>
<style scoped>
</style>
