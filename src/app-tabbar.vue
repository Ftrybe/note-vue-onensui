<template>
  <v-ons-page>
    <v-toolbar modifier="white-content" :title="title">
      <!-- {{ title }} -->
      <v-ons-toolbar-button slot="left" modifier="white-content" @click="splitter.toggle()">
        <v-ons-icon icon="ion-ios-menu"></v-ons-icon>
      </v-ons-toolbar-button>
    </v-toolbar>
    <v-ons-tabbar position="auto" swipeable :tabs="tabs" :index.sync="index"></v-ons-tabbar>
  </v-ons-page>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import HomePage from "./pages/home.vue";
import TabbarModule from "./store/modules/tabbar";
import SplitterModule from "./store/modules/splitter";
import { getModule } from "vuex-module-decorators";
import TimeLinePage from './pages/time-line.vue';
import PublicPage from './pages/public.vue';
@Component
export default class AppTabbar extends Vue {
  private tabbar: TabbarModule = getModule(TabbarModule);
  private splitter: SplitterModule = getModule(SplitterModule);
  private tabs = [
    {
      label: "主页",
      icon: "ion-ios-home",
      page: HomePage
    },
    {
      label: "广场",
      icon: "ion-ios-aperture",
      page: PublicPage
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
