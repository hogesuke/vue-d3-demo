<template>
  <div class="graph-container">
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
        :yScale="yScale"
        :ease="ease" />
      <tool-tip
        :width="width"
        :height="height"
        :x="margin.left"
        :y="margin.top"
        :xScale="xScale"
        :yScale="yScale"
        :dataset="datasets[0].data"/> <!-- TODO 複数のデータセットに対応するか否か -->
    </svg>
    <div class="ease-items">
      <button
        v-for="(item, key) in easeItems"
        :key="key"
        :class="{ isActive: ease === item }"
        @click="onEaseItemClick(item)">
        {{ key }}
      </button>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import { Bounce, SteppedEase, Back, Power2 } from 'gsap';
import GraphPath from './GraphPath';
import XAxis from './XAxis';
import YAxis from './YAxis';
import ToolTip from './ToolTip';

export default {
  components: {
    GraphPath,
    XAxis,
    YAxis,
    ToolTip,
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
      easeItems: {
        Power2: Power2.easeIn,
        Bounce: Bounce.easeIn,
        Back: Back.easeIn.config(3),
        SteppedEase: SteppedEase.config(5),
      },
      ease: null,
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
    this.ease = this.easeItems[Object.keys(this.easeItems)[0]];
  },
  methods: {
    onEaseItemClick (item) {
      this.ease = item;
    },
  },
};
</script>

<style lang="scss">
  .graph-container {
    margin: 50px auto;
  }
  .ease-items {
    margin-top: 40px;

    button {
      padding: 10px;
      outline: none;
      background-color: #fff;
      border: solid 1px #999;
      font-size: 18px;
      color: #999;

      &.isActive {
        background-color: #999;
        color: #fff;
      }

      &:not(:last-child) {
        border-right: none;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
