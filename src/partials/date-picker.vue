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

@Component
export default class DatePickerComponent extends Vue {

  date = Date.now();

  @Emit("save")
  savePicker(date: Date) {}
}
</script>
<style scoped lang='scss'>
</style>