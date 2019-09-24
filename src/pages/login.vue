<template>
  <v-ons-page>
    <div class="flex-column login">
      <div class="flex-column p-3 login-box">
        <div class="login__title">
          <object data="svg/login.svg" type="image/svg+xml" width="200px" height="100px"></object>
        </div>
        <div class="login-type">
          <div class="login-btn-groups">
            <span :class="selectStandard?'active':''" @click="onSelect()">账号登录</span>
            <span class="segment"></span>
            <span :class="selectStandard?'':'active'" @click="onSelect()">手机号登录</span>
          </div>
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
          <div class="login__phone" v-else>
            <div class="login-inp-groups">
              <v-ons-icon icon="ion-person" />
              <v-ons-input placeholder="手机号" float type="text" />
            </div>
            <div class="login-inp-groups">
              <v-ons-icon icon="ion-person" />
              <v-ons-input placeholder="密码" float type="password" />
            </div>
          </div>
        </div>
        <v-ons-button>登录</v-ons-button>
        <div>
          <v-ons-icon icon="fa-qq"></v-ons-icon>
          <v-ons-icon icon="fa-weixin"></v-ons-icon>
        </div>
      </div>
    </div>
  </v-ons-page>
</template>
<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LoginPage extends Vue {
  selectStandard: boolean = true;
  onSelect() {
    this.selectStandard = !this.selectStandard;
  }
}
</script>
<style scoped lang='scss'>
.login {
  width: 100%;
  height: 600px;
  justify-content: center;
  &-btn-groups {
    text-align: center;
    padding: 8px;
    span {
        color: #666;
    }
  }
  &-inp-groups{
      position: relative;
      height: 2rem;
      line-height: 2rem;
      .ons-icon{
          position: absolute;
          height: unset;
          line-height: unset;
          top: 0;
          left: 0;
      }
      ons-input{
        width: 100%;
        position: absolute;
        top: 0;
        left: 16px;
      }
  }
  &-box {
    margin-top: -32px;
  }

  &__title {
    text-align: center;
  }
  .active {
    color: #298a88;
  }
  .segment::after {
    content: "|";
    margin: 0 8px;
    color: #666;
  }
}
</style>