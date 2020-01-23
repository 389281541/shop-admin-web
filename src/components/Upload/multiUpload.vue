<template>
  <div>
    <el-upload
      action="http://up-z1.qiniup.com"
      :data="dataObj"
      list-type="picture-card"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview"
      :limit="maxCount"
      :on-exceed="handleExceed"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import {getToken} from '@/api/upload'

export default {
  name: 'multiUpload',
  props: {
    // 图片属性数组
    value: Array,
    // 最大上传图片数量
    maxCount: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      dataObj: {
        token: '',
        key: ''
      },
      host: '',
      dialogVisible: false,
      dialogImageUrl: null
    }
  },
  computed: {
    fileList () {
      let fileList = []
      for (let i = 0; i < this.value.length; i++) {
        fileList.push({url: this.value[i]})
      }
      return fileList
    }
  },
  methods: {
    emitInput (fileList) {
      let value = []
      for (let i = 0; i < fileList.length; i++) {
        value.push(fileList[i].url)
      }
      this.$emit('input', value)
    },
    handleRemove (file, fileList) {
      this.emitInput(fileList)
    },
    handlePreview (file) {
      this.dialogVisible = true
      this.dialogImageUrl = file.url
    },
    beforeUpload (file) {
      let _self = this
      return new Promise((resolve, reject) => {
        getToken().then(response => {
          _self.dataObj.key = response.data.key
          _self.dataObj.token = response.data.token
          _self.host = response.data.url
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(new Error(false))
        })
      })
    },
    handleUploadSuccess (res, file) {
      this.fileList.push({name: file.name, url: this.host + '/' + this.dataObj.key})
      this.emitInput(this.fileList)
    },
    handleExceed (files, fileList) {
      this.$message({
        message: '最多只能上传' + this.maxCount + '张图片',
        type: 'warning',
        duration: 1000
      })
    }
  }
}
</script>
<style>

</style>
