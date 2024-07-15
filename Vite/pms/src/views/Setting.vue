<script lang="ts" setup>
import {useDark} from "@vueuse/core";

const isDark = useDark()
</script>

<template>
  <div id="setting">
    <h3>系统设置</h3>
<!--    <div>
      <el-text size="large">一、联系人工：</el-text>
      <el-button @click="help">添加客服QQ</el-button>
    </div>-->
    <div>
      <el-text size="large">二、暗黑模式：</el-text>
      <el-switch v-model="isDark"></el-switch>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    help() {
      window.location.replace("tencent://message/?uin=1624133013&Site=&Menu=yes")
    }
  }
}
</script>
