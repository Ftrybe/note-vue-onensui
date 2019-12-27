<template>
  <v-ons-page>
    <v-toolbar v-bind="toolbarInfo">
      <span slot="right"></span>
    </v-toolbar>
    <div class="flex-column login">
      <div class="flex-column p-3 login-box">
        <div class="login__title">
          <img data="svg/logo.svg" src="svg/logo.svg" alt width="200px" height="100px" />
        </div>
        <div class="login-type" v-if="isSelectLogin">
          <div class="login__standard" v-if="selectStandard">
            <div class="inp-groups">
              <v-ons-icon icon="ion-ios-person" />
              <v-ons-input placeholder="账号" float type="text" v-model="userInfo.username" />
            </div>
            <div class="inp-groups">
              <v-ons-icon icon="ion-ios-person" />
              <v-ons-input placeholder="密码" float type="password" v-model="userInfo.password" />
            </div>
            <v-ons-button class="text-center w-100" @click="login()">登录</v-ons-button>
          </div>
        </div>
        <div class="register" v-else>
          <div class="inp-groups">
            <v-ons-icon icon="ion-ios-person" />
            <v-ons-input placeholder="账号" float type="text" v-model="userInfo.username" />
          </div>
          <div class="inp-groups">
            <v-ons-icon icon="ion-ios-person" />
            <v-ons-input placeholder="密码" float type="password" v-model="userInfo.password" />
          </div>
          <div class="inp-groups">
            <v-ons-input float type="text" />
          </div>
          <v-ons-button class="text-center w-100" @click="register()">注册</v-ons-button>
        </div>
        <div>
          <div class="login-none-btn">
            {{isSelectLogin?'没有账号?点击':'已有账号?点击'}}
            <span
              @click="isSelectLogin=!isSelectLogin"
            >{{isSelectLogin?'注册':'登录'}}</span>
          </div>
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
import { UserService } from "../core/services/user.service";
import { SysLocalAuth } from "../core/models/sys/sys-local-auth.entity";

@Component
export default class LoginPage extends Vue {
  @Prop() toolbarInfo!: {};

  selectStandard: boolean = true;
  isSelectLogin: boolean = true;
  userService: UserService;
  userInfo: SysLocalAuth = {};
  navigatorModule: NavigatorModule = getModule(NavigatorModule);
  userModule: UserModule = getModule(UserModule);

  constructor() {
    super();
    this.userService = new UserService();
  }

  onSelect() {
    this.selectStandard = !this.selectStandard;
  }

  login() {
    this.userService.login(this.userInfo).then(rsp => {
      if (rsp.data.code === "0") {
        this.navigatorModule.pop();
      }
      if (rsp.data.code === "1") {
        this.$ons.notification.toast(rsp.data.message, {
          buttonLabel: "确定",
          timeout: 1500
        });
      }
    });
  }
  register() {}
}
</script>
<style scoped lang='scss'>
.login {
  width: 100%;
  height: auto;
  &-box {
    width: 80%;
    margin: 0 auto;
    padding: 32px 16px;
  }
  .inp-groups {
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
      padding-left: 16px;
      top: 0;
    }
  }

  &__title {
    text-align: center;
    margin-bottom: 16px;
  }
  &-none-btn {
    font-size: 12px;
    margin: 8px 0;
    color: #666;
  }
}
</style>