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
                <div class="login-type">
                    <div class="login__standard" v-if="selectStandard">
                        <div class="inp-groups">
                            <v-ons-icon icon="ion-ios-person" />
                            <v-ons-input
                                placeholder="账号/手机号"
                                float
                                type="text"
                                v-model="lauthInfo.username"
                            />
                        </div>
                        <div class="inp-groups">
                            <v-ons-icon icon="ion-ios-person" />
                            <v-ons-input
                                placeholder="密码"
                                float
                                type="password"
                                v-model="lauthInfo.password"
                            />
                        </div>
                        <div class="inp-groups" v-if="!isSelectLogin && !isPhone">
                            <v-ons-icon icon="ion-ios-information-circle-outline" />
                            <v-ons-input float type="text" v-model="lauthInfo.captcha" />
                            <svg class="captcha" v-html="captcha" @click="getCaptcha" />
                        </div>
                        <div class="inp-groups" v-if="!isSelectLogin && isPhone">
                            <v-ons-icon icon="ion-ios-information-circle-outline" />
                            <v-ons-input float type="text" v-model="lauthInfo.captcha" />
                        </div>
                        <v-ons-button
                            class="text-center w-100"
                            @click="isSelectLogin ?login() :register()"
                        >{{currentTitle}}</v-ons-button>
                    </div>
                </div>
                <div>
                    <div class="login-none-btn">
                        {{isSelectLogin?'没有账号?点击':'已有账号?点击'}}
                        <span
                            @click="toggleView"
                        >{{isSelectLogin?"注册":"登录"}}</span>
                    </div>
                </div>
                <!-- <div class="ml-auto">
                    <v-ons-icon class="m-2" icon="fa-qq" style="color:#0076ff"></v-ons-icon>
                    <v-ons-icon icon="fa-weixin" style="color:#00bb00"></v-ons-icon>
                </div> -->
            </div>
        </div>
    </v-ons-page>
</template>
<script lang='ts'>
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import NavigatorModule from "@/store/modules/navigator";
import PublicPage from "./public.vue";
import AuthModule from "../store/modules/auth";
import { AuthService } from "../core/services/auth.service";
import { LAuthDTO } from "../core/models/sys/lauth.dto";
import { UserService } from "../core/services/user.service";
import AppSplitter from "../app-splitter.vue";

@Component
export default class LoginPage extends Vue {
    @Prop() toolbarInfo!: any;

    selectStandard: boolean = true;
    isSelectLogin: boolean = true;
    isPhone: boolean = false;
    captcha = "";
    lauthInfo: LAuthDTO = {};
    captchaTime: number = 0;
    authService: AuthService = new AuthService();
    navigatorModule: NavigatorModule = getModule(NavigatorModule);
    authModule: AuthModule = getModule(AuthModule);

    mounted() {}

    onSelect() {
        this.selectStandard = !this.selectStandard;
    }
    toggleView() {
        this.isSelectLogin = !this.isSelectLogin;
        if (!this.isSelectLogin) {
            this.getCaptcha();
        }
        this.toolbarInfo.title = this.currentTitle;
    }

    login() {
        this.authService.login(this.lauthInfo).then(rsp => {
            if (rsp.data.code === "0") {
                this.navigatorModule.pop();
                this.authModule.login(rsp.data.data);
            }

            this.$ons.notification.toast(rsp.data.message, {
                buttonLabels: "确定",
                timeout: 1500
            });
        });
    }

    register() {
        this.authService
            .register(this.lauthInfo, this.captchaTime)
            .then(rsp => {
                if (rsp.data.code === "0") {
                    this.navigatorModule.pop();
                    this.authModule.login(rsp.data.data);
                }
                this.$ons.notification.toast(rsp.data.message, {
                    buttonLabels: "确定",
                    timeout: 1500
                });
            });
    }

    getCaptcha() {
        this.captchaTime = Date.now();
        this.authService.captcha(this.captchaTime).then(rsp => {
            if (rsp.data.code === "0") {
                this.captcha = rsp.data.data;
            }
        });
    }

    // @Watch("lauthInfo.username")
    // isPhoneNum(value:string){
    //     if(value.length>10){

    //     }
    // }

    get currentTitle() {
        return this.isSelectLogin ? "登录" : "注册";
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
        padding: 32px 16px;
    }
    .inp-groups {
        position: relative;
        height: 48px;
        line-height: 48px;
        .ons-icon {
            position: absolute;
            height: unset;
            line-height: unset;
            top: 0;
            left: 0;
        }
        .captcha {
            position: absolute;
            top: 8px;
            right: 0;
            height: 32px;
            width: 80px;
        }
        ons-input {
            width: 100%;
            position: absolute;
            padding-left: 16px;
            top: 9px;
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