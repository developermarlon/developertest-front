<template lang="pug">
  v-container
    ChartLineBase(:chart-data="chartData" :height="200")
</template>
<script>
export default {
  data() {
    return {
      chartData: null,
      data: [2, 14, 5, 10, 3, 13, 15],
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.chartData = {
        labels: this.labels,
        datasets: [
          {
            borderColor: "#52b992",
            data: this.data,
            label: "Example",
            backgroundColor: 'transparent'
          }
        ]
      };
    },
    updateChart() {
      this.$nextTick(() => {
        this.fillData();
      });
    }
  }
};
</script>