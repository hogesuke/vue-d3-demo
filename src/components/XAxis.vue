<template>
  <g :transform="`translate(${position.x}, ${position.y})`" />
</template>

<script>
import * as d3 from 'd3';

export default {
  props: {
    position: {
      type: Object,
      required: true,
    },
    xScale: {
      type: Function,
      required: true,
    },
  },
  data: function () {
    return {
    };
  },
  computed: {
    xAxis () {
      return d3.axisBottom(this.xScale)
        .tickSizeInner(0)
        .tickSizeOuter(0) // 目盛線の長さ（外側）
        .tickPadding(10) // 目盛線とテキストの間の長さ
        .ticks(4);
    },
  },
  mounted () {
    d3.select(this.$el).call(this.xAxis);
  },
  methods: {
  },
};
</script>

<style lang="scss">
  g {
    .domain {
      stroke: #aaa;
    }

    g.tick {
      line {
        stroke: #eaeaea;
      }
      text {
        fill: rgba(0, 0, 0, .5);
        font-weight: 700;
        font-size: 14px;
      }
    }
  }
</style>
