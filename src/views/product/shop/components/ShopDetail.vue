<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="shop"
             :rules="rules"
             ref="shopForm"
             label-width="150px">
      <el-form-item label="商铺名称：" prop="name">
        <el-input v-model="shop.name"></el-input>
      </el-form-item>
      <el-form-item label="商铺LOGO：" prop="logo">
        <single-upload v-model="shop.logo"></single-upload>
      </el-form-item>
      <el-form-item label="商铺类型：">
        <el-select v-model="shop.type" collapse-tags placeholder="请选择类型">
          <el-option
            v-for="item in selectTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="店主名字：" prop="keeperName">
        <el-input v-model="shop.keeperName"></el-input>
      </el-form-item>
      <el-form-item label="手机号码：" prop="phoneNumber">
        <el-input v-model="shop.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="银行名称：" prop="bankName">
        <el-input v-model="shop.bankName"></el-input>
      </el-form-item>
      <el-form-item label="银行账号：" prop="bankAccount">
        <el-input v-model="shop.bankAccount"></el-input>
      </el-form-item>
      <el-form-item label="商铺地址：" prop="address">
        <el-input v-model="shop.address"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('shopForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {createShop, updateShop, getShop} from '@/api/shop'
import {validatePhone} from '@/utils/validate'
import SingleUpload from '@/components/Upload/singleUpload'
const defaultShop = {
  name: null,
  logo: null,
  type: null,
  keeperName: null,
  phoneNumber: null,
  bankName: null,
  bankAccount: null,
  address: null,
  auditStatus: null
}
export default {
  name: 'ShopDetail',
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
      shop: Object.assign({}, defaultShop),
      rules: {
        name: [
          {required: true, message: '请输入商铺名称', trigger: 'blur'},
          {min: 2, max: 200, message: '长度在 2 到 200 个字符', trigger: 'blur'}
        ],
        keeperName: [
          {required: true, message: '请输入店主姓名', trigger: 'blur'},
          {min: 2, max: 15, message: '长度在 2 到 10 个字符', trigger: 'blur'}
        ],
        phoneNumber: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {validator: validatePhone, trigger: 'blur'}
        ],
        bankName: [
          {required: true, message: '请输入银行名称', trigger: 'blur'},
          {min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur'}
        ],
        bankAccount: [
          {required: true, message: '请输入银行账号', trigger: 'blur'},
          {min: 16, max: 19, message: '长度在 16 到 19 个字符', trigger: 'blur'}
        ]
      },
      selectTypeOptions: [
        {
          value: 1,
          label: '自营'
        }, {
          value: 2,
          label: '平台'
        }
      ],
      selectAuditStatusOptions: [
        {
          value: 0,
          label: '审核拒绝'
        }, {
          value: 1,
          label: '审核中'
        }, {
          value: 2,
          label: '审核通过'
        }
      ]
    }
  },
  created () {
    if (this.isEdit) {
      this.id = this.$route.query.id
      getShop(this.id).then(response => {
        this.shop = response.data
      })
    } else {
      this.shop = Object.assign({}, defaultShop)
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
              this.shop.id = this.id
              this.$set(this.shop, 'id', this.id)
              updateShop(this.shop).then(response => {
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 1000
                })
                this.$router.back()
              })
            } else {
              createShop(this.shop).then(response => {
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
      this.shop = Object.assign({}, defaultShop)
    }
  }
}
</script>
