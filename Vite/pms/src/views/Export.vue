<template>
  <div v-loading="loading" class="export">
    <h3>信息导出</h3>
    <el-button @click="exportIdentity">身份信息导出</el-button>
    <el-button @click="exportDomicile">户籍信息导出</el-button>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import Papa from 'papaparse';
import {ElMessage} from "element-plus";

const api = axios.create({
  baseURL: 'http://localhost:2020/api'
})
export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async exportIdentity() {
      this.loading = true
      await api.get('/identity/search')
          .then(response => {
            const data = response.data;
            const txt = Papa.unparse(data);
            const blob = new Blob([txt], {type: 'text/csv;charset=UTF-8;'});
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = 'identity.txt';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            this.loading = false
          }).catch(error => {
            ElMessage.error(error)
          })
    },
    async exportDomicile() {
      this.loading = true
      await api.get('/domicile/search')
          .then(response => {
            const data = response.data;
            const txt = Papa.unparse(data);
            const blob = new Blob([txt], {type: 'text/csv;charset=UTF-8;'});
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = 'identity.txt';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            this.loading = false
          }).catch(error => {
            ElMessage.error(error)
          })
    }
  }
}
</script>

<style scoped>

</style>
