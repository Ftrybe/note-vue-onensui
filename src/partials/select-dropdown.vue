<template>
  <div class="flex-column dd-select">
    <div class="dd-select-inp-box" @click="showPopover($event,'down',true)">
      <slot name="select-icon">
        <v-ons-icon class="dd-select-icon" icon="ion-pricetags"></v-ons-icon>
      </slot>
      <input class="dd-select-inp" :value="localValue" @input="changeValue" readonly />
      <span class="dd-suffix-box">
        <i class="dd-suffix"></i>
      </span>
    </div>

    <v-ons-popover
      cancelable
      :visible.sync="popoverVisible"
      :target="popoverTarget"
      :direction="popoverDirection"
      :cover-target="coverTarget"
      :mask-color="'rgba(0,0,0,0)'"
      :options="options"
    >
    <v-ons-list class="dd-options">
      <v-ons-list-item v-for="(item,index) of list" :key="index" @click="select(item.value)">
        <slot name="option-icon">
            <v-ons-icon class="dd-select-icon" icon="ion-pricetag"></v-ons-icon>
          </slot>
          <span>
            {{item.value}}
          </span>
          
      </v-ons-list-item>
    </v-ons-list>
    </v-ons-popover>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { PopoverOptions } from '../core/models/ons';

@Component
export default class SelectDropdownComponent extends Vue {
  @Prop()
  value?: any;

  @Prop()
  list?: any;

  popoverVisible = false;
  popoverTarget = null;
  popoverDirection = "down";
  coverTarget = true;
  localValue: any = this.value;
  options: PopoverOptions = {
      animation:'fade'
  };
  select(value: string) {
    this.localValue = value;
  }
  @Emit()
  changeValue(value: string) {
    value = this.localValue;
  }
  showPopover(event: any, direction: any, coverTarget = false) {
    this.popoverTarget = event;
    this.popoverDirection = direction;
    this.coverTarget = coverTarget;
    this.popoverVisible = true;
  }
}
</script>
<style scoped lang='scss'>
.dd-select {
  width: 100%;
  position: relative;
  .dd-select-inp-box {
    height: 24px;
    display: flex;
    align-items: center;
    .dd-select-inp {
      border: none;
      max-width: 5rem;
    }
    .dd-suffix-box {
      width: 16px;
      height: 0;
      margin-top: 0.5625rem;
      .dd-suffix {
        margin-left: 8px;
        width: 0;
        height: 0;
        &::after {
          content: "";
          width: 0;
          height: 0;
          border: 0.375rem solid transparent;
          border-top: 0.375rem solid #000;
        }
      }
    }
  }

  &-icon {
    margin-right: 8px;
  }
}
.dd-options {
  list-style: none;
  margin: 0;
  border: 1px solid #dddddddd;
  box-shadow: 2px 2px 2px 0px #dddddddd;
  .dd-option {
    height: 1.5rem;
    line-height: 1.5rem;
  }
}
::v-deep .popover__content.popover--top__content{
  padding: 8px;
  margin-top: -12px;
  width: 100%;
}
::v-deep .popover__arrow.popover--top__arrow{
  display: none;
}
</style>