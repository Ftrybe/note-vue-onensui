<template>
  <v-ons-page>
    <v-toolbar modifier="white-content">
      {{ title }}
      <v-ons-toolbar-button slot="left" modifier="white-content" @click="splitter.toggle()">
        <v-ons-icon icon="ion-navicon"></v-ons-icon>
      </v-ons-toolbar-button>
    </v-toolbar>

    <v-ons-tabbar position="auto" swipeable :tabs="tabs" :index.sync="index"></v-ons-tabbar>
  </v-ons-page>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Home from "./pages/home.vue";
import Diary from "./pages/diary.vue";
import Person from "./pages/person.vue";
import TabbarModule from "./store/modules/tabbar";
import SplitterModule from "./store/modules/splitter";
import { getModule } from "vuex-module-decorators";
import Express from './pages/express.vue';
@Component
export default class AppTabbar extends Vue {
  private tabbar: TabbarModule = getModule(TabbarModule);
  private splitter: SplitterModule = getModule(SplitterModule);
  private tabs = [
    {
      label: "主页",
      icon: "ion-aperture",
      page: Home
    },
    {
      label: "时间轴",
      icon: "ion-edit",
      page: Diary
    },
    {
      label: "表白墙",
      icon: "ion-person",
      page: Express
    }
  ];

  get index() {
    return this.tabbar.index;
  }
  set index(newValue) {
    this.tabbar.set(newValue);
  }

  get title() {
    return this.tabs[this.index].label;
  }
}
</script>

<style>
/* Custom 'white-content' modifier */

.page--material .toolbar--white-content__center,
.page--material .toolbar-button--white-content,
.page--material :checked + .tabbar--white-content__button {
  color: white;
}

.page--material .tabbar--white-content__button {
  color: rgba(255, 255, 255, 0.7);
}

.page--material .tabbar--white-content__border {
  background-color: white;
}
</style>
