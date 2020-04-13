<template>
    <v-ons-page>
        <v-toolbar v-bind="toolbarInfo">
            <div slot="right"></div>
        </v-toolbar>
        <v-ons-list >
            <v-ons-list-item modifier="chevron nodivider">
                <div class="center">
                    <span class="title">修改密码</span>
                </div>
            </v-ons-list-item>
            <v-ons-list-item modifier="chevron nodivider">
                <div class="center">
                    <span class="title">操作查询</span>
                </div>
            </v-ons-list-item>
        </v-ons-list>
    </v-ons-page>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Component as VueComponent } from "vue";
import { AuthModule } from "../store/modules/auth";
import { NavigatorModule } from "../store/modules/navigator";
import HomePage from "./home.vue";
import AppSplitter from "../app-splitter.vue";
import { MemorandumTagModule } from "../store/modules/memorandum-tag";
import { ResultCodeEnum } from "../core/enums/result-code.enum";
import { UserModule } from "../store/modules/user";
import { RouterUtils } from "../utils/router.utils";
@Component
export default class PersonSettingSafePage extends Vue {
  @Prop() toolbarInfo?: {};
    safePage = PersonSettingSafePage;
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
        MemorandumTagModule.getTagList().then(code => {
            if (code == ResultCodeEnum.SUCCESS) {
                this.$ons.notification.toast("刷新成功", {
                    buttonLabels: ["确定"],
                    timeout: 1500
                });
            }
        });
    }

    async feedback() {
        await this.$ons.notification.alert(
            "什么！这玩意除了我自己真的还有人用？？？：wx:FunTrybe",
            {
                title: "求助反馈",
                buttonLabels: "确定"
            }
        );
    }

    forward(title:string,page:VueComponent){
        RouterUtils.forward({title:title,page:page,backButton:true});
    }
}
</script>
<style scoped>
.right {
    margin-right: 1rem;
    color: #9a9a9a;
}
</style>