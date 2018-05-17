<template>
  <ActivityGraph
    :datasets="[{ key: 'cputime', data: normalize(datasets[0]), label: 'CPU-TIME', color: '#4080d8' }]"
    :activity-id="activityId"
    title="CPU-TIME"
    unit="msec"/>
</template>

<script>
import ActivityGraph from '../ActivityGraph';

export default {
  components: {
    ActivityGraph
  },
  props: {
    resourceId: {
      type: String,
      required: true
    },
    datasets: {
      type: Array,
      required: true
    }
  },
  data: function () {
    return {
    };
  },
  computed: {
    activityId () {
      return `cpu-${this.resourceId}`;
    }
  },
  created: async function () {
  },
  methods: {
    normalize (dataset) {
      return dataset.map(d => {
        return { date: d.date, val: (d.val * 1000).toFixed(2) };
      });
    }
  }
};
</script>

<style scoped lang="stylus">
</style>
