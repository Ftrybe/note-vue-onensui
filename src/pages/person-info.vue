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

      <v-ons-list-item modifier="chevron" @click="forward('手机号','13400994216')">
        <div class="center">
          <span class="list-item__title">手机号</span>
        </div>
        <div class="right">13400994216</div>
      </v-ons-list-item>

      <v-ons-list-item modifier="chevron">
        <div class="center">
          <span class="list-item__title">性别</span>
        </div>
        <div class="right" @click="switchGender">男</div>
        <v-ons-action-sheet :visible.sync="isOpenGender" cancelable>
          <v-select-scroll :listData="genderList" v-model="gender"></v-select-scroll>
        </v-ons-action-sheet>
      </v-ons-list-item>

      <v-ons-list-item modifier="chevron" @click="forward('心情','真是个愉快的一天阿')">
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
          <div @click="switchPicker()">{{date |dataformat("yyyy-MM-d")}}</div>
          <v-ons-action-sheet :visible.sync="isOpenPicker" @posthide="test" cancelable>
            <v-date-picker
              v-model="date"
              :popover="{visibility:'click',placement:'bottom'}"
              class="w-100"
              is-inline
            ></v-date-picker>
             <v-ons-action-sheet-button @click="savePicker(date)">保存</v-ons-action-sheet-button>
          </v-ons-action-sheet>
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
import SelectScrollComponent from "../partials/select-scroll.vue";

@Component({
  filters: {
    dataformat: (date: Date, format: string) =>
      new DateFilter().format(date, format)
  },
  components: {
    "v-select-scroll": SelectScrollComponent
  }
})
export default class PersonInfoPage extends Vue {
  @Prop() toolbarInfo?: {};

  navigatorVuex: NavigatorModule = getModule(NavigatorModule);

  date: Date = new Date();

  gender: string = "女";

  genderList = new Array<string>("男", "女");
  isOpenPicker: boolean = false;
  isOpenGender:boolean = false;

  switchPicker() {
    //getModule(ActionSheetModule).dp_switch();
     this.isOpenPicker = !this.isOpenPicker;
  }
  switchGender() {
    this.isOpenGender = !this.isOpenGender;
  }
  forward(title: string, value: string) {
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
    this.switchPicker();
  }
  
  test(event:Object){
    console.log(event);
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
