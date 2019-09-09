<template>
  <div class="flex-column">
    <div>
        <input :value="localValue" @input="changeValue" readonly>   
    </div>
  
    <ul class="">
      <li v-for="(item,index) of list" :key="index" @click="select(item.value)">
          {{item.value}}
      </li>
    </ul>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component
export default class DropdownSelectComponent extends Vue {
    @Prop()
    value?:any;

    @Prop()
    list?:any;

    localValue:any = this.value;
    select(value:string){
        this.localValue = value;
    }
    @Emit()
    changeValue(value:string){
        value = this.localValue;
    }



}
</script>
<style scoped lang='scss'>
</style>