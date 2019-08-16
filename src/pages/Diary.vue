<template>
  <v-ons-page modifier="white">
    <v-ons-list>
      <time-line v-for="(data,index) of diarys" :key="index" :item="data" ></time-line>
    </v-ons-list>
    <v-ons-fab position="bottom right" :visible="fabVisible" @click="push(DiaryModify,'1')">
      <v-ons-icon icon="md-edit"></v-ons-icon>
    </v-ons-fab>
  </v-ons-page>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import TimeLine from "@/partials/time-line.vue";
import DiaryModify from "./diary-modify.vue";
import NavigatorModule from "@/store/modules/navigator";
import { getModule } from "vuex-module-decorators";
import { Component as VueComponent} from 'vue';
@Component({
  components: {
    TimeLine
  }
})
export default class Diary extends Vue {
  navigator: NavigatorModule = getModule(NavigatorModule);

   diarys =
    [{
      "title": "什么东西1",
      "createTime": new Date()
    },
    {
      "title": "什么东西2",
      "createTime": new Date()
    },
    {
      "title": "什么东西3",
      "createTime": new Date()
    },
    {
      "title": "什么东西4",
      "createTime": new Date()
    }]

  private fabVisible = true;
  private DiaryModify = DiaryModify;

  private push(page: VueComponent, title: string) {
    this.navigator.push({
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
