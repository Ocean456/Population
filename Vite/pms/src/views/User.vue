<script>
import store from "../store/index.ts";
import {ElMessage} from "element-plus";
import axios from 'axios'
import {mapGetters} from "vuex";

const api = axios.create({
  baseURL: 'http://localhost:2020/api'
})

export default {
  computed: {
    ...mapGetters(["currentUser", "isLoggedIn", "MenuUI"]),
    username() {
      return this.currentUser ? this.currentUser.username : "";
    }
  },
  data() {
    return {
      info: {
        id: '',
        name: '',
        gender: '男',
        nation: '',
        birthday: '',
        address: '',
      },
      migrate: {
        id: '',
        address: '',
        old: '',
        date: '',
        reason: '',
        status: 0,
        checkDisable: false
      },
      certify: {
        id: '',
        type: 'identity',
        reason: '',
        period: '',
        status: 0,
        checkDisable: false
      },
      active: 'info',
      existCertify: 0,
      existMigrate: 0,
      existModification: 0,
      modify: false,
      form: {
        oPassword: '',
        nPassword: '',
        aPassword: ''
      }
    }
  },
  methods: {
    help() {
      window.location.replace("tencent://message/?uin=1624133013&Site=&Menu=yes")
    },
    load() {
      api.get('/identity/personal', {params: {username: this.username}})
          .then(response => {
            this.info = response.data
            this.certify.id = this.info.id
            this.migrate.id = this.info.id
            this.migrate.old = this.info.address
          })
    },
    submitMigrate() {
      const data = {
        id: this.migrate.id,
        address: this.migrate.address,
        date: this.migrate.date,
        reason: this.migrate.reason,
        status: 1
      }
      api.post('/migrate/add', data)
          .then(response => {
            ElMessage.success(response.data)
            this.checkMigrate()
          })
          .catch(error => {
            ElMessage.warning(error.response.data)
          })
    },
    submitCertify() {
      const data = {
        id: this.certify.id,
        type: this.certify.type,
        reason: this.certify.reason,
        period: this.certify.period,
        status: 1
      }
      api.post('/issuance/add', data)
          .then(response => {
            ElMessage.success(response.data);
            this.checkCertify()
          })
          .catch(error => {
            ElMessage.warning(error.response.data)
          })

    },
    checkCertify() {
      api.get('/issuance/get', {params: {id: this.certify.id, type: this.certify.type}})
          .then(response => {
            this.existCertify = 1
            this.certify.status = response.data.status
            this.certify.period = response.data.period
            this.certify.reason = response.data.reason
            this.certify.checkDisable = true
          })
          .catch(error => {
            ElMessage.warning(error)
          })
    },
    checkMigrate() {
      api.get('/migrate/get', {params: {id: this.migrate.id}})
          .then(response => {
            this.existMigrate = 1
            this.migrate.address = response.data.address
            this.migrate.date = response.data.date
            this.migrate.reason = response.data.reason
            this.migrate.status = response.data.status
            this.migrate.checkDisable = true
          })
          .catch(error => {
            ElMessage.warning(error)
          })
    },
    resetCertify() {
      this.existCertify = 0
      this.certify.checkDisable = false
    },
    resetMigrate() {
      this.existMigrate = 0
      this.migrate.checkDisable = false
    },
    submitPassword() {

      if (this.form.nPassword === this.form.aPassword && this.form.aPassword !== '' && this.form.oPassword !== '') {
        const user = {
          username: this.username,
          password: this.form.nPassword,
          old: this.form.oPassword
        };

        api.put('/edit', user)
            .then(response => {
              ElMessage.success(response.data)
              this.modify = false
            })
            .catch(error => {
              ElMessage.error(error.response.data)
            })
      } else ElMessage.error("请正确填写表单")
    }
  },
  mounted() {
    this.load();
  },


}
</script>

