<template>
    <v-ons-page>
        <v-toolbar v-bind="toolbarInfo">
            <div class="center">用户名</div>
            <div slot="right">
                <v-ons-toolbar-button @click="save">保存</v-ons-toolbar-button>
            </div>
        </v-toolbar>
        <div class="inp">
            <v-ons-input float v-model="username" style="opacity:.9;width:100%" />
        </div>
        <v-ons-list-header
            style="color:rab(160,160,160);background:none"
        >您是手机注册用户，可设置一次用户名，注意：设置后不可修改</v-ons-list-header>
        <v-ons-alert-dialog modifier="rowfooter" :visible.sync="isOpenVerifyDialog">
            <span slot="title">
                请输入验证码
                <v-ons-icon
                    icon="ion-ios-refresh"
                    style="vertical-align:0;margin-left:4px"
                    @click="refreshSmsCode"
                />
            </span>
            <chequer-input @change="changeCode" ref="chequerInput" />
            <div>
                
            </div>
            <template slot="footer">
                <v-ons-alert-dialog-button @click="isOpenVerifyDialog = false">取消</v-ons-alert-dialog-button>
                <v-ons-alert-dialog-button @click="verifyCode">确定</v-ons-alert-dialog-button>
            </template>
        </v-ons-alert-dialog>
    </v-ons-page>
</template>
<script lang='ts'>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { UserDTO } from "../core/models/sys/user.dto";
import { UserService } from "../core/services/user.service";
import { AuthService } from "../core/services/auth.service";
import { LAuthDTO } from "../core/models/sys/lauth.dto";
import { NavigatorModule } from "../store/modules/navigator";
import { UserModule } from "../store/modules/user";
import { AuthModule } from "../store/modules/auth";
import ChequerInput from "@/partials/chequer-input.vue";
@Component({
    components: {
        ChequerInput
    }
})
export default class PersonInfoUsernameComponent extends Vue {
    @Prop() toolbarInfo!: any;

    @Prop() data?: string;

    isChange: boolean = false;

    authService = new AuthService();

    smsCode: string = "";

    isOpenVerifyDialog = false;

    username: string = "";

    mounted() {}

    save() {
        if (this.username.toString().length > 1) {
            this.isOpenVerifyDialog = true;
        }
    }

    getSmsCode() {
        this.authService.smsCode(this.data!).then(rsp => {
            this.$ons.notification.toast(rsp.data.message, {
                buttonLabels: "确定",
                timeout: 1500
            });
        });
    }

    changeCode(str: string) {
        this.smsCode = str;
    }
    refreshSmsCode() {
        this.getSmsCode();
    }

    async optsSuccess(message: string) {
        await UserModule.getCurrentInfo();
        this.$ons.notification.toast(message, {
            timeout: 1000
        });
        await this.$nextTick();

        NavigatorModule.pop();
    }

    verifyCode() {
        // 验证短信验证码
        this.authService.verifyPhone(this.smsCode, this.data!).then(rsp => {
            this.$ons.notification.toast(rsp.data.message, {
                buttonLabels: "确定",
                timeout: 1500
            });

            // 绑定手机用户修改手
            this.optsSuccess(rsp.data.message);

            this.isOpenVerifyDialog = false;
            this.smsCode = "";

            (this.$refs.chequerInput as any).clear();
        });
    }
}
</script>
<style scoped lang='scss'>
.inp {
    margin: 15px 15px 0;
    border-bottom: 1px solid #03030373;
}
</style>