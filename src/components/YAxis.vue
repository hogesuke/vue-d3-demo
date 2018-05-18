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
    graphWidth: {
      type: Number,
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
    yAxis () {
      return d3.axisLeft(this.yScale)
        .tickSizeInner(-this.graphWidth)
        .tickSizeOuter(0)
        .tickPadding(10)
        .ticks(4);
    },
  },
  mounted () {
    d3.select(this.$el).call(this.yAxis);
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
