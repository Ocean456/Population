<script lang="ts">

import axios from "axios";

const spring = axios.create({
  baseURL: 'http://localhost:2020/api/all'
})
export default {
  data() {
    return {
      id: '',
      search: {
        id: '',
        name: '',
        gender: '',
        nation: '',
        birthday: '',
        address: '',
        former: '',
        origin: '',
        birthplace: '',
        education: '',
        career: '',
        marital: '',
        period: '',
      }
    }
  },
  methods: {
    async searchData() {
      await spring.get('/search', {params: {id: this.id}})
          .then(response => {
            this.search = response.data
          })
    }
  }
}
</script>

<template>
  <div class="search">
    <el-scrollbar height="88vh">
      <h3>信息查询</h3>
      <el-form>
        <el-form-item label="身份证号：">
          <el-input v-model="id" style="width: 90%">
            <template #append>
              <el-button @click="searchData">查询</el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <el-card class="card identity" shadow="hover">
        <template #header>
          <el-text>身份信息</el-text>
        </template>
        <el-form :label-position="'left'" label-width="90px">
          <el-form-item label="身份证号：">
            <el-input v-model="search.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input v-model="search.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="性别：">
            <el-input v-model="search.gender" disabled></el-input>
          </el-form-item>
          <el-form-item label="民族：">
            <el-input v-model="search.nation" disabled></el-input>
          </el-form-item>
          <el-form-item label="出生日期：">
            <el-date-picker v-model="search.birthday" disabled style="width: 100%"></el-date-picker>
          </el-form-item>
          <el-form-item label="地址：">
            <el-input v-model="search.address" disabled></el-input>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card class="card domicile" shadow="hover">
        <template #header>
          <el-text>户籍信息</el-text>
        </template>
        <el-form :label-position="'left'" label-width="90px">
          <el-form-item label="曾用名：">
            <el-input v-model="search.former" disabled></el-input>
          </el-form-item>
          <el-form-item label="籍贯：">
            <el-input v-model="search.origin" disabled></el-input>
          </el-form-item>
          <el-form-item label="出生地：">
            <el-input v-model="search.birthplace" disabled></el-input>
          </el-form-item>
          <el-form-item label="教育程度：">
            <el-input v-model="search.education" disabled></el-input>
          </el-form-item>
          <el-form-item label="职业">
            <el-input v-model="search.career" disabled></el-input>
          </el-form-item>
          <el-form-item label="婚姻状况：">
            <el-input v-model="search.marital" disabled></el-input>
          </el-form-item>
        </el-form>
      </el-card>
    </el-scrollbar>
  </div>
</template>

<style scoped>


.card {
  margin-bottom: 1vh;
  width: 90%;
}

</style>
