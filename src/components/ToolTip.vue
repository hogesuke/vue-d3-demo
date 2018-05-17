<template>
  <div
    :class="{ active: active }"
    class="tooltip">
    <div>{{ formatDate(date) }}</div>
    <!-- TODO: value, valuesの命名変えたい -->
    <div
      v-for="value in values"
      :key="value.label"
      class="legend">
      <span
        :style="{ backgroundColor: value.color }"
        class="label">{{ value.label }}</span>
      <span class="val">{{ value.val }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    values: {
      type: Array,
      required: true,
    },
  },
  data: function () {
    return {
    };
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    formatDate (date) {
      return moment(date).format('MM/DD hh:mm');
    },
  },
};
</script>

<style lang="scss" scoped>
  .tooltip {
    position: absolute;
    background-color: rgba(0, 0, 0, .45);
    padding: 5px;
    width: 100px;
    color: #fff;
    font-size: 10px;
    text-align: right;
    opacity: 0;
    transition: opacity .2s linear;

    &.active {
      opacity: 1;
    }

    .legend {
      .label {
        padding: 2px 3px;
      }
      .val {
        margin-left: 2px;
      }
    }
  }
</style>
