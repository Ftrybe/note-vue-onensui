<template>
    <v-ons-page modifier="white">
        <div class="background" />
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
                                maxlength="11"
                                @blur="checkPhone"
                            />
                        </div>
                        <div class="inp-groups">
                            <v-ons-icon icon="ion-ios-person" />
                            <v-ons-input
                                placeholder="密码"
                                float
                                type="password"
                                maxlength="18"
                                v-model="lauthInfo.password"
                            />
                        </div>
                        <div class="inp-groups" v-if="!isSelectLogin">
                            <v-ons-icon icon="ion-ios-information-circle-outline" />
                            <v-ons-input
                                float
                                type="text"
                                placeholder="验证码"
                                v-model="lauthInfo.captcha"
                                maxlength="4"
                            />
                            <div
                                v-if="!isPhone"
                                class="captcha"
                                v-html="captcha"
                                @click="getCaptcha"
                            />
                            <button v-if="isPhone" class="captcha" @click="getSmsCode">{{smsButton}}</button>
                        </div>
                         <v-ons-button
                            class="text-center w-100"
                            @click="login()"
                            v-show="isSelectLogin"
                        > 登陆</v-ons-button>
                        <v-ons-button
                            class="text-center w-100"
                            @click="register()"
                            v-show="!isSelectLogin"
                        > 注册 </v-ons-button>
                    </div>
                </div>
                <div class="d-flex">
                    <div class="login-none-btn">
                        <span @click="toggleView" v-show="!isSelectLogin">已有账号?进行登陆</span>
                        <span @click="toggleView" v-show="isSelectLogin">没有账号?点击注册</span>
                    </div>

                    <div class="login-none-btn ml-auto" @click="forget" v-if="isSelectLogin">忘记密码?</div>
                </div>
            </div>
        </div>
    </v-ons-page>
</template>
<script lang='ts'>
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { NavigatorModule } from "@/store/modules/navigator";
import PublicPage from "./public.vue";
import { AuthModule } from "../store/modules/auth";
import { AuthService } from "../core/services/auth.service";
import { LAuthDTO } from "../core/models/sys/lauth.dto";
import { UserService } from "../core/services/user.service";
import AppSplitter from "../app-splitter.vue";
import { ValidatorUtils } from "@/utils/validator.utils";

@Component
export default class LoginPage extends Vue {
    @Prop() toolbarInfo!: any;

    selectStandard: boolean = true;
    isSelectLogin: boolean = true;
    isPhone: boolean = false;
    captcha = "";
    smsCode = "";
    smsButton = "获取验证码";
    lauthInfo: LAuthDTO = {};
    captchaTime: number = 0;
    authService: AuthService = new AuthService();
    mounted() {}

    onSelect() {
        this.selectStandard = !this.selectStandard;
    }

    toggleView() {
        this.isSelectLogin = !this.isSelectLogin;
        if (!this.isSelectLogin) {
           this.getCaptcha()
        }
        this.lauthInfo.username = "";
        this.lauthInfo.password = "";
        this.lauthInfo.captcha = "";
    }

    login() {
        this.authService.login(this.lauthInfo).then(rsp => {
            if (rsp.data.code === "0") {
                AuthModule.login(rsp.data.data);
                NavigatorModule.pop();
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
                console.log(rsp);
                if (rsp.data.code === "0") {
                    NavigatorModule.pop();
                    AuthModule.login(rsp.data.data);
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
    getSmsCode() {
        this.authService.smsCode(this.lauthInfo.username!).then(rsp => {
            if (rsp.data.code === "0") {
                this.$ons.notification.toast(rsp.data.message, {
                    buttonLabels: "确定",
                    timeout: 1500
                });
                let count = 60;
                const timer = setInterval(() => {
                    count--;
                    this.smsButton = count + "s";
                    if (count < 1) {
                        clearInterval(timer);
                        this.smsButton = "获取验证码";
                    }
                }, 1000);
                this.$once("hook:beforeDestroy", () => {
                    clearInterval(timer);
                });
            }
        });
    }

    checkPhone(e: any) {
        if (ValidatorUtils.isMobile(this.lauthInfo.username + "")) {
            this.isPhone = true;
        } else {
            this.isPhone = false;
        }
    }

    forget() {
        this.$ons.notification.alert(
            "绑定手机的用户若忘记密码，请选择重新注册账号修改密码。未绑定手机号的用户请联系管理员",
            {
                title: "提示",
                buttonLabels: "确定"
            }
        );
    }
}
</script>
<style scoped lang='scss'>
.background {
    background-color: #fff;
}
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
            font-size: 12px;
            background-color: #efeff4;
            border: 1px solid #efefef;
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