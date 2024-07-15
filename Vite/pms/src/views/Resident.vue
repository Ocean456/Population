<script>
import axios from "axios";
import {ElMessage} from "element-plus";

const info = axios.create({
  baseURL: 'http://localhost:2020/api/resident'
})

export default {
  data() {
    return {
      totalData: [{
        id: '',
        name: '',
        address: '',
        period: '',
        status: ''
      }]
    }
  },
  methods: {
    loadData() {
      info.get('/search')
          .then(response => {
            this.totalData = response.data
          })
    },
    deleteData(id) {
      info.delete('/delete', {params: {id: id}})
          .then(response => {
            ElMessage.success(response.data)
          })
          .catch(error => {
            ElMessage.error(error)
          }).then(() => {
        this.loadData()
      })
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>

<template>
  <div class="resident">
    <h3>居住证明管理</h3>
    <el-table :data="totalData" border max-height="720" stripe style="width: 100%; max-width: 840px">
      <el-table-column label="身份证号" prop="id" width="180"></el-table-column>
      <el-table-column label="姓名" prop="name" width="100"></el-table-column>
      <el-table-column label="居住地址" prop="address" width="440"></el-table-column>
      <el-table-column align="center" label="操作" width="120">
        <template #default="scope">
          <el-button size="small" type="danger" @click="deleteData(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>

</style>
