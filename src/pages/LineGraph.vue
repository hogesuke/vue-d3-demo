<template>
  <div>
    <div>LineGraphだよ</div>
    <activity-graph
      :datasets="[{ data: datasets, color: '#4080d8' }]" /> <!-- datasetsの命名をどうにかしたい -->
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
      datasets: [
        { x: 1, y: 10 },
        { x: 2, y: 15 },
        { x: 3, y: 5 },
        { x: 4, y: 9 },
        { x: 5, y: 30 },
        { x: 6, y: 25 },
      ],
    };
  },
  computed: {
  },
  mounted () {
  },
  methods: {
  },
};
</script>

<style scoped>
</style>
