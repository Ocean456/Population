<template>
    <div class="login-container">
        <el-card class="login-card">
            <template #header>
                <p style="text-align: center;font-size: 20px">登录</p>
            </template>
            <el-form class="login-form" label-position="top">
                <el-form-item label="用户名">
                    <el-input v-model="username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="password" placeholder="请输入密码" show-password @keyup.enter="login"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="login-button" type="primary" @click="login">登录</el-button>
                </el-form-item>
                <!--        <el-form-item>
                          <el-button class="register-button" type="info" @click="register">注册</el-button>
                        </el-form-item>-->
            </el-form>
        </el-card>
    </div>
</template>

<script>
import router from "../router/index.ts";
import {ElMessage} from "element-plus";

export default {
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        login() {
            if (this.username && this.password) {
                this.$store.dispatch('login', {username: this.username, password: this.password})
                    .then(() => {
                        router.push('/');
                    })
                    .catch(error => {
                        ElMessage.warning(error.response.data);
                    });
            } else {
                ElMessage.warning("请输入用户名和密码");
            }
        },
        register() {
            router.push('/register')
        },
    },
    mounted() {
        document.body.style.backgroundImage = 'url("/wave.svg")'
    }
};
</script>


<style scoped>
* {
    user-select: none;
}

.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    width: 65vw;
    margin: auto;
}

.login-card {
    width: 400px;
    padding: 24px;
}

/*.login-title {
    text-align: center;
    font-size: 24px;
    margin-bottom: 24px;
}*/

.login-form {
    width: 100%;
}

.login-button {
    margin-top: 10px;
    width: 100%;
}

/*.register-button {
    width: 100%;
}*/

</style>
<style>
body {
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
}
</style>
