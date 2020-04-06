<template>
    <v-ons-page>
        <v-toolbar v-bind="toolbarInfo">
            <div slot="right"></div>
        </v-toolbar>
        <v-ons-list style="overflow: initial;">
            <v-ons-list-item class="person-pic" modifier="chevron">
                <div class="center">
                    <span class="list-item__title">头像</span>
                </div>
                <div class="right">
                    <img class="list-item__thumbnail" :src="user.photo" />
                </div>
            </v-ons-list-item>

            <v-ons-list-item>
                <div class="center">
                    <span class="list-item__title">用户名</span>
                </div>
                <div class="right username">{{user.username}}</div>
            </v-ons-list-item>

            <v-ons-list-item
                modifier="chevron"
                @click="forward('昵称',user.nickname,PersonInfoNickname)"
            >
                <div class="center">
                    <span class="list-item__title">昵称</span>
                </div>
                <div class="right">{{userInfo.nickname}}</div>
            </v-ons-list-item>

            <v-ons-list-item modifier="chevron" @click="forward('手机号',user.phone,PersonInfoPhone)">
                <div class="center">
                    <span class="list-item__title">手机号</span>
                </div>
                <div class="right">{{userInfo.phone}}</div>
            </v-ons-list-item>

            <v-ons-list-item modifier="chevron">
                <div class="center">
                    <span class="list-item__title">性别</span>
                </div>
                <div class="right" @click="switchGender">{{ user.gender == 1? "男":"女"}}</div>
            </v-ons-list-item>

            <v-ons-list-item modifier="chevron">
                <div class="left flex-row-reverse">
                    <span class="list-item__title">生日</span>
                </div>
                <div class="right">
                    <div @click="switchPicker()">{{user.birthday |dataformat("yyyy-MM-d")}}</div>
                    <v-ons-action-sheet :visible.sync="isOpenPicker" cancelable>
                        <v-date-picker
                            v-model="user.birthday"
                            :popover="{visibility:'click',placement:'bottom'}"
                            class="w-100"
                            is-inline
                        ></v-date-picker>
                        <v-ons-action-sheet-button @click="updateInfo">保存</v-ons-action-sheet-button>
                    </v-ons-action-sheet>
                </div>
            </v-ons-list-item>
        </v-ons-list>
    </v-ons-page>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Component as VueComponent } from "vue";
import { DateFilter } from "@/core/filters/date.filter";
import DatePickerComponent from "../partials/date-picker.vue";
import SelectScrollComponent from "../partials/select-scroll.vue";
import { RouterUtils } from "@/utils/router.utils";
import { UserModule } from "../store/modules/user";
import { UserDTO } from "../core/models/sys/user.dto";
import PersonInfoEditPage from "./person-info-edit.vue";
import PersonInfoNickname from "./person-info-nickname.vue";
import PersonInfoPhone from "./person-info-phone.vue";
import { UserService } from "../core/services/user.service";
import { GenderEnum } from "../core/enums/gender.enum";
@Component({
    filters: {
        dataformat: (date: Date, format: string) =>
            new DateFilter().format(date, format)
    },
    components: {
        "v-select-scroll": SelectScrollComponent
    }
})
export default class PersonInfoPage extends Vue {
    @Prop() toolbarInfo?: {};

    PersonInfoPhone = PersonInfoPhone;
    PersonInfoNickname = PersonInfoNickname;

    user: UserDTO = new UserDTO(true);

    isOpenPicker: boolean = false;

    userService = new UserService();

    switchPicker() {
        //getModule(ActionSheetModule).dp_switch();
        this.isOpenPicker = !this.isOpenPicker;
    }

    switchGender() {
        const timer = setTimeout(() => {
            this.user.gender =
                this.user.gender == GenderEnum.MEN
                    ? GenderEnum.WOMEN
                    : GenderEnum.MEN;
            this.updateInfo();
        }, 1000);
        this.$once("hook:beforeDestroy", () => {
            clearInterval(timer);
        });
    }

    forward(title: string, value: string, page: any) {
        RouterUtils.forward({
            page: page,
            animation: "slide",
            props: {
                toolbarInfo: {
                    backLabel: "个人信息",
                    title: title
                },
                name: value
            }
        });
    }

    savePicker(date: Date) {
        this.switchPicker();
    }

    beforeMount() {
        this.user = this.userInfo as UserDTO;
        const date = this.user.birthday as Date;
        this.user.birthday = new Date(date);
    }

    updateInfo() {
        this.userService.update(this.user).then(async rsp => {
            await UserModule.getCurrentInfo();
        });
        this.isOpenPicker = false;
    }

    get userInfo(): any {
        return UserModule.userInfo;
    }
}
</script>

<style scoped lang="scss">
.person-pic {
    .list-item__title {
        line-height: 4rem;
    }

    .list-item__thumbnail {
        height: 4rem;
        width: 4rem;
        border-radius: 0.25rem;
    }
}
.right {
    color: #9a9a9a;
}
.username::before {
    right: 16px;
    content: "";
}
</style>
