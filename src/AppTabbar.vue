<template>
  <v-ons-page :style="swipePosition">
    <v-toolbar :style="swipeTheme" modifier="white-content">
      {{ title }}
      <v-ons-toolbar-button
        slot="right"
        modifier="white-content"
        @click="$store.commit('splitter/toggle')"
      >
        <v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon>
      </v-ons-toolbar-button>
    </v-toolbar>
    <v-ons-tabbar
      position="auto"
      swipeable
      :modifier="md ? 'autogrow white-content' : ''"
      :on-swipe="md ? onSwipe : null"
      :tabbar-style="swipeTheme"
      :tabs="tabs"
      :index.sync="index"
    ></v-ons-tabbar>
  </v-ons-page>
</template>

<script lang="ts">
const lerp = (x0: number, x1: number, t: number) =>
  parseInt((1 - t) * x0 + t * x1, 10);
// RGB colors
const red = [244, 67, 54];
const blue = [30, 136, 229];
const purple = [103, 58, 183];
import { Component, Prop, Vue } from "vue-property-decorator";
import Home from "./pages/Home.vue";
import Diary from "./pages/Diary.vue";
import Person from "./pages/Person.vue";
import TabbarModule from './store/modules/tabbar';
import { getModule } from 'vuex-module-decorators';
@Component
export default class AppTabbar extends Vue {
  @Prop() private md!: string;

  private showingTip = false;
  private colors = red;
  private animationOptions = {};
  private topPosition = 0;
  private tabbar: TabbarModule = getModule(TabbarModule);
  private tabs = [
    {
      label: "主页",
      icon: this.md ? null : "ion-aperture",
      page: Home,
      theme: red
    },
    {
      label: "时间轴",
      icon: this.md ? null : "ion-edit",
      page: Diary,
      theme: blue
    },
    {
      label: "我的",
      icon: this.md ? null : "ion-person",
      page: Person,
      theme: purple
    }
  ];

  private onSwipe(index: number, animationOptions: any) {
    // Apply the same transition as ons-tabbar
    this.animationOptions = animationOptions;

    // Interpolate colors and top position
    const a = Math.floor(index);
    const b = Math.ceil(index);
    const ratio = index % 1;
    this.colors = this.colors.map((c, i) =>
      lerp(this.tabs[a].theme[i], this.tabs[b].theme[i], ratio)
    );
    this.topPosition = lerp(
      this.tabs[a].top || 0,
      this.tabs[b].top || 0,
      ratio
    );
  }
  get index() {
    return this.tabbar.index;
  }
  set index(newValue) {
    this.tabbar.set(newValue);
  }

  get title() {
    return this.md
      ? "盲人日记"
      : this.tabs[this.index].title || this.tabs[this.index].label;
  }
  get swipeTheme() {
    return (
      this.md && {
        backgroundColor: `rgb(${this.colors.join(",")})`,
        transition: `all ${this.animationOptions.duration || 0}s ${this
          .animationOptions.timing || ""}`
      }
    );
  }
  get swipePosition() {
    return (
      this.md && {
        top: this.topPosition + "px",
        transition: `all ${this.animationOptions.duration || 0}s ${this
          .animationOptions.timing || ""}`
      }
    );
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
