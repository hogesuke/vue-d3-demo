<template>
  <ActivityGraph
    :datasets="[
      { key: 'receive', data: normalize(datasets[0]), label: 'Receive', color: '#41bd25' },
      { key: 'send', data: normalize(datasets[1]), label: 'Send', color: '#cb465b' },
    ]"
    :activity-id="activityId"
    title="NIC: #0"
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
      return `nic0-${this.resourceId}`;
    },
  },
  created: async function () {
  },
  methods: {
    normalize (dataset) {
      return dataset.map(d => {
        return { date: d.date, val: (d.val * 8 / 1024).toFixed(2) };
      });
    },
  },
};
</script>

<style scoped lang="stylus">
</style>
