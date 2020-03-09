<template>
  <div style="margin-top: 50px">
    <el-form :model="value" ref="spuAttrForm" label-width="120px" style="width: 720px" size="small">
      <el-form-item label="商品类别：" prop="itemId">
        <el-select
          v-model="value.itemId"
          @input="handleSpuAttrChange"
          placeholder="请选择类别">
          <el-option
            v-for="item in itemSubOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品规格：">
        <el-card shadow="never" class="cardBg">
          <div v-for="skuSpec in skuSpecNameList" :key="skuSpec.id">
            {{skuSpec.name}}：
            <el-checkbox-group v-model="skuSpec.selectSpecValues">
              <el-checkbox v-for="item in skuSpec.specValues" :label="item.name" :key="item.id"
                           :checked="checked"  @change="checked=!checked"
                           class="littleMarginLeft"></el-checkbox>
            </el-checkbox-group>
          </div>
        </el-card>
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
          <el-table-column
            label="SKU名称"
            width="150"
            align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.skuName"></el-input>
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
          width="100"
          align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.lowStock"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="销量"
          width="50"
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
      </el-form-item>
      <el-form-item label="商品图片：">
        <el-table style="width: 100%;margin-top: 20px"
                  :data="value.spuImgList"
                  border>
          <el-table-column :label="item" v-for="item in headers" :key="item">
            <template slot-scope="scope">
              {{scope.row.skuSpecMap[item]}}
            </template>
          </el-table-column>
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
                :active-value="1"
                :inactive-value="0">
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
                :active-value="1"
                :inactive-value="0">
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
                :active-value="1"
                :inactive-value="0">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="80"
            align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="handleRemoveSpuImg(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="商品参数：">
        <el-card shadow="never" class="cardBg">
          <div v-for="(item,index) in spuSpecNameList" :class="{littleMarginTop:index!==0}" :key="item.id">
            <div class="paramInputLabel">{{item.name}}:</div>
            <el-select v-if="item.enumeration===1" class="paramInput" v-model="item.selectSpecValues[0]">
              <el-option
                v-for="option in item.specValues"
                :key="option.id"
                :label="option.name"
                :value="option.name">
              </el-option>
            </el-select>
            <el-input v-else-if="item.input===1" class="paramInput" v-model="item.selectSpecValues[0]"></el-input>
          </div>
        </el-card>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步，填写商品信息</el-button>
        <el-button type="primary" size="medium" @click="handleNext">下一步，填写商品促销</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {fetchListWithChildren, fetchAllSubItemList} from '@/api/item'
