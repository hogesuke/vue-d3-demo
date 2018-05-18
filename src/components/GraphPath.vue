<template>
  <path
    :d="description"
    :style="{ stroke: dataset.color }"
    class="graph-path"/>
</template>

<script>
import * as d3 from 'd3';
import TweenLite from 'gsap';

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
      description: null,
    };
  },
  watch: {
    dataset: {
      handler: function (newVal) {
        this.tweenPath(newVal);
      },
      deep: true,
    },
  },
  computed: {
    line () {
      return d3.line()
        .x(d => this.xScale(d.x))
        .y(d => this.yScale(d.y))
        .curve(d3.curveLinear);
    },
  },
  mounted () {
    this.description = this.generateDescription();
  },
  methods: {
    tweenPath (detaset) {
      TweenLite.to(
        this.$data,
        0.5,
        { description: this.generateDescription(detaset) }
      );
    },
    generateDescription: function () {
      return this.line(this.dataset.data);
    },
  },
};
</script>

<style lang="scss" scoped>
  .graph-path {
    stroke-width: 2px;
    fill: none;
  }
</style>
