<template>
  <v-ons-page>
    <v-toolbar v-bind="toolbarInfo">
      <div slot="right">
        <v-toolbar-search></v-toolbar-search>
      </div>
    </v-toolbar>
    <v-ons-list>
      <v-ons-card>测试</v-ons-card>
      <v-ons-card>测试</v-ons-card>
      <v-ons-card>测试</v-ons-card>
      <v-ons-card>测试</v-ons-card>
      <v-ons-card>测试</v-ons-card>
      <v-ons-list-item>测试</v-ons-list-item>
      <v-ons-list-item>测试</v-ons-list-item>
      <v-ons-list-item>测试</v-ons-list-item>
      <v-ons-list-item>测试</v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from "vue-property-decorator";
import ToolbarSearchComponent from '../partials/toolbar-search.vue';

@Component({
  components:{
    'v-toolbar-search':ToolbarSearchComponent
  }
})
export default class DiaryListPage extends Vue {
  @Prop() toolbarInfo!: {};
}
</script>
<style scoped lang='scss'>

</style>