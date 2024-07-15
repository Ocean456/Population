<script lang="ts">
import axios from "axios";
import {ElMessage} from "element-plus";

const spring = axios.create({
  baseURL: 'http://localhost:2020/api/all'
})
export default {
  data() {
    return {
      submit: {
        id: '',
        name: '',
        gender: '男',
        nation: '',
        birthday: new Date(),
        address: '',
        former: '',
        origin: '',
        birthplace: '',
        education: '',
        career: '',
        marital: '未婚',
      }
    }
  },
  methods: {
    submitData() {
      spring.post('/add', this.submit)
          .then(response => {
            ElMessage({
              type: "success",
              message: response.data
            })
          })
          .catch(error => {
            ElMessage({
              message: error.response.data,
              type: 'warning'
            })
          })
    }
  }
}
</script>

<template>
  <el-scrollbar height="88vh">
    <div class="population">
      <h3>人口登记</h3>
      <el-card class="card identity" shadow="hover">
        <template #header>
          <el-text>身份登记</el-text>
        </template>
        <el-form :label-position="'left'" label-width="90px">
          <el-form-item label="身份证号：">
            <el-input v-model="submit.id"></el-input>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input v-model="submit.name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="submit.gender" style="width: 100%;">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="民族：">
            <el-input v-model="submit.nation"></el-input>
          </el-form-item>
          <el-form-item label="出生日期：">
            <el-date-picker v-model="submit.birthday" style="width: 100%"></el-date-picker>
          </el-form-item>
          <el-form-item label="地址：">
            <el-input v-model="submit.address"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card class="card domicile" shadow="hover">
        <template #header>
          <el-text>户籍登记</el-text>
        </template>
        <el-form :label-position="'left'" label-width="90px">
          <el-form-item label="曾用名：">
            <el-input v-model="submit.former"></el-input>
          </el-form-item>
          <el-form-item label="籍贯：">
            <el-input v-model="submit.origin"></el-input>
          </el-form-item>
          <el-form-item label="出生地：">
            <el-input v-model="submit.birthplace"></el-input>
          </el-form-item>
          <el-form-item label="教育程度：">
            <el-input v-model="submit.education"></el-input>
          </el-form-item>
          <el-form-item label="职业">
            <el-input v-model="submit.career"></el-input>
          </el-form-item>
          <el-form-item label="婚姻状况：">
            <el-select v-model="submit.marital" style="width: 100%;">
              <el-option label="未婚" value="未婚"></el-option>
              <el-option label="已婚" value="已婚"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-card>
      <el-button class="submit" @click="submitData">登记</el-button>
    </div>
  </el-scrollbar>
</template>

<style scoped>
.card {
  margin-bottom: 1vh;
  width: 90%;
}

.submit {
  margin-left: 40%;
  margin-top: 20px;
  margin-bottom: 30px;
}
</style>
