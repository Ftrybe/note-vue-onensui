<template>
  <v-ons-page>
    <v-ons-splitter>
      <v-ons-splitter-side
        swipeable
        side="left"
        collapse
        width="80%"
        :animation="'overlay'"
        :open.sync="isOpen"
      >
        <person-page></person-page>
      </v-ons-splitter-side>

      <v-ons-splitter-content>
        <app-tabbar></app-tabbar>
      </v-ons-splitter-content>
    </v-ons-splitter>
  </v-ons-page>
</template>

<script lang="ts">
import AppTabbar from './app-tabbar.vue';
import PersonPage from '@/pages/person.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import {SplitterModule} from './store/modules/splitter';
import store from './store';

@Component({
  components: {
    AppTabbar,
    PersonPage,
  },
})
export default class AppSplitter extends Vue {
  subscribe:any;
  get isOpen() {
    return SplitterModule.open;
  }
  set isOpen(newValue) {
    SplitterModule.toggle(newValue);
  }
  // 
  created(){
    this.subscribe =  store.subscribe((mutation,state)=>{
      if(mutation.type === "errorTip"){
        this.$ons.notification.toast(mutation.payload,{
          title: "",
          buttonLabels: "关闭",
          timeout: 1500
        });
      }
		})
  }
  destroyed(){
    this.subscribe();
  
  }
  
  
}
</script>

<style>
ons-splitter-side[animation="overlay"] {
  border-left: 1px solid #bbb;
}
</style>