<template>
  <div class="UserInfo">
    <el-tabs v-model="active" class="tabs">
      <el-tab-pane label="信息登记" name="info">
        <el-card class="card">
          <h3 class="Personal">居民信息查看</h3>
          <el-form class="user-form" label-position="right" label-width="100px">
            <el-form-item label="身份证号">
              <el-input v-model="info.id" disabled style="width: 95%;"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="info.name" disabled style="width: 95%; "></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="info.gender" disabled placeholder="男" style="width: 95%; ">
                <el-option label="男" value="男"/>
                <el-option label="女" value="女"/>
              </el-select>
            </el-form-item>
            <el-form-item label="民族">
              <el-input v-model="info.nation" disabled style="width: 95%; "></el-input>
            </el-form-item>
            <el-form-item label="出生日期">
              <el-date-picker
                  v-model="info.birthday"
                  disabled
                  style="width: 95%"
                  type="date"
                  value-format="YYYY-MM-DD"
              />
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="info.address" disabled style="width: 95%; "></el-input>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="证件申请" name="card">
        <el-card class="card">
          <h3 class="Person">居民证件申请</h3>
          <el-form class="Certify_form" label-position="right" label-width="100px">
            <el-form-item label="身份证号">
              <el-input v-model="certify.id" disabled style="width: 95%;"></el-input>
            </el-form-item>
            <el-form-item label="证件类型">
              <el-select v-model="certify.type" :disabled="this.certify.checkDisable" style="width: 95%;">
                <el-option label="身份证" value="identity"></el-option>
                <el-option label="户口簿" value="domicile"></el-option>
                <el-option label="居住证明" value="resident"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="申请原因">
              <el-input
                  v-model="certify.reason"
                  :disabled="this.certify.checkDisable"
                  placeholder=""
                  style="width: 95%;"
                  type="textarea"></el-input>
            </el-form-item>
            <div class="buttonBox" style="display: flex">
              <el-button v-if="!existCertify" @click="checkCertify">查看申请</el-button>
              <el-text v-if="existCertify &&certify.status===0" class="tip1" type="success">申请成功</el-text>
              <el-text v-if="existCertify &&certify.status===1" class="tip2" type="info">申请审核中</el-text>
              <el-text v-if="existCertify &&certify.status===2" class="tip3" type="danger">申请驳回</el-text>
              <el-text v-if="existCertify &&certify.status===undefined" class="tip4" type="warning">未查询到信息
              </el-text>
              <div style="flex-grow: 1"></div>
              <el-button v-if="existCertify" @click="resetCertify">重置</el-button>
              <el-button @click="submitCertify">提交申请</el-button>
            </div>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="迁移管理" name="migrate">
        <el-card class="card">
          <h3>迁移信息管理</h3>
          <el-form class="migrate-form" label-position="right" label-width="100px">
            <el-form-item label="身份证号" label-width="100px">
              <el-input v-model="migrate.id" disabled style="width: 95%;"></el-input>
            </el-form-item>
            <el-form-item label="原地址" label-width="100px">
              <el-input v-model="migrate.old" disabled style="width: 95%;"></el-input>
            </el-form-item>
            <el-form-item label="迁移地点" label-width="100px">
              <el-input v-model="migrate.address" :disabled="this.migrate.checkDisable"
                        placeholder="请输入您要迁移的地点"
                        style="width: 95%;"></el-input>
            </el-form-item>
            <el-form-item label="迁移时间" label-width="100px">
              <el-date-picker
                  v-model="migrate.date"
                  :disabled="this.migrate.checkDisable"
                  placeholder="请选择您的迁移日期"
                  style="width: 95%;height: 40px"
                  type="date"
              />
            </el-form-item>
            <el-form-item label="迁移原因" label-width="100px">
              <el-input v-model="migrate.reason" :disabled="this.migrate.checkDisable" style="width: 95%"
                        type="textarea"></el-input>
            </el-form-item>
            <div class="buttonBox" style="display: flex">
              <el-button v-if="!existMigrate" @click="checkMigrate">查看申请</el-button>
              <el-text v-if="existMigrate &&migrate.status===0" class="tip1" type="success">申请成功</el-text>
              <el-text v-if="existMigrate &&migrate.status===1" class="tip2" type="info">申请审核中</el-text>
              <el-text v-if="existMigrate &&migrate.status===2" class="tip3" type="danger">申请驳回</el-text>
              <el-text v-if="existMigrate &&migrate.status===undefined" class="tip4" type="warning">未查询到信息
              </el-text>
              <div style="flex-grow: 1"></div>
              <el-button @click="resetMigrate">重置</el-button>
              <el-button @click="submitMigrate">提交申请</el-button>
            </div>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="系统设置" name="setting">
        <h1>系统设置</h1>
        <div>
          <el-text size="large">一、寻找帮助：</el-text>
          <el-button @click="help">添加客服QQ</el-button>
        </div>
        <div>
          <el-text size="large">二、暗黑模式：</el-text>
          <el-switch v-model="isDark"></el-switch>
        </div>
        <div>
          <el-text size="large">三、密码修改：</el-text>
          <el-button @click="this.modify=true">重置密码</el-button>
        </div>
        <el-button @click="store.dispatch('logout')">退出登录</el-button>
        <el-dialog v-model="this.modify" width="30%">
          <el-form :model="this.form" label-position="top">
            <el-form-item label="原始密码:">
              <el-input v-model="this.form.oPassword" placeholder="请输入你的原始密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码:">
              <el-input v-model="this.form.nPassword" placeholder="请输入你的新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码:">
              <el-input v-model="form.aPassword" placeholder="请确认你的新密码"></el-input>
            </el-form-item>
            <div style="display: flex">
              <el-button @click="this.modify=false">取消</el-button>
              <div style="flex-grow: 1"></div>
              <el-button @click="submitPassword">确认</el-button>
            </div>
          </el-form>
        </el-dialog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
h3 {
  margin-bottom: 40px;
}

.card {
  width: 50vw;
  margin-left: 15%;
  margin-top: 150px;
}

.user-form {
  margin-bottom: 30px;
}

.tabs {
  width: 75vw;
}

</style>
<script setup>
import {useDark} from "@vueuse/core";

const isDark = useDark()
</script>
