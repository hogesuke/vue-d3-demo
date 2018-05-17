<template>
  <ActivityGraph
    :datasets="[
      { key: 'write', data: normalize(datasets[0]), label: 'Write', color: '#ea8735' },
      { key: 'read', data: normalize(datasets[1]), label: 'Read', color: '#377ee9' },
    ]"
    :activity-id="activityId"
    title="DISK: #0"
    unit="kbps"/>
</template>

<script>
import ActivityGraph from '../ActivityGraph';

export default {
  components: {
    ActivityGraph,
  },
  props: {
    resourceId: {
      type: String,
      required: true,
    },
    datasets: {
      type: Array,
      required: true,
    },
  },
  data: function () {
    return {
    };
  },
  computed: {
    activityId () {
      return `disk0-${this.resourceId}`;
    },
  },
  created: async function () {
  },
  methods: {
    normalize (dataset) {
      return dataset.map(d => {
        return { date: d.date, val: (d.val / 1024).toFixed(2) };
      });
    },
  },
};
</script>

<style scoped lang="stylus">
</style>
