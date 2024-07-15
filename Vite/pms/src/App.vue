<template>
  <div class="app">
    <el-container>
      <el-header v-if="MenuUI" class="headMenu">
        <el-menu :ellipsis="false" mode="horizontal">
          <el-menu-item id="logo">人口基本信息管理系统</el-menu-item>
          <el-menu-item v-if="!isLoggedIn" @click="router().push('/login')">登录系统</el-menu-item>
          <div class="flex-grow"></div>
          <el-sub-menu index="#">
            <template #title>
              <el-icon>
                <User/>
              </el-icon>
              <el-text>{{ username }}</el-text>
            </template>
            <el-menu-item @click="logout">退出登录</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-header>
      <el-container class="content">
        <el-aside v-if="MenuUI" width="130px">
          <el-menu id="side" :default-active="$route.path" class="sidebar" router>
            <el-menu-item index="/">
              <el-icon>
                <House/>
              </el-icon>
              <el-text>系统首页</el-text>
            </el-menu-item>
            <el-menu-item index="/identity">
              <el-icon>
                <UserFilled/>
              </el-icon>
              <el-text>身份信息</el-text>
            </el-menu-item>
            <el-menu-item index="/domicile">
              <el-icon>
                <Position/>
              </el-icon>
              <el-text>户籍信息</el-text>
            </el-menu-item>
            <el-menu-item index="/resident">
              <el-icon>
                <Avatar/>
              </el-icon>
              <el-text>居住证明</el-text>
            </el-menu-item>
            <el-menu-item index="/population">
              <el-icon>
                <Collection/>
              </el-icon>
              <el-text>人口登记</el-text>
            </el-menu-item>
            <el-menu-item index="/search">
              <el-icon>
                <Search/>
              </el-icon>
              <el-text>信息查询</el-text>
            </el-menu-item>
            <el-menu-item index="/issue">
              <el-icon>
                <Promotion/>
              </el-icon>
              <el-text>证件发放</el-text>
            </el-menu-item>
            <el-menu-item index="/statistics">
              <el-icon>
                <TrendCharts/>
              </el-icon>
              <el-text>人口统计</el-text>
            </el-menu-item>
            <el-menu-item index="/migrate">
              <el-icon>
                <CopyDocument/>
              </el-icon>
              <el-text>迁移管理</el-text>
            </el-menu-item>

            <el-menu-item index="/export">
              <el-icon>
                <DocumentChecked/>
              </el-icon>
              <el-text>信息导出</el-text>
            </el-menu-item>
            <el-menu-item index="/setting">
              <el-icon>
                <Setting/>
              </el-icon>
              <el-text>系统设置</el-text>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view class="view"/>
          </el-main>
        </el-container>
      </el-container>
    </el-container>

  </div>
</template>

<script lang="ts">

import {
  Avatar, Collection, CopyDocument, DataAnalysis, DocumentChecked,
  Download,
  HomeFilled,
  House,
  MoreFilled, Place, Position, Promotion,
  Rank, Search,
  Setting,
  TrendCharts,
  User,
  UserFilled
} from "@element-plus/icons-vue";
import {mapGetters} from "vuex";
import router from "./router";
import store from "./store";
import {ElMessage} from "element-plus";

// noinspection JSUnusedGlobalSymbols
export default {
  components: {
    DocumentChecked,
    Position,
    DataAnalysis,
    CopyDocument,
    Place,
    Promotion,
    Search,
    Collection, Avatar, HomeFilled, MoreFilled, Rank, TrendCharts, UserFilled, House, User, Download, Setting
  },
  computed: {
    ...mapGetters(["currentUser", "isLoggedIn", "MenuUI"]),
    username() {
      return this.currentUser ? this.currentUser.username : "";
    }
  },
  data() {
    return {
      login: store.state.loggedIn
    }
  },

  methods: {
    router() {
      return router
    },
    logout() {
      store.dispatch('logout')
          .then(() => {
            router.push('/login');
            ElMessage({
              message: '退出成功',
              type: 'success'
            })
          })
    }
  },
  mounted() {
    document.getElementById("app").style.backgroundImage = "none"
  }
}
</script>

<style>


#logo {
  user-select: none;
  pointer-events: none;
}

.sidebar {
  height: 90vh;
}

.flex-grow {
  flex-grow: 1;
}

.view {
  margin-left: 10%;
}


</style>
<style scoped>
.headMenu{
  padding: 0;
}
</style>
