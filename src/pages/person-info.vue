<template>
  <v-ons-page>
    <v-toolbar v-bind="toolbarInfo"></v-toolbar>
    <v-ons-list style="overflow: initial;">
      <v-ons-list-item class="person-pic" modifier="chevron">
        <div class="center">
          <span class="list-item__title">头像</span>
        </div>
        <div class="right">
          <img class="list-item__thumbnail" src="http://placekitten.com/g/40/40" />
        </div>
      </v-ons-list-item>

      <v-ons-list-item>
        <div class="center">
          <span class="list-item__title">用户名</span>
        </div>
        <div class="right username">sssssnnx</div>
      </v-ons-list-item>

      <v-ons-list-item modifier="chevron" @click="forward('昵称','不知道啥')">
        <div class="center">
          <span class="list-item__title">昵称</span>
        </div>
        <div class="right">不知道啥</div>
      </v-ons-list-item>

      <v-ons-list-item modifier="chevron">
        <div class="center">
          <span class="list-item__title">手机号</span>
        </div>
        <div class="right">13400994216</div>
      </v-ons-list-item>

      <v-ons-list-item modifier="chevron">
        <div class="center">
          <span class="list-item__title">性别</span>
        </div>
        <div class="right">男</div>
      </v-ons-list-item>

      <v-ons-list-item modifier="chevron">
        <div class="center">
          <span class="list-item__title">心情</span>
        </div>
        <div class="right">真是个愉快的一天阿</div>
      </v-ons-list-item>

      <v-ons-list-item modifier="chevron">
        <div class="left flex-row-reverse">
          <span class="list-item__title">生日</span>
        </div>
        <div class="right">
          <div @click="openPicker()">{{date |dataformat("yyyy-MM-d")}}</div>
          <date-picker  @save="savePicker"></date-picker>
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Component as VueComponent } from "vue";
import NavigatorModule from "../store/modules/navigator";
import { getModule } from "vuex-module-decorators";
import TextSingleEditComponent from "../partials/text-single-edit.vue";
import { DateFilter } from "@/core/filters/date.filter";
import DatePickerComponent from "../partials/date-picker.vue";
import ActionSheetModule from '@/store/modules/action-sheet';
@Component({
  filters: {
    dataformat: (date: Date, format: string) =>
      new DateFilter().format(date, format)
  },
  components: {
    DatePicker: DatePickerComponent
  }
})
export default class PersonInfoPage extends Vue {
  @Prop() toolbarInfo?: {};

  navigatorVuex: NavigatorModule = getModule(NavigatorModule);

  date: Date = new Date();

  isOpenPicker: boolean = false;
  async openPicker() {
    getModule(ActionSheetModule).switch();
    // this.isOpenPicker = !this.isOpenPicker;
  }

  forward(title: string,value:string) {
    this.navigatorVuex.push({
      extends: TextSingleEditComponent,
      onsNavigatorOptions: {
        animation: "slide"
      },
      onsNavigatorProps: {
        toolbarInfo: {
          backLabel: "个人信息",
          title: title
        },
        name: value
      }
    });
  }

   savePicker(date: Date) {
     getModule(ActionSheetModule).switch();
    this.date = date;
  }
}
</script>

<style scoped lang="scss">
.person-pic {
  .list-item__title {
    line-height: 4rem;
  }

  .list-item__thumbnail {
    height: 4rem;
    width: 4rem;
    border-radius: 0.25rem;
  }
}
.right {
  color: #9a9a9a;
}
.username::before {
  right: 16px;
  content: "";
}
</style>
