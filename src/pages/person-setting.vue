<template>
  <v-ons-page>
    <v-toolbar v-bind="toolbarInfo"></v-toolbar>
    <v-ons-list>
      <v-ons-list-item>
        <div class="center">
          <span class="title">用户名</span>
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class PersonSetting extends Vue {
  @Prop() toolbarInfo?: {};
}
</script>
<style scoped>
.right {
  margin-right: 1rem;
  color: #9a9a9a;
}
</style>