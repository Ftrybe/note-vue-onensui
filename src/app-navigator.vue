<template>
  <div>
    <v-ons-navigator
      swipeable
      swipe-target-width="50px"
      :page-stack="pageStack"
      :pop-page="storePop"
      :options="options"
      :class="{ 'border-radius': borderRadius }"
    ></v-ons-navigator>
  </div>
</template>

<script lang="ts">
import AppSplitter from "./app-splitter.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import {NavigatorModule} from "./store/modules/navigator";
import LoginPage from './pages/login.vue';

@Component
export default class AppNavigator extends Vue {

  private storePop() {
    NavigatorModule.pop();
  }

  private beforeCreate() {
    NavigatorModule.push(AppSplitter);
  }

  get pageStack() {
    return NavigatorModule.stack;
  }

  get options() {
    return NavigatorModule.options;
  }

  get borderRadius() {
    const url: Location = window.location;
    return new URL(url.toString()).searchParams.get("borderradius") !== null;
  }

}
</script>
