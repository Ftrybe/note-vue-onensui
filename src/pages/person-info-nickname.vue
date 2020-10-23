<template>
    <v-ons-page>
        <v-toolbar v-bind="toolbarInfo">
            <div slot="right">
                <v-ons-toolbar-button icon="ion-ios-save" :style="isChange? '':'color:#c8e0fb'" @click="save()" />
            </div>
        </v-toolbar>
        <div class="inp">
            <v-ons-input float v-model="value" @keyup="change" :maxlength="maxlength" />
        </div>
        <v-ons-list-header style="color:rab(160,160,160);background:none">请在此处输入你的{{toolbarInfo.title}}</v-ons-list-header>
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
@Component
export default class PersonInfoNicknameComponent extends Vue {
    @Prop() toolbarInfo!: any;

    @Prop() data!: string;

    isChange: boolean = false;

    value: string = "";

    response: any;

    maxlength: number = 11;

    mounted() {
        this.value = this.data;
    }

    async save() {
        const user = new UserDTO();
        const userService = new UserService();
        user.nickname = this.value;
        userService.update(user).then((rsp) => {
            this.optsSuccess(rsp.data.message);
        });
    }

    change(event: InputEvent) {
        if (this.value == this.data) {
            this.isChange = false;
        } else {
            this.isChange = true;
        }
    }

    async optsSuccess(message: string) {
        await UserModule.getCurrentInfo();
        this.$ons.notification.toast(message, {
            timeout: 1000,
        });
        NavigatorModule.pop();
    }
}
</script>
<style scoped lang='scss'>
.inp {
    margin: 15px 15px 0;
    border-bottom: 1px solid #03030373;
}
</style>