<template>
  <v-ons-action-sheet :visible.sync="isVisible" cancelable>
    <v-date-picker
      v-model="date"
      :popover="{visibility:'click',placement:'bottom'}"
      class="w-100"
      is-inline
    ></v-date-picker>
    <v-ons-action-sheet-button @click="savePicker(date)">保存</v-ons-action-sheet-button>
  </v-ons-action-sheet>
</template>
<script lang='ts'>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import { DateFilter } from "@/core/filters/date.filter";
import { getModule } from 'vuex-module-decorators';
import ActionSheetModule from '../store/modules/action-sheet';

@Component
export default class DatePickerComponent extends Vue {

  actionSheetModule:ActionSheetModule = getModule(ActionSheetModule);

  get isVisible(){
    return this.actionSheetModule.visible;
  }

  set isVisible(value){
    this.actionSheetModule.switch();
  }
  date: Date = new Date();

  @Emit("save")
  savePicker(date: Date) {}
}
</script>
<style scoped lang='scss'>
</style>