<template>
  <v-ons-page>
    <v-ons-splitter>
      <v-ons-splitter-side
        swipeable
        side="right"
        collapse
        width="100%"
        :swipe-target-width="md && 25"
        :animation="md ? 'overlay' : 'reveal'"
        :open.sync="isOpen"
      >
        <menu-page></menu-page>
      </v-ons-splitter-side>

      <v-ons-splitter-content>
        <app-tabbar></app-tabbar>
      </v-ons-splitter-content>
    </v-ons-splitter>
  </v-ons-page>
</template>

<script lang="ts">
import AppTabbar from './AppTabbar.vue';
import MenuPage from './pages/Menu.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import SplitterModule from './store/modules/splitter';

@Component({
  components: {
    AppTabbar,
    MenuPage,
  },
})
export default class AppSplitter extends Vue {

  constructor(){
    super();
  }
  get isOpen() {
    return getModule(SplitterModule).open;
  }
  set isOpen(newValue) {
    getModule(SplitterModule).toggle(newValue);
  }
}
</script>

<style>
ons-splitter-side[animation="overlay"] {
  border-left: 1px solid #bbb;
}
</style>
