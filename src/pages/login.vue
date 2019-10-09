<template>
  <v-ons-page>
    <v-toolbar v-bind="toolbarInfo"></v-toolbar>
    <div class="flex-column login">
      <div class="flex-column p-3 login-box">
        <div class="login__title">
          <img data="svg/logo.svg" src="svg/logo.svg" alt width="200px" height="100px" />
        </div>
        <div class="login-type">
          <div class="login__standard" v-if="selectStandard">
            <div class="login-inp-groups">
              <v-ons-icon icon="ion-person" />
              <v-ons-input placeholder="账号" float type="text" />
            </div>
            <div class="login-inp-groups">
              <v-ons-icon icon="ion-person" />
              <v-ons-input placeholder="密码" float type="password" />
            </div>
          </div>
        </div>
        <v-ons-button class="text-center" @click="login()">登录</v-ons-button>
        <div class="my-2">
          <span class="login-none-btn">以游客方式访问</span>
        </div>
        <div class="ml-auto">
          <v-ons-icon class="m-2" icon="fa-qq" style="color:#0076ff"></v-ons-icon>
          <v-ons-icon icon="fa-weixin" style="color:#00bb00"></v-ons-icon>
        </div>
      </div>
    </div>
  </v-ons-page>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import NavigatorModule from "@/store/modules/navigator";
import PublicPage from "./public.vue";
import UserModule from "../store/modules/user";

@Component
export default class LoginPage extends Vue {
  @Prop() toolbarInfo!: {};
  selectStandard: boolean = true;
  navigatorModule: NavigatorModule = getModule(NavigatorModule);
  userModule: UserModule = getModule(UserModule);
  
  onSelect() {
    this.selectStandard = !this.selectStandard;
  }

  async login() {

    await getModule(UserModule).change();

    this.navigatorModule.push({
      extends: PublicPage,
      onsNavigatorOptions: {
        animation: "slide"
      },
      onsNavigatorProps: {
        toolbarInfo: {
          backButton: true,
          title: ""
        }
      }
    });
  }
}
</script>
<style scoped lang='scss'>
.login {
  width: 100%;
  height: auto;
  &-box {
    width: 80%;
    margin: 0 auto;
  }
  &-inp-groups {
    position: relative;
    height: 2.5rem;
    line-height: 2rem;
    .ons-icon {
      position: absolute;
      height: unset;
      line-height: unset;
      top: 0;
      left: 0;
    }
    ons-input {
      width: 100%;
      position: absolute;
      top: 0;
      left: 16px;
    }
  }
  &-box {
    padding: 32px 16px;
  }

  &__title {
    text-align: center;
    margin-bottom: 16px;
  }
  &-none-btn {
    font-size: 12px;
    margin: 8px 0;
    padding: 8px 0;
    color: #666;
  }
}
</style>