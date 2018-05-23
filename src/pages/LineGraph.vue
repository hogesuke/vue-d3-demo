<template>
  <div>
    <div>
      <button
        @click="datasets = generateRandomData()"
        class="random-button">
        Random
      </button>
    </div>
    <my-graph
      :datasets="[{ data: datasets, color: '#4080d8' }]"
      @random="datasets = generateRandomData()"/> <!-- datasetsの命名をどうにかしたい -->
  </div>
</template>

<script>
import Graph from '../components/Graph';

export default {
  components: {
    myGraph: Graph,
  },
  props: {
  },
  data: function () {
    return {
      datasets: this.generateRandomData(),
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
    generateRandomData () {
      const data = [];
      for (let i = 0; i <= 50; i++) {
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
