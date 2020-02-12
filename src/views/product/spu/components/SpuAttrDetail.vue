<template>
  <div style="margin-top: 50px">
    <el-form :model="value" ref="spuAttrForm" label-width="120px" style="width: 720px" size="small">
      <el-form-item label="商品类别：" prop="itemId">
        <el-cascader
          clearable
          v-model="selectSpuItemValue"
          @change="handleSpuAttrChange"
          :options="itemOptions">
        </el-cascader>
      </el-form-item>
      <el-form-item label="商品规格：">
        <el-card shadow="never" class="cardBg">
          <div v-for="skuSpec in skuSpecList" :key="skuSpec.id">
            {{skuSpec.name}}：
            <el-checkbox-group v-model="selectSkuSpecValues[skuSpec.specNameId]">
              <el-checkbox v-for="item in skuSpec.specValues" :label="item.id" :key="item.id"
                           class="littleMarginLeft"></el-checkbox>
            </el-checkbox-group>
          </div>
        </el-card>
      </el-form-item>
      <el-table style="width: 100%;margin-top: 20px"
                :data="value.skuList"
                border>
        <el-table-column
          label="SKU编号"
          align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.skuNo"></el-input>
          </template>
        </el-table-column>
        <template slot-scope="scope">
          <el-table-column v-for="item in scope.row.skuSpecList"
                           :label="item.specName"
                           :key="item.id"
                           :prop="item.specValue"
                           align="center">
          </el-table-column>
        </template>
        <el-table-column
          label="商品库存"
          width="80"
          align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.stock"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="库存预警值"
          width="100"
          align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.lowStock"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="销量"
          width="100"
          align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.sale" :disabled="true"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="重量"
          width="100"
          align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.weight"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="尺寸"
          width="100"
          align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.dimension" placeholder="全部" clearable class="input-width">
              <el-option
                v-for="item in dimensionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label="销售价格"
          width="80"
          align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.price"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="原价"
          width="80"
          align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.originalPrice"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="80"
          align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleRemoveSku(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        style="margin-top: 20px"
        @click="handleRefreshSkuList">刷新列表
      </el-button>
      <el-button
        type="primary"
        style="margin-top: 20px"
        @click="handleSyncSkuPrice">同步价格
      </el-button>
      <el-form-item label="商品图片：">
        <el-table style="width: 100%;margin-top: 20px"
                  :data="value.spuImgList"
                  border>
          <template slot-scope="scope">
            <el-table-column v-for="item in scope.row.skuSpecList"
                             :label="item.specName"
                             :key="item.id"
                             :prop="item.specValue"
                             align="center">
            </el-table-column>
          </template>
          <el-table-column
            label="图片"
            width="200"
            align="center">
            <template slot-scope="scope">
              <single-upload v-model="scope.row.imgUrl"></single-upload>
            </template>
          </el-table-column>
          <el-table-column
            label="是否封面"
            width="60"
            align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.coverFlag"
                :active-value="0"
                :inactive-value="1">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="是否主图"
            width="60"
            align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.masterFlag"
                :active-value="0"
                :inactive-value="1">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="是否颜色图"
            width="60"
            align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.colorFlag"
                :active-value="0"
                :inactive-value="1">
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="商品参数：">
        <el-card shadow="never" class="cardBg">
          <div v-for="(item,index) in selectSpuSpecValues" :class="{littleMarginTop:index!==0}" :key="item.id">
            <div class="paramInputLabel">{{item.name}}:</div>
            <el-select v-if="item.enumeration===1" class="paramInput" v-model="selectSpuSpecValues[index].specValues">
              <el-option
                v-for="item in selectSpuSpecValues[index].specValues"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-input v-else-if="item.input===1" class="paramInput" v-model="selectSpuSpecValues[index].specName"></el-input>
          </div>
        </el-card>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步，填写商品信息</el-button>
        <el-button type="primary" size="medium" @click="handleFinishCommit">完成，提交商品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {fetchListWithChildren} from '@/api/item'
import {fetchListByItemId} from '@/api/specName'
import {fetchSkuSpecListBySpuId} from '@/api/skuSpec'
import {fetchSpuSpecListBySpuId} from '@/api/spuSpec'

export default {
  name: 'SpuAttrDetail',
  components: {},
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      id: null,
      itemOptions: [],
      skuSpecList: [],
      spuSpecList: [],
      selectSpuItemValue: null,
      selectSkuSpecValues: {},
      selectSpuSpecValues: [],
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
    selectSpuItemValue: function (newValue) {
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
    },
    handleRefreshSkuList () {
      this.$confirm('刷新列表将导致sku信息重新生成，是否要刷新', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.refreshskuPics()
        this.refreshSkuList()
      })
    },
    refreshskuPics () {
    },
    refreshSkuList () {
      this.value.skuList = []
      let skuList = this.value.skuList
    },
    handleSyncSkuPrice () {
    },
    handleSpuAttrChange () {
      fetchSkuSpecListBySpuId({id: this.id}).then(response => {
        let skuspecList = response.data
        for (let i = 0; i < skuspecList.length; i++) {
          this.selectSkuSpecValues.set(skuspecList[i].id, skuspecList[i].memberIds)
        }
      })
      fetchSpuSpecListBySpuId({id: this.id}).then(response => {
        let spuSpecList = response.data
        let temp = []
        for (let i = 0; i < spuSpecList.length; i++) {
          temp.push(spuSpecList[i].specValueId)
        }
        this.selectSpuSpecValues = temp
      })
    },
    handleRemoveSku (index, row) {
      let list = this.value.skuList
      if (list.length === 1) {
        list.pop()
      } else {
        list.splice(index, 1)
      }
    },
    handlePrev () {
      this.$emit('prevStep')
    },
    handleFinishCommit () {
    }
  }
}

</script>
<style scoped>
.littleMarginLeft {
  margin-left: 10px;
}

.littleMarginTop {
  margin-top: 10px;
}

.paramInput {
  width: 250px;
}

.paramInputLabel {
  display: inline-block;
  width: 100px;
  text-align: right;
  padding-right: 10px
}

.cardBg {
  background: #F8F9FC;
}
</style>
