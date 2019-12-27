<template>
  <v-ons-page>
    <v-toolbar v-bind="toolbarInfo"></v-toolbar>
    <v-ons-list>
      <v-touch @swipe="test" :swipe-options="{direction:'left'}">
      <time-line-item v-for="(data,index) of diarys" :key="index" :item="data"></time-line-item>
      </v-touch>
    </v-ons-list>
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
import { RouterUtils } from '../utils/router.utils';
@Component({
  components: {
    TimeLineItem
  }
})
export default class TimeLinePage extends Vue {
  @Prop() toolbarInfo!:{};
  navigatorVuex: NavigatorModule = getModule(NavigatorModule);

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
  test(){
    alert(111);
  }
  private forward(item: any) {
    // this.navigatorVuex.option({
    //   animation: "slide",
    //   callback: () => this.navigatorVuex.option({})
    // });
    this.navigatorVuex.push({
      extends: item.page,
      onsNavigatorOptions: {
        animation: "slide"
      },
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