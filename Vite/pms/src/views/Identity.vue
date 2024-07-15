<script lang="ts">
import {defineComponent} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";

const api = axios.create({
  baseURL: 'http://localhost:2020/api/identity'
})
export default defineComponent({
  data() {
    return {
      keyword: '',
      select: 'id',
      totalData: [],
      pageData: [],
      add: {
        id: '',
        name: '',
        gender: '',
        nation: '',
        birthday: new Date(),
        address: ''
      },
      editRow: {
        id: '',
        name: '',
        gender: '',
        address: '',
        nation: '',
        birthday: new Date()
      },
      pageSize: 16,
      currentPage: 1,
      total: 0,
      dialog: false,
      edit: false
    }
  },
  methods: {
    loadingData() {
      api.get(`/search`)
          .then(response => {
            this.totalData = response.data;
            this.getPageData()
          })
          .catch(error => {
            ElMessage.error(error.response.data)
          })
    },
    searchData() {
      api.get(`/search`, {params: {type: this.select, index: this.keyword}})
          .then(response => {
            this.totalData = response.data;
            this.getPageData()
          })
          .catch(error => {
            ElMessage.error(error.response.data)
          })
    },
    deleteData(id) {
      api.delete('/delete', {params: {id: id}})
          .then(response => {
            ElMessage({
              message: response.data,
              type: 'success'
            })
            this.searchData();
          })
          .catch(error => {
            ElMessage({
              message: error.response.data,
              type: 'warning'
            })
          })
      this.handleCurrentChange(this.currentPage)
    },
    addData() {
      if (this.add.id != '' && this.add.gender != '' && this.add.nation != '' && this.add.address != '') {
        api.post('/add', this.add)
            .then(response => {
              ElMessage({
                message: response.data,
                type: 'success'
              })
              this.searchData();
              this.add = {address: "", gender: "", id: "", name: "", nation: "", birthday: new Date()}
              this.dialog = false
              this.handleCurrentChange(this.currentPage)
            })
            .catch(error => {
              ElMessage({
                message: error.response.data,
                type: 'warning'
              })
            })
      } else {
        ElMessage.error("请完成表单")
      }
    },
    editData() {
      api.put('/edit', this.editRow)
          .then(response => {
            ElMessage({
              message: response.data,
              type: 'success'
            })
            this.searchData();
            this.edit = false
            this.handleCurrentChange(this.currentPage)
          })
          .catch(error => {
            ElMessage({
              message: error,
              type: 'warning'
            })
          })
    },
    getPageData() {
      this.total = this.totalData.length
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      this.pageData = this.totalData.slice(startIndex, endIndex);
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getPageData()
    },
    editDialog(row) {
      const index = this.totalData.findIndex((item) => item.address === row.address)
      this.editRow = {...this.totalData[index]}
      this.edit = true
    }
  },
  mounted() {
    this.loadingData()
  }
})

</script>

<template>
  <div class="identity">
    <h3>身份信息管理</h3>
    <el-input v-model="keyword" placeholder="输入" style="width: 100%; max-width: 1050px" @keyup.enter="searchData">
      <template #prepend>
        <el-select v-model="select" style="width: 115px">
          <el-option label="身份证号" value="id"></el-option>
          <el-option label="姓名" value="name"></el-option>
          <el-option label="地址" value="address"></el-option>
        </el-select>
      </template>
      <template #append>
        <el-button style="width: 80px" @click="searchData">查询</el-button>
      </template>
    </el-input>
    <el-table
        :data="pageData"
        border height="720"
        stripe
        style="width: 1050px;">
      <el-table-column
          label="身份证号"
          prop="id" style="padding: 0" width="180"></el-table-column>
      <el-table-column label="姓名" prop="name" width="100"></el-table-column>
      <el-table-column label="性别" prop="gender" width="60"></el-table-column>
      <el-table-column label="民族" prop="nation" width="100"></el-table-column>
      <el-table-column label="出生日期" prop="birthday" width="180"></el-table-column>
      <el-table-column label="地址" prop="address" width="280"></el-table-column>
      <el-table-column align="center" width="150">
        <template #header>
          <el-button size="small" text @click="dialog=true">添加</el-button>
        </template>
        <template #default="scope">
          <el-button size="small" type="primary" @click="editDialog(scope.row)">编辑</el-button>
          <!--suppress TypeScriptUnresolvedReference -->
          <el-popconfirm
              cancel-button-text="取消"
              confirm-button-text="确认"
              title="确认删除吗？"
              @confirm="deleteData(scope.row.id)"
          >
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        :current-page="currentPage" :page-size="pageSize"
        :total="total"
        class="p"
        layout="prev,pager,next,jumper"
        @current-change="handleCurrentChange">
    </el-pagination>
    <el-dialog v-model="dialog" title="添加" width="40%">
      <el-form :model="add" label-width="80px">
        <el-form-item label="身份证号">
          <el-input v-model="add.id" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="add.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="add.gender" placeholder="请选择性别" style="width: 100%;">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="民族">
          <el-input v-model="add.nation" placeholder="请输入民族"></el-input>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker v-model="add.birthday" style="width: 100%;" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="add.address" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button class="button" @click="dialog = false">取消</el-button>
        <el-button class="button" type="primary" @click="addData">添加</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="edit" width="40%">
      <el-form :model="editRow" label-width="80px">
        <el-form-item label="身份证号">
          <el-input v-model="editRow.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="editRow.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="editRow.gender" style="width: 100%">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="民族">
          <el-input v-model="editRow.nation"></el-input>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker v-model="editRow.birthday" style="width: 100%;" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="editRow.address"></el-input>
        </el-form-item>


      </el-form>

      <template #footer>
        <el-button @click="edit=false">取消</el-button>
        <el-button type="primary" @click="editData">保存</el-button>
      </template>
    </el-dialog>
  </div>

</template>

<style scoped>
.identity {
  margin-left: 10%;
}

.button {
  margin-top: 10px;
}

.p {
  margin-top: 30px;
  margin-left: 20%;
}
</style>
