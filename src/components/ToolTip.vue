<template>
  <g>
    <circle
      v-if="isActive"
      :cx="xScale(dataset[index].x)"
      :cy="yScale(dataset[index].y)"
      class="dot"
      r="5" />
    <rect
      :width="width"
      :height="height"
      :x="x"
      :y="y"
      @mousemove="throttledOnMouseMove"
      @mouseout="onMouseOut"
      class="overlay" />
  </g>
</template>

<script>
import _ from 'lodash';

export default {
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
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
    dataset: {
      type: Array,
      required: true,
    },
  },
  data: function () {
    return {
      index: null,
    };
  },
  computed: {
    // NOTE: https://github.com/vuejs/vue/issues/2870#issuecomment-219096773
    throttledOnMouseMove: function () {
      return _.throttle(this.onMouseMove, 50);
    },
    per () {
      return this.width / this.dataset.length;
    },
    isActive () {
      return this.index !== null;
    },
  },
  mounted () {
  },
  methods: {
    onMouseMove: function (e) {
      const targetRect = e.currentTarget;

      if (!targetRect) { return null; }

      const xPoint = e.clientX - targetRect.getBoundingClientRect().left;
      const index = Math.round(xPoint / this.per);

      this.index = index === this.dataset.length ? index - 1 : index;
    },
    onMouseOut () {
      this.throttledOnMouseMove.cancel();
      this.index = null;
    },
  },
};
</script>

<style lang="scss" scoped>
  .dot {
    fill: red;
  }

  .overlay {
    fill-opacity: 0;
  }
</style>
