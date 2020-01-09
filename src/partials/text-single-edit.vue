<template>
  <v-ons-page >
    <v-toolbar v-bind="toolbarInfo">
      <div slot="right">
        <v-ons-toolbar-button icon="ion-ios-save" style="color:#c8e0fb" @click="save()" />
      </div>
    </v-toolbar>
      <div class="inp">
        <v-ons-input float v-model="value" />
      </div>
    <v-ons-list-header style="color:rab(160,160,160);background:none">请在此处输入你的{{toolbarInfo.title}}</v-ons-list-header>
      
  </v-ons-page>
</template>
<script lang='ts'>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component
export default class TextSingleEditComponent extends Vue {
  @Prop() toolbarInfo!: {};

  @Prop() name!:string;

  value:string='';

  mounted() {
    this.value = this.name;
  };

  save(event:Event){
      
  }
}
</script>
<style scoped lang='scss'>
.inp{
  margin: 15px 15px 0;
  border-bottom: 1px solid #03030373;
}
</style>