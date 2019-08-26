<template>
  <v-ons-page>
    <v-ons-list>
      <v-ons-list-item modifier="nodivider" style="background-color:#fafafa">
        <div class="right">
          <v-ons-icon icon="ion-close" class="list-item__icon" @click="splitter.toggle()"></v-ons-icon>
        </div>
      </v-ons-list-item>
      <v-ons-list-item class="info" modifier="chevron nodivider" @click="showInfo()">
        <div class="left">
          <img class="list-item__thumbnail" src="bg/love_gril.jpg" />
        </div>
        <div class="center" style="line-height: 28px;margin-left: 8px">
          <span class="list-item__title">昵称</span>
          <span class="list-item__subtitle">用户名</span>
        </div>
      </v-ons-list-item>

      <v-ons-list-item modifier="chevron nodivider">
        <div class="left">
          <v-ons-icon icon="md-book" class="list-item__icon"></v-ons-icon>
        </div>
        <div class="center">日记</div>
      </v-ons-list-item>

      <v-ons-list-item modifier="chevron nodivider mt-2">
        <div class="left">
          <v-ons-icon icon="md-bookmark" class="list-item__icon"></v-ons-icon>
        </div>
        <div class="center">备忘录</div>
      </v-ons-list-item>

    </v-ons-list>

    <v-ons-list class="mt-3">
      <v-ons-list-item modifier="chevron">
        <div class="left">
          <v-ons-icon icon="ion-settings" class="list-item__icon"></v-ons-icon>
        </div>
        <div class="center">设置</div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PersonInfo from "./person-info.vue";
import NavigatorModule from "../store/modules/navigator";
import { getModule } from "vuex-module-decorators";
import SplitterModule from "@/store/modules/splitter";

@Component
export default class PersonPage extends Vue {
  navigator: NavigatorModule = getModule(NavigatorModule);
  splitter: SplitterModule = getModule(SplitterModule);
  showInfo() {
    this.navigator.option({
      animation: "slide-md",
      callback: () => this.navigator.option({})
    });

    this.navigator.push({
      extends: PersonInfo,
      onsNavigatorProps: {
        toolbarInfo: {
          backLabel: "时间轴",
          title: "个人信息"
        }
      }
    });
  }
}
</script>

<style scoped lang="scss">
.info {
  height: 6rem;
  line-height: 3rem;

  img {
    height: 4rem;
    width: 4rem;
    border-radius: 0.25rem;
  }
}

.list-item__division {
  &:after {
    content: "";
    height: 0;
    width: 100%;
    padding: 8px 0;
    display: block;
    background: red;
  }
}
</style>
