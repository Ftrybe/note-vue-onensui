<template>
  <v-ons-page modifier="white">
    <v-toolbar v-bind="toolbarInfo">
      <div slot="right">
        <v-ons-icon icon="md-check" color="#0076ff" @click="save()"></v-ons-icon>
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
      <v-ons-list-item>
        <div class="center">
          <v-ons-select style="width: 100%" class="list-item__input" v-model="selectedItem">
            <option v-for="item in items" :value="item.value" :key="item.key">{{ item.text }}</option>
          </v-ons-select>
        </div>
      </v-ons-list-item>

      <v-ons-list-item
        tappable
        modifier="longdivider"
        @click="$ons.openActionSheet({ buttons: ['所有人可见', '仅自己可见', '指定用户可见', '取消'], destructive: 2, cancelable: true })"
      >
        <div class="center">所有人可见</div>
      </v-ons-list-item>
      <v-ons-list-header>心情</v-ons-list-header>
      <v-ons-list-item>
        <v-ons-button @click="actionSheetVisible = true">Static action sheet</v-ons-button>
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-action-sheet
      :visible.sync="actionSheetVisible"
      cancelable
      title="Description"
      posthide="test(event)"
    >
      <v-ons-action-sheet-button icon="md-square-o">Label 1</v-ons-action-sheet-button>
      <v-ons-action-sheet-button icon="md-square-o" modifier="destructive">Label 2</v-ons-action-sheet-button>
      <v-ons-action-sheet-button icon="md-square-o">Label 3</v-ons-action-sheet-button>
      <v-ons-action-sheet-button icon="md-square-o">Label 1</v-ons-action-sheet-button>
      <v-ons-action-sheet-button icon="md-square-o" modifier="destructive">Label 2</v-ons-action-sheet-button>
      <v-ons-action-sheet-button icon="md-square-o">Label 3</v-ons-action-sheet-button>
      <v-ons-action-sheet-button icon="md-square-o">Label 1</v-ons-action-sheet-button>
      <v-ons-action-sheet-button icon="md-square-o" modifier="destructive">Label 2</v-ons-action-sheet-button>
      <v-ons-action-sheet-button icon="md-square-o">Label 3</v-ons-action-sheet-button>
    </v-ons-action-sheet>
  </v-ons-page>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class DiaryModify extends Vue {
  private name = 'text';
  private date = new Date();
  private toolbarInfo = {};
  private actionSheetVisible = false;
  private items = [
    { key: 1, text: '所有人可见', value: 'all' },
    { key: 2, text: '指定人可见', value: 'only' },
    { key: 3, text: '仅自己可见', value: 'none' },
  ];
  private selectedItem = 'all';

  private save() {
    alert(1);
  }
  private test(event: any) {
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
