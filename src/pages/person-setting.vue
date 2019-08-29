<template>
  <v-ons-page>
    <v-toolbar v-bind="toolbarInfo"></v-toolbar>
    <v-ons-list>
      <v-ons-list-item modifier="chevron nodivider">
        <div class="center">
          <span class="title">主题设置</span>
        </div>
      </v-ons-list-item>
      <v-ons-list-item modifier="chevron nodivider">
        <div class="center">
          <span class="title">通用设置</span>
        </div>
      </v-ons-list-item>
    </v-ons-list>
    <v-ons-list class="mt-3">
      <v-ons-list-item modifier="chevron nodivider">
        <div class="center">
          <span class="title">求助反馈</span>
        </div>
      </v-ons-list-item>
      <v-ons-list-item modifier="chevron nodivider">
        <div class="center">
          <span class="title">关于</span>
        </div>
      </v-ons-list-item>
    </v-ons-list>
    <v-ons-list class="mt-3">
      <v-ons-list-item modifier="chevron nodivider">
        <div class="center">
          <span class="title">安全设置</span>
        </div>
      </v-ons-list-item>
      <v-ons-list-item modifier="chevron nodivider">
        <div class="center">
          <span class="title">退出登录</span>
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