import SingleUpload from '@/components/Upload/singleUpload'
import {fetchListByItemId} from '@/api/specName'
export default {
  name: 'SpuAttrDetail',
  components: { SingleUpload },
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
      itemId: null,
      itemName: null,
      itemOptions: [],
      checked: false,
      // 编辑模式时是否初始化成功
      hasEditCreated: false,
      selectItemValue: [],
      itemSubOptions: [],
      headers: [],
      skuSpecNameList: [],
      spuSpecNameList: [],
      rules: {
        itemId: [{required: true, message: '请选择商品分类', trigger: 'blur'}]
      }
    }
  },
  computed: {
    valueItemId () {
      return this.value.itemId
    }
  },
  created () {
    // 更新
    this.getItemOptions()
    this.getSubItemOptions()
  },
  watch: {
    valueItemId: function (newValue) {
      if (!this.isEdit) return
      if (this.hasEditCreated) return
      if (newValue === undefined || newValue === null || newValue === 0) {
        return
      }
      this.handleEditCreated()
    }
  },
  methods: {
    handleEditCreated () {
      if (this.value.itemId != null) {
        this.handleSpuAttrChange(this.value.itemId)
      }
      this.hasEditCreated = true
    },
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
    getSubItemOptions () {
      fetchAllSubItemList().then(response => {
        this.itemSubOptions = response.data
      })
    },
    getItemNameById (id) {
      let name = null
      for (let i = 0; i < this.itemOptions.length; i++) {
        for (let j = 0; j < this.itemOptions[i].children.length; j++) {
          if (this.itemOptions[i].children[j].value === id) {
            name = this.itemOptions[i].children[j].label
            return name
          }
        }
      }
      return name
    },
    handleRefreshSkuList () {
      this.$confirm('刷新列表将导致sku信息和图片重新生成，是否要刷新', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.refreshSkuList()
        this.refreshskuPics()
      })
    },
    refreshSkuList () {
      if (this.skuSpecNameList === null || this.spuSpecNameList === null) {
        return
      }
      this.value.skuList = []
      this.headers = []
      let skuList = this.value.skuList
      console.log('init skuList size =' + skuList.length)
      let skuSelectSpecList = []
      for (let i = 0; i < this.skuSpecNameList.length; i++) {
        if (this.skuSpecNameList[i].selectSpecValues.length === 0) {
          continue
        }
        this.headers.push(this.skuSpecNameList[i].name)
        skuSelectSpecList.push(this.skuSpecNameList[i].selectSpecValues)
      }
      console.log('headers=' + this.headers)
      if (skuSelectSpecList.length === 0) {
        return
      }
      let result = skuSelectSpecList.reduce((last, current) => {
        const array = []
        last.forEach(par1 => {
          current.forEach(par2 => {
            array.push(par1 + '_' + par2)
          })
        })
        return array
      })
      let skuSpecSaveList = []
      let skuSpecMap = {}
      for (let i = 0; i < result.length; i++) {
        let split = result[i].split('_')
        for (let j = 0; j < split.length; j++) {
          skuSpecSaveList.push({
            specNameId: this.getSpecNameBySpecValue(split[j]).id,
            specName: this.getSpecNameBySpecValue(split[j]).name,
            specValueId: this.getSpecIdBySpecValue(split[j]),
            specValue: split[j]
          })
          skuSpecMap[this.getSpecNameBySpecValue(split[j]).name] = split[j]
        }
        skuList.push({
          skuSpecList: skuSpecSaveList,
          skuSpecMap: skuSpecMap,
          skuName: result[i]
        })
        skuSpecSaveList = []
        skuSpecMap = {}
      }
    },
    refreshskuPics () {
      this.value.spuImgList = []
      let spuImgList = this.value.spuImgList
      for (let i = 0; i < this.value.skuList.length; i++) {
        spuImgList.push({
          skuSpecMap: this.value.skuList[i].skuSpecMap
        })
      }
      spuImgList.push({
        skuSpecMap: this.value.skuList[0].skuSpecMap,
        masterFlag: 1,
        colorFlag: 0,
        coverFlag: 0
      })
    },
    handleSpuAttrChange () {
      let itemId = this.value.itemId
      this.getSpecList(itemId, this.value.id)
      this.value.itemName = this.getItemNameById(itemId)
    },
    getSpecList (itemId, spuId) {
      fetchListByItemId({itemId: itemId, spuId: spuId}).then(response => {
        this.skuSpecNameList = response.data.skuSpecList
        this.spuSpecNameList = response.data.spuSpecList
        if (this.skuSpecNameList === null || this.spuSpecNameList === null) {
          return
        }
        this.headers = []
        if (this.isEdit) {
          for (let i = 0; i < this.value.skuList[0].skuSpecList.length; i++) {
            this.headers.push(this.value.skuList[0].skuSpecList[i].specName)
          }
        }
      })
    },
    getSpecNameBySpecValue (specValue) {
      for (let i = 0; i < this.skuSpecNameList.length; i++) {
        for (let j = 0; j < this.skuSpecNameList[i].specValues.length; j++) {
          if (specValue === this.skuSpecNameList[i].specValues[j].name) {
            return this.skuSpecNameList[i]
          }
        }
      }
    },
    getSpecIdBySpecValue (specValue) {
      for (let i = 0; i < this.skuSpecNameList.length; i++) {
        for (let j = 0; j < this.skuSpecNameList[i].specValues.length; j++) {
          if (specValue === this.skuSpecNameList[i].specValues[j].name) {
            return this.skuSpecNameList[i].specValues[j].id
          }
        }
      }
    },
    getSpuSpecIdBySpecValue (specValue) {
      for (let i = 0; i < this.spuSpecNameList.length; i++) {
        for (let j = 0; j < this.spuSpecNameList[i].specValues.length; j++) {
          if (specValue === this.spuSpecNameList[i].specValues[j].name) {
            return this.spuSpecNameList[i].specValues[j].id
          }
        }
      }
    },
    handleRemoveSku (index, row) {
      let list = this.value.skuList
      if (list.length === 1) {
        list.pop()
      } else {
        list.splice(index, 1)
      }
    },
    handleRemoveSpuImg (index, row) {
      let list = this.value.spuImgList
      if (list.length === 1) {
        list.pop()
      } else {
        list.splice(index, 1)
      }
    },
    handlePrev () {
      this.$emit('prevStep')
    },
    handleNext () {
      this.value.spuSpecList = []
      if (this.spuSpecNameList !== null) {
        for (let i = 0; i < this.spuSpecNameList.length; i++) {
          this.value.spuSpecList.push({
            specNameId: this.spuSpecNameList[i].id,
            specName: this.spuSpecNameList[i].name,
            specValueId: this.getSpuSpecIdBySpecValue(this.spuSpecNameList[i].selectSpecValues[0]),
            specValue: this.spuSpecNameList[i].selectSpecValues[0]
          })
        }
      }
      this.$emit('nextStep')
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
