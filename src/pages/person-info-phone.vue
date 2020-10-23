<template>
    <v-ons-page>
        <v-toolbar v-bind="toolbarInfo">
            <div class="center">手机号</div>
            <div slot="right">
                <v-ons-toolbar-button v-if="data && data==phone" @click="next()">验证</v-ons-toolbar-button>
                <v-ons-toolbar-button v-if="!data || (data!=phone)" @click="next()">保存</v-ons-toolbar-button>
            </div>
        </v-toolbar>
        <div class="inp">
            <v-ons-input float :disabled="disabled" v-model="phone" style="opacity:.9;width:100%" ref="phoneInput" />
        </div>
        <v-ons-list-header style="color:rab(160,160,160);background:none">{{data?'您当前的手机号':'您当前未绑定手机'}}</v-ons-list-header>
        <v-ons-alert-dialog modifier="rowfooter" :visible.sync="isOpenVerifyDialog">
            <span slot="title">
                请输入验证码
                <v-ons-icon icon="ion-ios-refresh" style="vertical-align:0;margin-left:4px" @click="refreshSmsCode" />
            </span>
            <chequer-input @change="changeCode" ref="chequerInput" />
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
        ChequerInput,
    },
})
export default class PersonInfoPhoneComponent extends Vue {
    @Prop() toolbarInfo!: any;

    @Prop() data?: string;

    isChange: boolean = false;

    authService = new AuthService();

    smsCode: string = "";

    isOpenVerifyDialog = false;

    disabled = true;

    phone: string = "";

    mounted() {
        this.phone = this.data!;
        if (!this.data) {
            this.disabled = false;
        }
    }

    next() {
        this.isOpenVerifyDialog = true;
        this.getSmsCode(this.phone);
    }

    getSmsCode(str: string) {
        this.authService.smsCode(str).then((rsp) => {
            this.$ons.notification.toast(rsp.data.message, {
                buttonLabels: "确定",
                timeout: 1500,
            });
        });
    }

    changeCode(str: string) {
        this.smsCode = str;
    }
    refreshSmsCode() {
        this.getSmsCode(this.phone);
    }

    async optsSuccess(message: string) {
        await UserModule.getCurrentInfo();
        this.$ons.notification.toast(message, {
            timeout: 1000,
        });
        await this.$nextTick();

        NavigatorModule.pop();
    }

    verifyCode() {
        // 验证短信验证码
        this.authService.verifyPhone(this.smsCode, this.phone).then((rsp) => {
            this.$ons.notification.toast(rsp.data.message, {
                buttonLabels: "确定",
                timeout: 1500,
            });
            // 未绑定手机用户绑定手机
            if (!this.data) {
                this.authService.bindPhone(this.phone).then((rsp) => {
                    this.optsSuccess(rsp.data.message);
                    return;
                });
            }

            // 绑定手机用户修改手机
            if (this.data && this.data != this.phone) {
                this.authService
                    .updatePhone({ oldPhone: this.data, newPhone: this.phone })
                    .then((rsp) => {
                        this.optsSuccess(rsp.data.message);
                    });
            } else if (this.data) {
                this.disabled = false;
                this.phone = "";
                this.$nextTick(() => {
                    ((this.$refs.phoneInput as Vue).$el
                        .children[0] as any).focus();
                });
            }
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