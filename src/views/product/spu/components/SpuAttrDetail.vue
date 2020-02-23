<template>
  <div style="margin-top: 50px">
    <el-form :model="value" ref="spuAttrForm" label-width="120px" style="width: 720px" size="small">
      <el-form-item label="商品类别：" prop="itemId">
        <el-cascader
          clearable
          v-model="value.itemId"
          @change="handleSpuAttrChange"
          :options="itemOptions">
        </el-cascader>
      </el-form-item>
      <el-form-item label="商品规格：">
        <el-card shadow="never" class="cardBg">
          <div v-for="skuSpec in skuSpecList" :key="skuSpec.id">
            {{skuSpec.name}}：
            <el-checkbox-group v-model="skuSpec.selectSpecValues">
              <el-checkbox v-for="item in skuSpec.specValues" :label="item.name" :key="item.id"
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
        <el-table-column :label="item" v-for="item in headers" :key="item">
          <template slot-scope="scope">
            {{scope.row.skuSpecMap[item]}}
          </template>
        </el-table-column>
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
          width="50"
          align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.sale" :disabled="true"></el-input>
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
// import {fetchSkuSpecListBySpuId} from '@/api/skuSpec'
// import {fetchSpuSpecListBySpuId} from '@/api/spuSpec'

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
      itemId: null,
      itemOptions: [],
      skuSpecList: [],
      spuSpecList: [],
      selectSpuItemValue: null,
      selectSpuSpecValues: [],
      headers: [],
      rules: {
        itemId: [{required: true, message: '请选择商品分类', trigger: 'blur'}]
      }
    }
  },
  created () {
    if (this.isEdit) {
      for (let i = 0; i < this.value.skuList[0].skuSpecList.length; i++) {
        this.headers.push(this.value.skuList[0].skuSpecList[i].specName)
      }
    }
    // 更新
    this.getItemOptions()
    // this.getSpecList()
  },
  // watch: {
  //      value.itemId: function (newValue) {
  //     if (newValue != null && newValue.length === 2) {
  //       this.value.itemId = newValue[1]
  //     } else {
  //       this.value.itemId = null
  //       this.value.itemName = null
  //     }
  //     this.getSpecList()
  //     console.log('itemId = ' + this.itemId)
  //   }
  // },
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
    getSpecList (itemId, spuId) {
      fetchListByItemId({itemId: itemId, spuId: spuId}).then(response => {
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
      this.headers = []
      let skuList = this.value.skuList
      console.log('init skuList size =' + skuList.length)
      let skuSelectSpecList = []
      for (let i = 0; i < this.skuSpecList.length; i++) {
        if (this.skuSpecList[i].selectSpecValues.length === 0) {
          continue
        }
        this.headers.push(this.skuSpecList[i].name)
        skuSelectSpecList.push(this.skuSpecList[i].selectSpecValues)
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
      console.log('dkeji = ' + result + ', length=' + result.length)
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
          skuSpecMap: skuSpecMap
        })
        skuSpecSaveList = []
        skuSpecMap = {}
        console.log('map = ' + JSON.stringify(skuSpecMap))
      }
      console.log('value.skuList = ' + JSON.stringify(this.value.skuList))
    },
    handleSyncSkuPrice () {
    },
    handleSpuAttrChange () {
      // console.log('itemId = ' + this.value.itemId)
      // this.value.itemName = this.getItemNameById(this.value.itemId)
      if (this.value.itemId[1] == null) {
        return
      }
      this.getSpecList(this.value.itemId[1], this.value.id)
      // if (this.isEdit) {
      //   fetchSkuSpecListBySpuId({id: this.id}).then(response => {
      //     let skuspecList = response.data
      //     for (let i = 0; i < skuspecList.length; i++) {
      //       this.selectSkuSpecValues.set(skuspecList[i].id, skuspecList[i].memberIds)
      //     }
      //   })
      //   fetchSpuSpecListBySpuId({id: this.id}).then(response => {
      //     let spuSpecList = response.data
      //     let temp = []
      //     for (let i = 0; i < spuSpecList.length; i++) {
      //       temp.push(spuSpecList[i].specValueId)
      //     }
      //     this.selectSpuSpecValues = temp
      //   })
      // }
    },
    getSpecNameBySpecValue (specValue) {
      for (let i = 0; i < this.skuSpecList.length; i++) {
        for (let j = 0; j < this.skuSpecList[i].specValues.length; j++) {
          if (specValue === this.skuSpecList[i].specValues[j].name) {
            return this.skuSpecList[i]
          }
        }
      }
    },
    getSpecIdBySpecValue (specValue) {
      for (let i = 0; i < this.skuSpecList.length; i++) {
        for (let j = 0; j < this.skuSpecList[i].specValues.length; j++) {
          if (specValue === this.skuSpecList[i].specValues[j].name) {
            return this.skuSpecList[i].specValues[j].id
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
