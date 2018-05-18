<template>
  <div>
    <div>折れ線グラフ</div>
    <div>
      <button @click="datasets = generateData()">Change</button>
    </div>
    <activity-graph :datasets="[{ data: datasets, color: '#4080d8' }]" /> <!-- datasetsの命名をどうにかしたい -->
  </div>
</template>

<script>
import ActivityGraph from '../components/ActivityGraph';

export default {
  components: {
    ActivityGraph,
  },
  props: {
  },
  data: function () {
    return {
      datasets: this.generateData(),
    };
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    getRandom (max, min) {
      return Math.floor(Math.random() * (max + 1 - min)) + min;
    },
    generateData () {
      const data = [];
      for (let i = 1; i <= 50; i++) {
        data.push({ x: i, y: this.getRandom(0, 100) });
      }
      return data;
    },
  },
};
</script>

<style scoped>
</style>
