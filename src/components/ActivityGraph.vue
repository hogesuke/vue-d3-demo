<template>
  <div class="graph-container">
    <div
      :style="{ width: svgWidth + 'px', height: svgHeight + 'px' }"
      class="graph">
      <svg
        :width="svgWidth"
        :height="svgHeight">
        <g
          :transform="`translate(${margin.left}, 0)`"
          class="y axis"/>
        <g
          :transform="`translate(0, ${height + margin.top})`"
          class="x axis"/>
        <graph-path
          v-for="(dataset, index) in datasets"
          :key="index"
          :dataset="dataset"
          :xScale="xScale"
          :yScale="yScale"
          class="graph-line"/>
        <rect
          :width="width"
          :height="height"
          :x="margin.left"
          :y="margin.top"/>
      </svg>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import GraphPath from './GraphPath';

export default {
  components: {
    GraphPath,
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
      width: 485,
      ymin: 0,
      ymax: 0,
      margin: { top: 10, right: 30, bottom: 20, left: 55 },
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
      return d3.min(this.yValues);
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
    this.svg = d3.select('svg');

    // this.$watch('datasets', (newData, oldData) => {
    //   if (_.isEqual(newData, oldData) || this.datasets.length <= 0) {
    //     return;
    //   }

    // this.checkMinMax();
    this.createAxis(this.datasets[0].data);
    // });
  },
  methods: {
    createAxis (data) {
      const xAxis = d3.axisBottom(this.xScale)
        .tickSizeInner(0)
        .tickSizeOuter(0) // 目盛線の長さ（外側）
        .tickPadding(10) // 目盛線とテキストの間の長さ
        // .tickFormat(d3.timeFormat('%H:%M'))
        .ticks(4);

      const yAxis = d3.axisLeft(this.yScale)
        .tickSizeInner(-this.width)
        .tickSizeOuter(0)
        .tickPadding(10)
        .ticks(4);

      this.svg.select('g.x.axis').call(xAxis);
      this.svg.select('g.y.axis').call(yAxis);
    },
  },
};
</script>

<style lang="scss">
  // NOTE: scoped styleにするとグラフにスタイルを当てられないためscopedにしていない

  .graph-container {

    .graph {
      position: relative;
      margin-top: 10px;

      svg {
        position: relative;

        rect {
          fill-opacity: 0;
        }
      }

      .yaxis-text {
        fill: #aaa;
      }

      .x.axis,
      .y.axis {
        font-weight: 700;

        .domain {
          stroke: #aaa;
        }

        g.tick {
          line {
            stroke: #eaeaea;
          }
          text {
            fill: rgba(0, 0, 0, .5);
          }
        }
      }
    }
  }
</style>
