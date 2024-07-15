<script lang="ts">
import axios from "axios";
import router from "../router";
import {ElMessage} from "element-plus";

const api = axios.create({
  baseURL: 'http://localhost:2020/api'
})
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        again: '',
        id: ''
      }
    }
  },
  methods: {
    async register() {
      if (this.form.username && this.form.password && this.form.password == this.form.again && this.form.id) {
        await api.post('/register', {
          username: this.form.username,
          password: this.form.password,
          id: this.form.id
        }).then(async response => {
          ElMessage({
            type: "success",
            message: response.data
          })
        }).catch(error => {
          ElMessage({
            type: "error",
            message: error.response.data
          })
        })
      } else {
        ElMessage.warning("请完成表单")
      }
    },
    back() {
      router.push('/login')
    }
  },
  mounted() {
    document.body.style.backgroundImage = 'url("/wave.svg")'
  }

}
</script>

<template>
  <div class="register">
    <el-card class="registerCard">
      <h1>注册</h1>
      <el-form class="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password">
          <el-input v-model="form.again" placeholder="请再次输入密码" show-password></el-input>
        </el-form-item>

        <el-form-item label="身份证号">
          <el-input v-model="form.id" placeholder="请输入身份证号"></el-input>
        </el-form-item>
      </el-form>
      <div style="display: flex">
        <el-button class="leftButton" @click="back">返回登录</el-button>
        <div class="flex-grow"></div>
        <el-button class="rightButton" type="primary" @click="register">注册</el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
h1 {
  user-select: none;
  text-align: center;
  font-size: 25px;
}

.register {
  margin: auto;
  width: 500px;
}

.form {
  margin: auto 0;
}

.registerCard {
  margin-top: 40%;
  backdrop-filter: blur(0.5);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
}

.leftButton {
  margin-top: 5%;
  margin-left: 10%;
}

.rightButton {
  margin-top: 5%;

  margin-right: 10%;
}
</style>
