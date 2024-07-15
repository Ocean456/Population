<script>
import axios from "axios";
import {ElMessage} from "element-plus";

const info = axios.create({
  baseURL: 'http://localhost:2020/api/migrate'
})

export default {
  data() {
    return {
      totalData: [{
        id: '',
        address: '',
        reason: '',
        status: '',
        name: '',
        oldAddress: ''
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
    confirm(row) {
      const status = 0
      info.put('/handle', {
        id: row.id,
        address: row.address,
        reason: row.reason,
        date: row.date,
        status: status,
      }).then(response => {
        ElMessage.success(response.data)
        this.loadData()
      })
    },
    refuse(row) {
      const status = 2
      info.put('/handle', {
        id: row.id,
        address: row.address,
        reason: row.reason,
        date: row.date,
        status: status
      }).then(response => {
        ElMessage.success(response.data)
        this.loadData()
      })
    },
    deleteMigrate(row) {
      info.delete('/delete', {params: {id: row.id}})
          .then(response => {
            ElMessage.success(response.data)
            this.loadData()
          })
          .catch(error => {
            ElMessage.error(error.response.data)
          })
    },
    handleOld(row) {
      if (row.status === 0) {
        return "已迁出"
      } else
        return row.oldAddress
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>

<template>
  <div class="migrate">
    <h3>迁移信息管理</h3>
    <el-table :data="totalData" border max-height="720" stripe style="width: 100%; max-width: 1170px">
      <el-table-column label="身份证号" prop="id" width="180"></el-table-column>
      <el-table-column label="姓名" prop="name" width="100"></el-table-column>
      <el-table-column label="迁出地址" prop="oldAddress" width="220">
        <template #default="scope">{{ handleOld(scope.row) }}</template>
      </el-table-column>
      <el-table-column label="迁往地址" prop="address" width="220"></el-table-column>
      <el-table-column label="迁移时间" prop="date" width="120"></el-table-column>
      <el-table-column align="center" label="处理状态" prop="status" width="120">
        <template #default="scope">
          <el-text v-if="scope.row.status===0" size="small" type="success">已完成</el-text>
          <el-text v-if="scope.row.status===2" size="small" type="warning">已拒绝</el-text>
          <el-text v-if="scope.row.status===1" size="small" type="info">未操作</el-text>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" prop="status" width="210">
        <template #default="scope">
          <el-button
              v-if="scope.row.status===1"
              size="small" type="primary"
              @click="confirm(scope.row)">确认
          </el-button>
          <el-button
              v-if="scope.row.status===1"
              size="small" type="primary"
              @click="refuse(scope.row)">拒绝
          </el-button>
          <el-button
              v-if="scope.row.status!==1"
              size="small"
              type="primary">已审批
          </el-button>
          <el-button size="small" type="danger" @click="deleteMigrate(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>

</style>
