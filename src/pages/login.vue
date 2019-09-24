<template>
  <v-ons-page>
    <div class="login">
      <div class>
        <object data="svg/login.svg" type="image/svg+xml" width="200px" height="100px"></object>
      </div>
      <div>
        <div class="login__standard">
          <div>
            <v-ons-input placeholder="账号" float />
          </div>
          <div>
            <v-ons-input placeholder="密码" float />
          </div>
        </div>
         <div class="login__phone">
          <div>
            <v-ons-input placeholder="手机号" float />
          </div>
          <div>
            <v-ons-input placeholder="密码" float />
          </div>
        </div>
      </div>
    <v-ons-button>登录</v-ons-button>
    </div>
    <div>
        <v-ons-icon icon="fa-qq"></v-ons-icon>
        <v-ons-icon icon="fa-weixin"></v-ons-icon>
    </div>
  </v-ons-page>
</template>
<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LoginPage extends Vue {}
</script>
<style scoped lang='scss'>
</style>