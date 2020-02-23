<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="productBrand"
             :rules="rules"
             ref="productBrandForm"
             label-width="150px">
      <el-form-item label="品牌名称：" prop="name">
        <el-input v-model="productBrand.name"></el-input>
      </el-form-item>
      <el-form-item label="品牌类别：">
        <el-select v-model="productBrand.itemIds" collapse-tags multiple placeholder="请选择分类">
          <el-option
            v-for="item in itemList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="品牌LOGO：" prop="logo">
        <single-upload v-model="productBrand.logo"></single-upload>
      </el-form-item>
      <el-form-item label="品牌描述：">
        <el-input
          placeholder="请输入内容"
          type="textarea"
          v-model="productBrand.description"
          :autosize="true"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('productBrandForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {createBrand, updateBrand, getBrand} from '@/api/brand'
import {fetchAllSubItemList} from '@/api/item'
import SingleUpload from '@/components/Upload/singleUpload'
const defaultProductBrand = {
  name: '',
  logo: '',
  description: '',
  itemIds: []
}
export default {
  name: 'BrandDetail',
  components: { SingleUpload },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      id: null,
      productBrand: Object.assign({}, defaultProductBrand),
      rules: {
        name: [
          {required: true, message: '请输入品牌名称', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        ]
      },
      itemList: []
    }
  },
  created () {
    if (this.isEdit) {
      this.id = this.$route.query.id
      getBrand(this.id).then(response => {
        this.productBrand = response.data
      })
    } else {
      this.productBrand = Object.assign({}, defaultProductBrand)
    }
    this.getItemList()
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
              this.productBrand.id = this.id
              this.$set(this.productBrand, 'id', this.id)
              updateBrand(this.productBrand).then(response => {
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 1000
                })
                this.$router.back()
              })
            } else {
              createBrand(this.productBrand).then(response => {
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
      this.productBrand = Object.assign({}, defaultProductBrand)
      this.getItemList()
    },
    getItemList () {
      fetchAllSubItemList().then(response => {
        this.itemList = response.data
      })
    }
  }
}
</script>
