<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="productItem"
             :rules="rules"
             ref="productItemForm"
             label-width="150px">
      <el-form-item label="分类名称：" prop="name">
        <el-input v-model="productItem.name"></el-input>
      </el-form-item>
      <el-form-item label="上级分类：">
        <el-select v-model="productItem.parentId" placeholder="请选择分类">
          <el-option
          v-for="item in parentItemList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类别编号：" prop="itemNo" placeholder="请输入10000-20000范围的数字">
        <el-input v-model="productItem.itemNo"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('productItemForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {fetchItemList, createItem, updateItem, getItem} from '@/api/item'
const defaultProductItem = {
  name: '',
  parentId: null,
  itemNo: 0
}
export default {
  name: 'ItemDetail',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      id: null,
      productItem: Object.assign({}, defaultProductItem),
      parentItemList: [],
      rules: {
        name: [
          {required: true, message: '请输入类别名称', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        ],
        sortId: {required: true, message: '请输入类别序号', trigger: 'blur'}
      }
    }
  },
  created () {
    if (this.isEdit) {
      this.id = this.$route.query.id
      console.log('id=' + this.id)
      getItem(this.id).then(response => {
        this.productItem.name = response.data.name
        this.productItem.parentId = response.data.parentId
        this.productItem.itemNo = response.data.itemNo
      })
    } else {
      this.productItem = Object.assign({}, defaultProductItem)
    }
    this.getParentItemList()
  },
  methods: {
    getParentItemList () {
      fetchItemList({id: null, pageNum: 1, pageSize: 200}).then(response => {
        this.parentItemList = response.data.records
        this.parentItemList.unshift({id: null, name: '无上级分类'})
      })
    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否提交数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.isEdit) {
              this.productItem.id = this.id
              this.$set(this.productItem, 'id', this.id)
              updateItem(this.productItem).then(response => {
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 1000
                })
                this.$router.back()
              })
            } else {
              createItem(this.productItem).then(response => {
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
      this.productItem = Object.assign({}, defaultProductItem)
      this.getParentItemList()
    }
  }
}
</script>
