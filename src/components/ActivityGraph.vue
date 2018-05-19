<template>
  <div
    :style="{ width: svgWidth + 'px', height: svgHeight + 'px' }"
    class="graph-container">
    <svg
      :width="svgWidth"
      :height="svgHeight"
      class="graph">
      <y-axis
        :position="{ x: margin.left, y: 0 }"
        :graphWidth="width"
        :yScale="yScale" />
      <x-axis
        :position="{ x: 0, y: height + margin.top }"
        :xScale="xScale" />
      <graph-path
        v-for="(dataset, index) in datasets"
        :key="index"
        :dataset="dataset"
        :xScale="xScale"
        :yScale="yScale" />
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
import GraphPath from './GraphPath';
import XAxis from './XAxis';
import YAxis from './YAxis';

export default {
  components: {
    GraphPath,
    XAxis,
    YAxis,
  },
  props: {
    datasets: {
      type: Array,
      required: true,
    },
  },
  data: function () {
    return {
      height: 300,
      width: 550,
      ymin: 0,
      ymax: 0,
      margin: { top: 10, right: 30, bottom: 25, left: 55 },
    };
  },
  computed: {
    svgWidth () {
      return this.width + this.margin.left + this.margin.right;
    },
    svgHeight () {
      return this.height + this.margin.top + this.margin.bottom;
    },
    xValues () {
      const values = [];
      for (let a of this.datasets) {
        values.push(...a.data.map(b => b.x));
      }
      return values;
    },
    yValues () {
      const values = [];
      for (let a of this.datasets) {
        values.push(...a.data.map(b => b.y));
      }
      return values;
    },
    xMin () {
      return d3.min(this.xValues);
    },
    xMax () {
      return d3.max(this.xValues);
    },
    yMin () {
      // return d3.min(this.yValues);
      return 0;
    },
    yMax () {
      return d3.max(this.yValues);
    },
    xScale () {
      return d3.scaleLinear()
        .domain([ this.xMin, this.xMax ])
        .range([this.margin.left, this.width + this.margin.left]);
    },
    yScale () {
      return d3.scaleLinear()
        .domain([ this.yMin, this.yMax ])
        .range([this.height + this.margin.top, this.margin.top]);
    },
  },
  mounted () {
  },
  methods: {
  },
};
</script>

<style lang="scss">
  .graph-container {
    margin: 50px auto;
  }
</style>
