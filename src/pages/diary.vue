<template>
  <v-ons-page>
        <v-toolbar v-bind="toolbarInfo"></v-toolbar>
        
  </v-ons-page>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class DiaryPage extends Vue {
   @Prop() toolbarInfo!: {};
}
</script>

<style>
</style>
