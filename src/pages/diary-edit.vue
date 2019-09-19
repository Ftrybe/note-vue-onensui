<template>
  <v-ons-page modifier="white">
    <v-toolbar v-bind="toolbarInfo">
      <div slot="right">
        <v-ons-icon icon="md-save" style="color:#c8e0fb" @click="save()"></v-ons-icon>
      </div>
    </v-toolbar>

    <v-ons-list>
      <!--            <div class="list-item__title">标题</div>-->
      <v-ons-list-header>标题</v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input placeholder="请输入标题" float v-model="name"></v-ons-input>
        </div>
      </v-ons-list-item>
      <v-ons-list-header>日期</v-ons-list-header>
      <v-ons-list-item>
        <div>
          <v-date-picker class="list-item__input" v-model="date"></v-date-picker>
        </div>
      </v-ons-list-item>
      <!--            <div class="list-item__title">日期</div>-->

      <!--            <div class="list-item__title">标题</div>-->
      <v-ons-list-header>内容</v-ons-list-header>
      <v-ons-list-item>
        <textarea class="textarea textarea--transparent w-100" rows="6" placeholder="在此输入内容 "></textarea>
      </v-ons-list-item>
      <v-ons-list-header>可见性</v-ons-list-header>
      <v-ons-list-item tappable modifier="longdivider" @click="actionSheetVisible = true">
        <div class="center">所有人可见</div>
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-action-sheet
      :visible.sync="actionSheetVisible"
      cancelable
      title="日记可见性"
      @posthide="test"
    >
      <v-ons-action-sheet-button icon="md-square-o">所有人可见</v-ons-action-sheet-button>
      <v-ons-action-sheet-button icon="md-square-o">仅自己可见</v-ons-action-sheet-button>
      <v-ons-action-sheet-button icon="md-square-o">取消</v-ons-action-sheet-button>
    </v-ons-action-sheet>

  </v-ons-page>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class DiaryEditPage extends Vue {
  private name = "text";
  private date = new Date();
  @Prop() toolbarInfo: any;

  private actionSheetVisible = false;
  private items = [
    { key: 1, text: "所有人可见", value: "all" },
    { key: 2, text: "指定人可见", value: "only" },
    { key: 3, text: "仅自己可见", value: "none" }
  ];
  private selectedItem = "all";

  private save() {
    alert(1);
  }
  private test(event: Object) {
    // tslint:disable-next-line:no-console
    console.log(event);
  }
}
</script>

<style scoped>
.list-item__title {
  padding: 8px 16px;
  font-size: 14px;
  color: #444444;
}
</style>
<style>
.list-item__input input {
  width: 100%;
  height: 25px;
  border: 0;
}
</style>
