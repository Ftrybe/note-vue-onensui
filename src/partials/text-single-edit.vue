<template>
  <v-ons-page >
    <v-toolbar v-bind="toolbarInfo">
      <div slot="right">
        <v-ons-icon icon="md-save" style="color:#c8e0fb" @click="save()"></v-ons-icon>
      </div>
    </v-toolbar>
      <div class="inp">
        <v-ons-input float v-model="value"></v-ons-input>
      </div>
    <v-ons-list-header style="color:rab(160,160,160);background:none">请在此处输入你的昵称</v-ons-list-header>
      
  </v-ons-page>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class TextSingleEditComponent extends Vue {
  @Prop() toolbarInfo!: {};

  @Prop() name!:string;

  value:string='';

  mounted() {
    this.value = this.name;
  };
  save(){
      
  }
}
</script>
<style scoped lang='scss'>
.inp{
  margin: 15px 15px 0;
  border-bottom: 1px solid #03030373;
}
</style>