<script lang="ts">
import axios from "axios";
import {ElMessage} from "element-plus";

const api = axios.create({
  baseURL: 'http://localhost:2020/api/domicile'
})
export default {
  data() {
    return {
      select: 'id',
      keyword: '',
      totalData: [],
      total: 0,
      pageSize: 16,
      currentPage: 1,
      pageData: [],
      detailData: {
        id: '',
        name: '',
        former: '',
        birthplace: '',
        gender: '',
        origin: '',
        nation: '',
        birthday: '',
        education: '',
        marital: '',
        career: ''
      },
      editData: {
        id: '',
        name: '',
        former: '',
        birthplace: '',
        gender: '',
        origin: '',
        nation: '',
        birthday: '',
        education: '',
        marital: '',
        career: ''
      },
      submit: {
        id: '',
        name: '',
        former: '',
        birthplace: '',
        gender: '',
        origin: '',
        nation: '',
        birthday: '',
        education: '',
        marital: '',
        career: ''
      },
      editDialog: false,
      detailDialog: false,
      submitDialog: false
    }
  },
  methods: {
    async loadData() {
      await api.get('/search')
          .then(response => {
            this.totalData = response.data
          })
      this.getPageData()
    },
    search() {
      api.get('/search', {params: {type: this.select, index: this.keyword}})
          .then(response => {
                this.totalData = response.data
                this.getPageData()
              }
          )

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
    detail(row) {
      const index = this.totalData.findIndex((item) => item.id === row.id)
      this.detailData = {...this.totalData[index]}
      this.detailDialog = true
    },
    handleClose() {
      this.detailDialog = false
    },
    edit(row) {
      const index = this.totalData.findIndex((item) => item.id === row.id)
      this.editData = {...this.totalData[index]}
      this.editDialog = true
    },
    update() {
      api.put("/edit", this.editData)
          .then(response => {
            ElMessage({
              type: "success",
              message: response.data
            })
            this.search();
            this.editDialog = false
            this.handleCurrentChange(this.currentPage)
          })
          .catch(error => {
            ElMessage({
              type: "error",
              message: error
            })
          })

    },
    deleteData(id) {
      api.delete('/delete', {params: {id: id}})
          .then(response => {
            ElMessage({
              message: response.data,
              type: 'success'
            })
            this.search();
          })
          .catch(error => {
            ElMessage({
              message: error,
              type: 'warning'
            })
          })
    },
    addData() {
      if (this.submit.id != '' && this.submit.name != '' && this.submit.gender != '' && this.submit.nation != '' && this.submit.origin != '') {
        api.post('/add', this.submit)
            .then(response => {
              ElMessage({
                message: response.data,
                type: 'success'
              })
              this.search();
              this.submit = {};
              this.submitDialog = false
              this.handleCurrentChange(this.currentPage)
            })
            .catch(error => {
              ElMessage({
                message: error,
                type: 'warning'
              })
            })
      } else {
        ElMessage.error("请完成表单")
      }
    },
  },
  mounted() {
    this.loadData()
  }
}
</script>

<template>
  <div class="domicile">
    <h3>户籍信息管理</h3>
    <el-input v-model="keyword" style="max-width: 915px">
      <template #prepend>
        <el-select v-model="select" style="width: 115px;">
          <el-option label="身份证号" value="id"></el-option>
          <el-option label="姓名" value="name"></el-option>
          <el-option label="籍贯" value="native"></el-option>
        </el-select>
      </template>
      <template #append>
        <el-button @click="search">查询</el-button>
      </template>
    </el-input>
    <el-table :data="pageData"
              border height="720" stripe style="width: 915px">
      <el-table-column label="身份证号" prop="id" width="180"></el-table-column>
      <el-table-column label="姓名" prop="name" width="100"></el-table-column>
      <el-table-column label="性别" prop="gender" width="60"></el-table-column>
      <el-table-column label="民族" prop="nation" width="100"></el-table-column>
      <el-table-column label="籍贯" prop="origin" width="250"></el-table-column>
      <el-table-column align="center" width="225">
        <template #header>
          <el-button size="small" text @click="submitDialog=true">添加</el-button>
        </template>
        <template #default="scope">
          <el-button size="small" type="info" @click="detail(scope.row)">查看</el-button>
          <el-button size="small" type="primary" @click="edit(scope.row)">编辑</el-button>
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
    <el-dialog v-model="detailDialog" :before-close="handleClose">
    <el-descriptions border>
      <el-descriptions-item label="姓名">{{ detailData.name }}</el-descriptions-item>
      <el-descriptions-item label="身份证号">{{ detailData.id }}</el-descriptions-item>
      <el-descriptions-item label="曾用名">{{ detailData.former }}</el-descriptions-item>
      <el-descriptions-item label="性别">{{ detailData.gender }}</el-descriptions-item>
      <el-descriptions-item label="籍贯">{{ detailData.origin }}</el-descriptions-item>
      <el-descriptions-item label="民族">{{ detailData.nation }}</el-descriptions-item>
      <el-descriptions-item label="出生日期">{{ detailData.birthday }}</el-descriptions-item>
      <el-descriptions-item label="教育程度">{{ detailData.education }}</el-descriptions-item>
      <el-descriptions-item label="婚姻状况">{{ detailData.marital }}</el-descriptions-item>
      <el-descriptions-item label="出生地" span="2">{{ detailData.birthplace }}</el-descriptions-item>
      <el-descriptions-item label="职业">{{ detailData.career }}</el-descriptions-item>
    </el-descriptions>
  </el-dialog>
  <el-dialog v-model="editDialog">
    <el-form :inline="true" :model="editData" label-width="80px">
      <el-form-item label="身份证号">
        <el-input v-model="editData.id" disabled style="min-width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="editData.name" style="min-width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="editData.gender" style="width: 100%; min-width: 300px">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="民族">
        <el-input v-model="editData.nation" style="min-width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker
            v-model="editData.birthday"
            style="min-width: 300px"
            type="date"
            value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="出生地">
        <el-input v-model="editData.birthplace" style="min-width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="曾用名">
        <el-input v-model="editData.former" style="min-width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="籍贯">
        <el-input v-model="editData.origin" style="min-width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="教育程度">
        <el-input v-model="editData.education" style="min-width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="婚姻状况">
        <el-input v-model="editData.marital" style="min-width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="职业">
        <el-input v-model="editData.career" style="min-width: 300px"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="editDialog=false">取消</el-button>
      <el-button type="primary" @click="update">保存</el-button>
    </template>
  </el-dialog>
  <el-dialog v-model="submitDialog">
    <el-form :inline="true" :model="submit" label-width="80px">
      <el-form-item label="身份证号">
        <el-input v-model="submit.id" style="min-width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="submit.name" style="min-width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="submit.gender" placeholder="选择" style="width: 100%; min-width: 300px">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="民族">
        <el-input v-model="submit.nation" style="min-width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker v-model="submit.birthday" style="min-width: 300px" type="date"></el-date-picker>
      </el-form-item>
      <el-form-item label="出生地">
        <el-input v-model="submit.birthplace" style="min-width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="曾用名">
        <el-input v-model="submit.former" style="min-width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="籍贯">
        <el-input v-model="submit.origin" style="min-width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="教育程度">
        <el-input v-model="submit.education" style="min-width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="婚姻状况">
        <el-input v-model="submit.marital" style="min-width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="职业">
        <el-input v-model="submit.career" style="min-width: 300px"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitDialog=false">取消</el-button>
      <el-button type="primary" @click="addData">保存</el-button>
    </template>
  </el-dialog>
  </div>

</template>

<style scoped>
.p {
  margin-top: 30px;
  margin-left: 20%;
}

.domicile {
  margin-left: 10%;
}
</style>
