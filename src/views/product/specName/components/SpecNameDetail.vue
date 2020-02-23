<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="productSpecName"
             :rules="rules"
             ref="productSpecNameForm"
             label-width="100px">
      <el-form-item label="属性名称：" prop="name">
        <el-input v-model="productSpecName.name"></el-input>
      </el-form-item>
      <el-form-item label="属性类别：" prop="itemId">
        <el-cascader v-model="selectProductItemValue"
                     :options="productItemOptions">
        </el-cascader>
      </el-form-item>
      <el-form-item label="属性类型：" prop="type">
        <el-select v-model="productSpecName.type" clearable class="input-width">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="颜色属性：">
        <el-select v-model="productSpecName.color" clearable class="input-width">
          <el-option
            v-for="item in booleanOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="枚举属性：">
        <el-select v-model="productSpecName.enumeration" clearable class="input-width">
          <el-option
            v-for="item in booleanOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="输入属性：">
        <el-select v-model="productSpecName.input" clearable class="input-width">
          <el-option
            v-for="item in booleanOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关键属性：">
        <el-select v-model="productSpecName.critical" clearable class="input-width">
          <el-option
            v-for="item in booleanOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="销售属性：">
        <el-select v-model="productSpecName.sku" clearable class="input-width">
          <el-option
            v-for="item in booleanOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="搜索属性：">
        <el-select v-model="productSpecName.search" clearable class="input-width">
          <el-option
            v-for="item in booleanOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="多选属性：">
        <el-select v-model="productSpecName.multiple" clearable class="input-width">
          <el-option
            v-for="item in booleanOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('productSpecNameForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {createSpecName, updateSpecName, getSpecName} from '@/api/specName'
import {fetchListWithChildren} from '@/api/item'
const defaultProductSpecName = {
  name: '',
  itemId: null,
  parentItemId: null,
  existAlias: null,
  color: null,
  enumeration: null,
  input: null,
  critical: null,
  sku: null,
  search: null,
  multiple: null
}
export default {
  name: 'SpecNameDetail',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      hasEditCreated: false,
      id: null,
      productSpecName: Object.assign({}, defaultProductSpecName),
      rules: {
        name: [
          {required: true, message: '请输入属性名称', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 50 个字符', trigger: 'blur'}
        ],
        itemId: [
          {required: true, message: '请选择类别', trigger: 'blur'}
        ]
      },
      productItemOptions: null,
      selectProductItemValue: [],
      booleanOptions: [
        {
          value: 1,
          label: '是'
        }, {
          value: 0,
          label: '否'
        }],
      typeOptions: [
        {
          value: 0,
          label: '规格'
        }, {
          value: 1,
          label: '参数'
        }]
    }
  },
  created () {
    if (this.isEdit) {
      this.id = this.$route.query.id
      this.productSpecName.id = this.id
      getSpecName(this.id).then(response => {
        this.productSpecName = response.data
      })
    } else {
      this.getProductItemOptions()
      this.productSpecName = Object.assign({}, defaultProductSpecName)
    }
  },
  computed: {
    // 属性名的编号
    specNameId () {
      return this.productSpecName.id
    }
  },
  watch: {
    specNameId: function (newValue) {
      if (!this.isEdit) return
      if (this.hasEditCreated) return
      if (newValue === undefined || newValue === null || newValue === 0) return
      this.handleEditCreated()
    },
    selectProductItemValue: function (newValue) {
      if (newValue != null && newValue.length === 2) {
        this.productSpecName.itemId = newValue[1]
      } else {
        this.productSpecName.itemId = null
      }
    }
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
            if (this.isEdit) {
              this.productSpecName.id = this.id
              this.$set(this.productSpecName, 'id', this.id)
              updateSpecName(this.productSpecName).then(response => {
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 1000
                })
                this.$router.back()
              })
            } else {
              createSpecName(this.productSpecName).then(response => {
                this.$refs[formName].resetFields()
                this.resetForm(formName)
                this.$message({
                  message: '提交成功',
                  type: 'success',
                  duration: 1000
                })
              })
            }
          })
        } else {
          this.$message({
            message: '验证失败',
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.productSpecName = Object.assign({}, defaultProductSpecName)
      this.getProductItemOptions()
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
    handleEditCreated () {
      if (this.productSpecName.itemId !== null) {
        this.getProductItemOptions()
        this.selectProductItemValue.push(this.productSpecName.parentItemId)
        this.selectProductItemValue.push(this.productSpecName.itemId)
      }
      this.hasEditCreated = true
    }
  }
}
</script>
