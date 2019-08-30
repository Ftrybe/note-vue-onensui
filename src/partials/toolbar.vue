<template>
  <v-ons-toolbar>
    <div class="left">
      <slot name="left">
        <v-ons-back-button v-if="backLabel" class="fs-15">{{ backLabel }}</v-ons-back-button>
        <v-ons-back-button v-if="!backLabel&&backButton" class="fs-15"></v-ons-back-button>
      </slot>
    </div>
    <div class="center">
      <slot>{{ title }}</slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </v-ons-toolbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ToolbarComponent extends Vue {
  @Prop() private title!: string;
  @Prop() private backLabel?: string;
  @Prop() private backButton?:boolean;
}
</script>
<style scoped lang="scss">
.right {
  padding-right: 16px;
  font-size: 20px;
}
.left {
  font-size: 14px;
  .back-button__label {
    font-size: 14px;
  }
}
</style>
