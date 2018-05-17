<template>
  <div class="resource-item">
    <div class="resource-info">
      <p class="name">{{ resource.name }}</p>
      <div class="tags">
        <span
          v-for="(tag, index) in resource.tags"
          :key="index"
          class="tag">
          {{ tag }}
        </span>
      </div>
      <p class="description">{{ resource.description }}</p>
      <div class="spec">
        <span>プラン/{{ resource.serverPlan.cpu }}Core-{{ resource.serverPlan.memoryMB / 1024 }}GB</span>
      </div>
    </div>
    <div class="activity-graphs">
      <cpu-time-activity
        :datasets="[sliceData(cpuTimeData)]"
        :resource-id="resource.id" />
      <nic-activity
        :datasets="[
          sliceData(nicReceiveData),
          sliceData(nicSendData)
        ]"
        :resource-id="resource.id" />
      <disk-activity
        :datasets="[
          sliceData(diskWrite),
          sliceData(diskRead)
        ]"
        :resource-id="resource.id" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ActivityGraph from './ActivityGraph';
import NicActivity from './graphs/NicActivity';
import CpuTimeActivity from './graphs/CpuTimeActivity';
import DiskActivity from './graphs/DiskActivity';
import * as d3 from 'd3';

export default {
  components: {
    ActivityGraph,
    CpuTimeActivity,
    NicActivity,
    DiskActivity
  },
  props: {
    app: {
      type: Object,
      required: true
    },
    resource: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      cpuTimeData: [],
      nicReceiveData: [],
      nicSendData: [],
      diskWrite: [],
      diskRead: []
    };
  },
  computed: {
    ...mapState([
      'term',
      'currentDatetime',
      'pointer'
    ])
  },
  created: async function () {
    await this.fetchCpuTimeMonitor();
    await this.fetchNicMonitor();
    await this.fetchDiskMonitor();
  },
  methods: {
    normalize (data, type) {
      const timeParser = d3.timeParse('%Y-%m-%dT%H:%M:%S%Z');

      return _.chain(data)
        .map((v, k) => {
          return { date: timeParser(k), val: v[type] };
        })
        .filter(v => v.val !== null)
        .value();
    },
    sliceData (data) {
      const minPerRecord = 5; // 何分ごとにレコードが出力されているか
      const recordPerHour = 60 / minPerRecord; // 1時間あたりのレコード数
      const recordLength = recordPerHour * this.term; // 取得レコード数
      const startIndex = data.length - ((this.pointer + 1) * recordLength);
      const endIndex = startIndex + recordLength;

      return data.slice(startIndex, endIndex);
    },
    fetchCpuTimeMonitor: async function () {
      const { res } = await this.app.api.request(`cloud/1.1/server/${this.resource.id}/monitor`, {});
      this.cpuTimeData = this.normalize(res.data, 'CPU-TIME');
    },
    fetchNicMonitor: async function () {
      const { res } = await this.app.api.request(`cloud/1.1/interface/${this.resource.interfaces[0].id}/monitor`, {});
      this.nicReceiveData = this.normalize(res.data, 'Receive');
      this.nicSendData = this.normalize(res.data, 'Send');
    },
    fetchDiskMonitor: async function () {
      const { res } = await this.app.api.request(`cloud/1.1/disk/${this.resource.disks[0].id}/monitor`, {});
      this.diskWrite = this.normalize(res.data, 'Write');
      this.diskRead = this.normalize(res.data, 'Read');
    }
  }
};
</script>

<style scoped lang="stylus">
  .resource-item {
    display: flex;
    padding: 10px;
    margin-bottom: 10px;

    .resource-info {
      min-width: 400px;
      max-width: 400px;

      .name {
        margin: 0 0 5px 0;
        font-size: 14px;
        font-weight: 700;
        color: rgba(0, 0, 0, .8);
      }
      .tags {
        margin-bottom: 5px;

        .tag {
          padding: 2px;
          color: rgba(30,123,255,0.7)
        }
      }
      .description {
        margin: 5px 0;
        font-size: 13px;
        color: rgba(0, 0, 0, .6);
      }
    }

    .activity-graphs {
      display: flex;
      margin-left: 30px;
    }
  }
</style>
