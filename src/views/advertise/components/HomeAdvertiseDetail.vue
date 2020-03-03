<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="homeAdvertise"
             :rules="rules"
             ref="homeAdvertiseForm"
             label-width="150px">
      <el-form-item label="主题：" prop="theme">
        <el-input v-model="homeAdvertise.theme"></el-input>
      </el-form-item>
      <el-form-item label="类型：" prop="type">
        <el-select v-model="homeAdvertise.type" collapse-tags placeholder="请选择类型">
          <el-option
            v-for="item in typeList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上线状态：" prop="status">
        <el-select v-model="homeAdvertise.status" collapse-tags placeholder="请选择状态">
          <el-option
            v-for="item in statusList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图片：" prop="imgUrl">
        <single-upload v-model="homeAdvertise.imgUrl"></single-upload>
      </el-form-item>
      <el-form-item label="跳转链接：">
        <el-input
          placeholder="请输入跳转链接"
          v-model="homeAdvertise.forwardUrl">
        </el-input>
      </el-form-item>
      <el-form-item label="排序：" prop="sortId">
        <el-input
          v-model="homeAdvertise.sortId">
        </el-input>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input
          v-model="homeAdvertise.note"
          autosize="true">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('homeAdvertiseForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {createHomeAdvertise, updateHomeAdvertise, getHomeAdvertise} from '@/api/homeAdvertise'
import SingleUpload from '@/components/Upload/singleUpload'
const defaultHomeAdvertise = {
  theme: null,
  type: null,
  imgUrl: null,
  forwardUrl: null,
  sortId: null,
  status: null,
  note: null
}
export default {
  name: 'HomeAdvertiseDetail',
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
      homeAdvertise: Object.assign({}, defaultHomeAdvertise),
      rules: {
        theme: [
          {required: true, message: '请输入主题', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '类型不能为空', trigger: 'blur'}
        ],
        status: [
          {required: true, message: '状态不能为空', trigger: 'blur'}
        ],
        sortId: [
          {required: true, message: '排序不能为空', trigger: 'blur'}
        ]
      },
      typeList: [
        {
          id: 0,
          name: '首页轮播图'
        }, {
          id: 1,
          name: '首页活动位'
        }
      ],
      statusList: [
        {
          id: 0,
          name: '未上线'
        }, {
          id: 1,
          name: '已上线'
        }
      ]
    }
  },
  created () {
    if (this.isEdit) {
      this.id = this.$route.query.id
      getHomeAdvertise(this.id).then(response => {
        this.homeAdvertise = response.data
      })
    } else {
      this.homeAdvertise = Object.assign({}, defaultHomeAdvertise)
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
              this.homeAdvertise.id = this.id
              this.$set(this.homeAdvertise, 'id', this.id)
              updateHomeAdvertise(this.homeAdvertise).then(response => {
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 1000
                })
                this.$router.back()
              })
            } else {
              createHomeAdvertise(this.homeAdvertise).then(response => {
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
      this.homeAdvertise = Object.assign({}, defaultHomeAdvertise)
    }
  }
}
</script>
