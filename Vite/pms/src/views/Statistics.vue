<template>
  <div>
    <h3>人口统计</h3>
    <div>
      <el-button @click="showAgeChart">年龄比例查看</el-button>
      <el-button @click="showEducationChart">学历比例查看</el-button>
      <el-button @click="showGenderChart">男女比例查看</el-button>
    </div>
    <h2>{{ currentChartTitle }}</h2>
    <apexchart v-if="currentChartType === 'pie'" :options="currentChartOptions" :series="currentChartSeries"
               :type="currentChartType" width="700"></apexchart>
    <apexchart v-else-if="currentChartType === 'bar'" :options="currentChartOptions" :series="currentChartSeries"
               :type="currentChartType" class="bar-chart"></apexchart>
  </div>
</template>

<script>
import axios from 'axios';
import {ElButton} from 'element-plus';

const api = axios.create({
  baseURL: 'http://localhost:2020/api/analysis'
})

export default {
  components: {
    ElButton
  },
  data() {
    return {
      currentChartType: 'pie',
      currentChartTitle: '年龄比例查看',
      currentChartOptions: {},
      currentChartSeries: [],
      ageChartOptions: {
        chart: {
          id: 'age-chart-example'
        },
        labels: ['10岁以下', '10岁至18岁', '18岁至30岁', '30岁至60岁', '60岁以上'],
        colors: ['#e74c3c', '#f39c12', '#f1c40f', '#2ecc71', '#3498db']
      },
      ageChartSeries: [],
      educationChartOptions: {
        chart: {
          id: 'education-chart-example'
        },
        labels: ['小学', '初中', '高中', '大学', '研究生'],
        colors: ['#e74c3c', '#f39c12', '#f1c40f', '#2ecc71', '#3498db']
      },
      educationChartSeries: [],
      genderChartOptions: {
        chart: {
          id: 'gender-chart-example'
        },
        xaxis: {
          categories: ['Male', 'Female'],
        },
      },
      genderChartSeries: []
    };
  },
  mounted() {
    this.fetchDataCounts();
  },
  methods: {
    async fetchDataCounts() {
      await Promise.all([
        api.get('/ageCounts'),
        api.get('/educationData'),
        api.get('/genderCount')
      ])
          .then(([ageResponse, educationResponse, genderResponse]) => {
            const ageDataCounts = ageResponse.data;
            this.ageChartSeries = ageDataCounts.slice(0, 5);
            this.educationChartSeries = educationResponse.data;

            const genderDataCounts = genderResponse.data;
            this.genderChartSeries = [
              {
                name: '男',
                data: [genderDataCounts[0]],
              },
              {
                name: '女',
                data: [genderDataCounts[1]],
              },
            ];

            this.updateChart();
          })
          .catch(error => {
            console.error('Error fetching data counts:', error);
          });
    },
    showAgeChart() {
      this.currentChartType = 'pie';
      this.currentChartTitle = '年龄比例查看';
      this.updateChart();
    },
    showEducationChart() {
      this.currentChartType = 'pie';
      this.currentChartTitle = '学历比例查看';
      this.updateChart();
    },
    showGenderChart() {
      this.currentChartType = 'bar';
      this.currentChartTitle = '男女比例查看';
      this.updateChart();
    },
    updateChart() {
      if (this.currentChartType === 'pie') {
        this.currentChartOptions = this.currentChartTitle === '年龄比例查看' ? this.ageChartOptions : this.educationChartOptions;
        this.currentChartSeries = this.currentChartTitle === '年龄比例查看' ? this.ageChartSeries : this.educationChartSeries;
      } else if (this.currentChartType === 'bar') {
        this.currentChartOptions = this.genderChartOptions;
        this.currentChartSeries = this.genderChartSeries;
      }
    }
  }
};
</script>

<style>
.bar-chart {
  width: 600px;
  height: 400px;
}
</style>
