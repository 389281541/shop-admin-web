<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="productSpecValue"
             :rules="rules"
             ref="productSpecValueForm"
             label-width="100px">
      <el-form-item label="属性名：" prop="specName">
        <el-input v-model="productSpecValue.specName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="属性值：" prop="specValue">
        <el-input v-model="productSpecValue.specValue" @input="change($event)"></el-input>
      </el-form-item>
      <el-form-item label="排序：" prop="sortId">
        <el-input v-model="productSpecValue.sortId"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('productSpecValueForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {createSpecValue, updateSpecValue, getSpecValue} from '@/api/specValue'
const defaultProductSpecValue = {
  specValue: '',
  sortId: null,
  specNameId: null,
  specName: ''
}
export default {
  name: 'SpecValueDetail',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      id: null,
      specNameId: null,
      productSpecValue: Object.assign({}, defaultProductSpecValue),
      rules: {
        specValue: [
          {required: true, message: '请输入属性值', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 50 个字符', trigger: 'blur'}
        ],
        sortId: [
          {required: true, message: '请输入排序号', trigger: 'blur'}
        ]
      }
    }
  },
  created () {
    if (this.isEdit) {
      this.id = this.$route.query.id
      getSpecValue(this.id).then(response => {
        this.productSpecValue = response.data
        this.productSpecValue.specValue = response.data.name
        this.productSpecValue.specNameId = response.data.specNameId
        this.specNameId = response.data.specNameId
      })
    } else {
      this.productSpecValue = Object.assign({}, defaultProductSpecValue)
      this.productSpecValue.specName = this.$route.query.name
      this.productSpecValue.specNameId = this.$route.query.specNameId
      this.specNameId = this.productSpecValue.specNameId
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
              this.productSpecValue.id = this.id
              this.$set(this.productSpecValue, 'id', this.id)
              updateSpecValue(this.productSpecValue).then(response => {
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 1000
                })
                this.$router.push({path: '/product/SpecValue', query: {id: this.specNameId}})
              })
            } else {
              createSpecValue(this.productSpecValue).then(response => {
                this.$refs[formName].resetFields()
                this.resetForm(formName)
                this.$message({
                  message: '提交成功',
                  type: 'success',
                  duration: 1000
                })
                this.$router.push({path: '/product/SpecValue', query: {id: this.specNameId}})
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
      this.productSpecValue = Object.assign({}, defaultProductSpecValue)
    },
    change (e) {
      this.$forceUpdate()
    }
  }
}
</script>
