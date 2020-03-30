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
import { getModule } from "vuex-module-decorators";
import NavigatorModule from "./store/modules/navigator";
import LoginPage from './pages/login.vue';

@Component
export default class AppNavigator extends Vue {
  navigator: NavigatorModule = getModule(NavigatorModule);

  private storePop() {
    this.navigator.pop();
  }

  private beforeCreate() {
    this.navigator = getModule(NavigatorModule);
    this.navigator.push(AppSplitter);
  }

  get pageStack() {
    return this.navigator.stack;
  }

  get options() {
    return this.navigator.options;
  }

  get borderRadius() {
    const url: Location = window.location;
    return new URL(url.toString()).searchParams.get("borderradius") !== null;
  }

}
</script>
