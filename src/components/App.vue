<template>
  <div>
    <div>
      <button @click="onPrevClick">prev</button>
      <button @click="onNextClick">next</button>
    </div>
    <resource-list
      :app="app"
      :resources="resources"/>
  </div>
</template>

<script>
import * as types from '../store/mutation-types';
import { mapMutations, mapState } from 'vuex';
import ResourceList from './ResourceList';

export default {
  components: {
    ResourceList
  },
  props: {
    app: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      resources: []
    };
  },
  computed: {
    ...mapState([
      'term',
      'pointer'
    ])
  },
  created: async function () {
    this.setCurrentDatetime(new Date());

    const { res } = await this.app.api.request('cloud/1.1/server', { param: { Exclude: ['Zone'] }});
    this.resources = res.servers;
  },
  methods: {
    ...mapMutations({
      setCurrentDatetime: types.SET_CURRENT_DATETIME,
      setPointer: types.SET_POINTER
    }),
    onPrevClick () {
      this.setPointer(this.pointer + 1);
    },
    onNextClick () {
      this.setPointer(this.pointer - 1);
    }
  }
};
</script>

<style scoped>
  p {
    font-size: 100px;
  }
</style>
