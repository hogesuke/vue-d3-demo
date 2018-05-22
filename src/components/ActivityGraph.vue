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
        :ease="ease"
        @change-path="handleChangePath"/>
      <tool-tip
        :width="width"
        :height="height"
        :x="margin.left"
        :y="margin.top"
        :xScale="xScale"
        :yScale="yScale"
        :dataset="datasets[0].data"/> <!-- TODO 複数のデータセットに対応するか否か -->
    </svg>
    <textarea
      v-if="showDescription"
      v-model="pathDescription"
      :style="{ height: svgHeight + 'px' }"
      class="path-description">
    </textarea>
    <div class="button-container">
      <div class="ease-items">
        <button
          v-for="(item, key) in easeItems"
          :key="key"
          :class="{ isActive: ease === item }"
          class="ease-button"
          @click="onEaseItemClick(item)">
          {{ key }}
        </button>
      </div>
      <button
        @click="showDescription = !showDescription"
        :class="{ isActive: showDescription }"
        class="d-button">
        d
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
        Power2: Power2.easeOut,
        Bounce: Bounce.easeOut,
        Back: Back.easeOut.config(3),
        SteppedEase: SteppedEase.config(5),
      },
      ease: null,
      pathDescription: null,
      showDescription: false,
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
    handleChangePath (pathDescription) {
      this.pathDescription = pathDescription;
    },
  },
};
</script>

<style lang="scss">
  .graph-container {
    margin: 50px auto;
  }
  .path-description {
    box-sizing: border-box;
    width: 600px;
    padding: 10px;
    resize: none;
    outline: none;
    font-size: 12px;
    line-height: 1.2em;
    color: #666;
  }
  .button-container {
    display: flex;
    justify-content: center;
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

      &:hover {
        cursor: pointer;
      }
    }

    .ease-items {
      button:not(:last-child) {
        border-right: none;
      }
    }

    .d-button {
      margin-left: 20px;
      padding: 10px 15px;
    }
  }
</style>
