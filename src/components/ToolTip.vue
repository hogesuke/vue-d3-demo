<template>
  <g>
    <circle
      v-if="isActive"
      :cx="dotX"
      :cy="dotY"
      class="dot"
      r="5" />
    <g v-if="isActive">
      <rect
        width="37"
        height="25"
        :x="tooltipRectX"
        :y="tooltipRectY"
        class="tooltip-rect" />
      <line
        :x1="dotX"
        :y1="dotY"
        :x2="tooltipLineToX"
        :y2="tooltipLineToY"
        class="tooltip-line"/>
      <text
        :x="tooltipTextX"
        :y="tooltipTextY"
        fill="#fff"
        font-size="18px"
        text-anchor="end">
        {{ dataset[index].y }}
      </text>
    </g>
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
      cursorIsLeft: true,
      tooltipRectWidth: 37,
      tooltipRectHeight: 25,
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
    dotX () {
      return this.xScale(this.dataset[this.index].x);
    },
    dotY () {
      return this.yScale(this.dataset[this.index].y);
    },
    tooltipRectX () {
      return this.dotX + (this.cursorIsLeft ? 10 : (this.tooltipRectWidth + 10) * -1);
    },
    tooltipRectY () {
      return this.dotY + 7;
    },
    tooltipLineToX () {
      return this.dotX + 11 * (this.cursorIsLeft ? 1 : -1);
    },
    tooltipLineToY () {
      return this.dotY + 8;
    },
    tooltipTextX () {
      return this.dotX + (this.cursorIsLeft ? 38 : -20);
    },
    tooltipTextY () {
      return this.dotY + 26;
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
      this.cursorIsLeft = xPoint <= this.width / 2;
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

  .tooltip-rect {
    fill: #000;
  }

  .tooltip-line {
    stroke: #000;
    stroke-width: 3px;
  }

  .overlay {
    fill-opacity: 0;
  }
</style>
