<template>
    <v-ons-page>
        <v-toolbar v-bind="toolbarInfo">
            <div slot="right"></div>
        </v-toolbar>
        <v-ons-list style="overflow: initial;">
            <v-ons-list-item class="person-pic" modifier="chevron" @click="updatePhoto">
                <div class="center">
                    <span class="list-item__title">头像</span>
                </div>
                <div class="right">
                    <img class="list-item__thumbnail" :src="userInfo.photo" />
                </div>
                <input
                    hidden
                    type="file"
                    accept="image/png, image/jpeg, image/gif, image/jpg"
                    @change="uploadImg($event)"
                    ref="fileInput"
                />
            </v-ons-list-item>

            <v-ons-list-item>
                <div class="center" @click="user.username?null:forward('用户名',userInfo.phone,PersonInfoUsername)">
                    <span class="list-item__title">用户名</span>
                </div>
                <div class="right username">{{userInfo.username}}</div>
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
                        <v-ons-action-sheet-button @click="updateInfo({birthday:user.birthday})">保存</v-ons-action-sheet-button>
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
import PersonInfoPhoto from "./person-info-photo.vue";
import PersonInfoPhone from "./person-info-phone.vue";
import PersonInfoUsername from "./person-info-username.vue";
import { UserService } from "../core/services/user.service";
import { GenderEnum } from "../core/enums/gender.enum";
import fileService from "@/core/services/file.service";

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
    // cropper
    PersonInfoPhone = PersonInfoPhone;
    PersonInfoNickname = PersonInfoNickname;
    PersonInfoPhoto = PersonInfoPhoto;
    PersonInfoUsername = PersonInfoUsername;

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
            this.updateInfo({gender:this.user.gender});
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
                data: value ? value : ""
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

    updateInfo(entity:UserDTO) {
        this.userService.update(entity).then(async rsp => {
            await UserModule.getCurrentInfo();
        });
        this.isOpenPicker = false;
    }

    async updatePhoto() {
        const rsp = await this.$ons.notification.confirm("更换头像?", {
            buttonLabels: ["取消", "确定"],
            title: ""
        });

        if (rsp) {
            (this.$refs.fileInput as HTMLInputElement).click();

        }
    }
    uploadImg(e:any) {
        //上传图片
        // this.option.img
        var file = e.target.files[0];
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
            alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
            return false;
        }
        var reader = new FileReader();

        reader.onload = e => {
            let data;
            if (typeof e.target!.result === "object") {
                // 把Array Buffer转化为blob 如果是base64不需要
                data = window.URL.createObjectURL(new Blob([e.target!.result!]));
            } else {
                data = e.target!.result;
            }
             this.forward("裁剪头像", data, PersonInfoPhoto);
        };
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
        reader.readAsArrayBuffer(file);
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
