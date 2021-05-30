<template>
      <ChartDoughnutBase :chart-data="chartData" :height="200" />
</template>

<script>
export default {
  data() {
    return {
      chartData: null
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.chartData = {
        labels: ["Example", "Example 2", "Example 3"],
        datasets: [
          {
            backgroundColor: ["#52b992", "#e2bb68", "#678ecf"],
            hoverBackgroundColor: ["#52b992", "#e2bb68", "#678ecf"],
            data: [10, 20, 40]
          }
        ]
      };
    }
  }
};
</script>