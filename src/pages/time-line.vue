<template>
 <v-ons-page modifier="white">
    <v-ons-list>
      <time-line-item v-for="(data,index) of diarys" :key="index" :item="data"></time-line-item>
    </v-ons-list>

    <v-ons-speed-dial position="bottom right" direction="up" :open.sync="spdOpen">
      <v-ons-fab>
        <v-ons-icon icon="md-edit"></v-ons-icon>
      </v-ons-fab>

      <v-ons-speed-dial-item
        v-for="(item, index) of addItems"
        :key="index"
        @click="navigator(item)"
        :alt="item.name"
      >
        <v-ons-icon :icon="item.icon"></v-ons-icon>
      </v-ons-speed-dial-item>
    </v-ons-speed-dial>
  </v-ons-page>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import TimeLineItem from "@/partials/time-line-item.vue";
import DiaryEditPage from "./diary-edit.vue";
import MemorandumPage from "./memorandum-edit.vue";
import NavigatorModule from "@/store/modules/navigator";
import { getModule } from "vuex-module-decorators";
import { Component as VueComponent } from "vue";
@Component({
  components: {
    TimeLineItem
  }
})
export default class TimeLinePage extends Vue {
navigatorVuex: NavigatorModule = getModule(NavigatorModule);

  // 添加按钮
  spdOpen: boolean = false;
  addItems = [
    {
      name: "diary",
      icon: "md-book",
      page: DiaryEditPage
    },
    {
      name: "memorandum",
      icon: "md-bookmark",
      page: MemorandumPage
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

  private navigator(item: any) {
    this.navigatorVuex.push({
      extends: item.page,
      onsNavigatorProps: {
        toolbarInfo: {
          backLabel: "时间轴",
          title: item.name
        }
      }
    });
  }
}
</script>
<style scoped>

</style>