<template>
  <v-ons-page modifier="white">
    <v-ons-list>
      <time-line v-for="(data,index) of diarys" :key="index" :item="data"></time-line>
    </v-ons-list>

    <v-ons-speed-dial position="bottom right" direction="up" :open.sync="spdOpen">
      <v-ons-fab>
        <v-ons-icon icon="md-edit"></v-ons-icon>
      </v-ons-fab>

      <v-ons-speed-dial-item
        v-for="(item, index) of addItems"
        :key="index"
        @click="navigator()"
        :alt="item.name"
      >
        <v-ons-icon :icon="item.icon"></v-ons-icon>
      </v-ons-speed-dial-item>
    </v-ons-speed-dial>
  </v-ons-page>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import TimeLine from "@/partials/time-line.vue";
import DiaryModify from "./diary-modify.vue";
import NavigatorModule from "@/store/modules/navigator";
import { getModule } from "vuex-module-decorators";
import { Component as VueComponent } from "vue";
@Component({
  components: {
    TimeLine
  }
})
export default class Diary extends Vue {
  // vuex模块
  navigatorVuex: NavigatorModule = getModule(NavigatorModule);

  // 添加按钮
  spdOpen: boolean = false;
  addItems = [
    {
      name: "diary",
      icon: "md-library",
      page: DiaryModify
    },
    {
      name: "memorandum",
      icon: "md-memory"
    },
    {
      name: "express",
      icon: "md-favorite"
    }
  ];
  diarys = [
    {
      title: "什么东西1",
      createTime: new Date()
    },
    {
      title: "什么东西2",
      createTime: new Date()
    },
    {
      title: "什么东西3",
      createTime: new Date()
    },
    {
      title: "什么东西4",
      createTime: new Date()
    }
  ];

  private DiaryModify = DiaryModify;

  private navigator(page: VueComponent, title: string) {
    this.navigatorVuex.push({
      extends: page,
      onsNavigatorProps: {
        toolbarInfo: {
          backLabel: "时间轴",
          title: title
        }
      }
    });
  }
}
</script>

<style scoped>
</style>
