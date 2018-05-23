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
    ease: {
      type: Object,
      required: false,
    },
    curve: {
      type: Function,
      required: false,
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
        .curve(this.curve);
    },
  },
  mounted () {
    this.description = this.generateDescription();
    this.handleUpdate();
  },
  methods: {
    tweenPath (detaset) {
      TweenLite.to(
        this.$data,
        this.ease === null ? 0 : 1,
        {
          description: this.generateDescription(detaset),
          ease: this.ease,
          onUpdate: this.handleUpdate,
        }
      );
    },
    generateDescription () {
      return this.line(this.dataset.data);
    },
    handleUpdate () {
      this.$emit('change-path', this.description);
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
