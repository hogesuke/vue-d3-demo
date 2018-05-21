<template>
  <div>
    <div>
      <button
        @click="datasets = generateData()"
        class="random-button">
        Random
      </button>
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

<style lang="scss" scoped>
  .random-button {
    padding: 10px;
    outline: none;
    background-color: #fff;
    border: solid 1px #999;
    font-size: 18px;
    color: #999;

    &.isActive {
      background-color: #999;
      color: #fff;
    }

    &:not(:last-child) {
      border-right: none;
    }

    &:hover {
      cursor: pointer;
    }
  }
</style>
