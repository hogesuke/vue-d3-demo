<template>
  <path
    :d="d"
    :style="{ stroke: dataset.color }"
    class="graph-line"/>
</template>

<script>
import * as d3 from 'd3';

export default {
  props: {
    dataset: {
      type: Object,
      required: true,
    },
    xScale: {
      type: Function,
      required: true,
    },
    yScale: {
      type: Function,
      required: true,
    },
  },
  data: function () {
    return {
    };
  },
  computed: {
    line () {
      return d3.line()
        .x(d => this.xScale(d.x))
        .y(d => this.yScale(d.y))
        .curve(d3.curveLinear);
    },
    d () {
      return this.line(this.dataset.data);
    },
  },
  mounted () {
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
  .graph-line {
    stroke-width: 1.2px;
    fill: none;
  }
</style>
