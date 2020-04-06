<template>
    <v-ons-page>
        <v-toolbar v-bind="toolbarInfo">
            <div slot="right"></div>
        </v-toolbar>
        <!-- <v-ons-list v-if="loginState">
            <v-ons-list-item modifier="chevron nodivider">
                <div class="center">
                    <span class="title">主题设置</span>
                </div>
            </v-ons-list-item>
            <v-ons-list-item modifier="chevron nodivider">
                <div class="center">
                    <span class="title">通用设置</span>
                </div>
            </v-ons-list-item>
        </v-ons-list> -->
        <v-ons-list class="mt-3">
            <v-ons-list-item modifier="chevron nodivider">
                <div class="center">
                    <span class="title">求助反馈</span>
                </div>
            </v-ons-list-item>
            <v-ons-list-item modifier="chevron nodivider">
                <div class="center">
                    <span class="title">关于</span>
                </div>
            </v-ons-list-item>
        </v-ons-list>
        <v-ons-list class="mt-3" v-if="loginState">
            <v-ons-list-item modifier="nodivider" @click="refreshCache">
                <div class="center">
                    <span class="title">刷新缓存</span>
                </div>
            </v-ons-list-item>
        </v-ons-list>
        <v-ons-list class="mt-3" v-if="loginState">
            <!-- <v-ons-list-item modifier="chevron nodivider">
                <div class="center">
                    <span class="title">安全设置</span>
                </div>
            </v-ons-list-item> -->
            <v-ons-list-item modifier="nodivider" @click="logout">
                <div class="center">
                    <span class="title">退出登录</span>
                </div>
            </v-ons-list-item>
        </v-ons-list>
    </v-ons-page>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import {AuthModule} from "../store/modules/auth";
import {NavigatorModule} from "../store/modules/navigator";
import HomePage from "./home.vue";
import AppSplitter from "../app-splitter.vue";
import {MemorandumTagModule} from "../store/modules/memorandum-tag";
import { ResultCodeEnum } from '../core/enums/result-code.enum';
import {UserModule} from '../store/modules/user';

@Component
export default class PersonSetting extends Vue {
    @Prop() toolbarInfo?: {};
    get loginState() {
        return AuthModule.token;
    }

    async logout() {
        this.$ons.notification
            .confirm("确认退出？", {
                buttonLabels: ["确定", "取消"],
                title: ""
            })
            .then(code => {
                // console.log(code.nodeValue);
                if (code == 0) {
                    AuthModule.logout();
                    this.$ons.notification.toast("退出成功", {
                        buttonLabels: "关闭",
                        timeout: 1500
                    });
                    NavigatorModule.reset({
                        extends: AppSplitter
                    });
                }
            });
    }
    async refreshCache() {
        await UserModule.getCurrentInfo();
        MemorandumTagModule
            .getTagList()
            .then(code => {
                if (code == ResultCodeEnum.SUCCESS) {
                    this.$ons.notification.toast("刷新成功",{buttonLabels:['确定'],timeout:1500});
                }
            });
    }
}
</script>
<style scoped>
.right {
    margin-right: 1rem;
    color: #9a9a9a;
}
</style>