<template>
    <v-ons-page>
        <v-toolbar v-bind="toolbarInfo">
            <div slot="right" class="text-14 text-blue">
                <!-- <v-ons-toolbar-button icon="ion-ios-more" @click="showPopover($event)" />
                <v-ons-popover
                    cancelable
                    :visible.sync="popoverVisible"
                    :target="popoverTarget"
                    :direction="'down'"
                    :mask-color="'rgba(0,0,0,0)'"
                >
                    <p class="text-center">分享</p>
                    <p class="text-center">收藏</p>
                    <p
                        class="text-center"
                        v-if="userinfo.id == localData.userId"
                        @click="forward(localData)"
                    >编辑</p>
                </v-ons-popover> -->
            </div>
        </v-toolbar>

        <div class="background bg-white" />
        <div class="p-3 h-100">
            <div class="title">{{localData.title}}</div>
            <div class="tip">
                <img class="picture" :src="localData.userInfo.photo" alt="用户头像" />
                <div class="desc">
                    <div class="username">{{localData.userInfo.nickname}}</div>
                    <div class="time">{{localData.unKnowDate | dataformat("yyyy-MM-d")}}</div>
                </div>
                <!-- <div class="share">
                    <v-ons-icon icon="ion-ios-redo" style="color:#fff"></v-ons-icon>
                </div> -->
            </div>
            <div class="content" v-html="localData.content"></div>
        </div>
    </v-ons-page>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { DiaryDTO } from "../core/models/sys/diary.dto";
import { getModule } from "vuex-module-decorators";
import UserModule from "../store/modules/user";
import { RouterUtils } from "@/utils/router.utils";
import DiaryEditPage from "./diary-edit.vue";
import { DateFilter } from "@/core/filters/date.filter";

@Component({
    filters: {
        dataformat: (date: Date, format: string) =>
            new DateFilter().format(date, format)
    }
})
export default class DiaryPage extends Vue {
    @Prop() toolbarInfo!: {};
    @Prop() data!: DiaryDTO;

    private popoverVisible: boolean = false;
    private popoverTarget = null;
    localData!: DiaryDTO;
    showPopover(event: any) {
        this.popoverTarget = event;
        this.popoverVisible = true;
    }

    beforeMount() {
        this.localData = this.data;
    }

    get userinfo() {
        return getModule(UserModule).userInfo;
    }

    forward(data: DiaryDTO) {
        RouterUtils.forward({
            page: DiaryEditPage,
            animation: "slide",
            title: data.title,
            backButton: true,
            data: data,
            replace: true
        });
    }
}
</script>

<style lang="scss" scoped>
$picture-length: 48px;
.title {
    font-size: 20px;
    line-height: 2rem;
    font-weight: 600;
}
.content {
    text-align: justify;
    line-height: 2rem;
    font-size: 17px;
    p {
        margin: 0;
    }
}
.tip {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 18px;
    margin-top: 0.5rem;

    .desc {
        flex-grow: 1;
        line-height: $picture-length;
        margin-top: 6px;

        .time,
        .username {
            line-height: $picture-length/2;
            height: $picture-length/2;
            margin-left: 0.5rem;
        }
        .time {
            color: #888;
            font-size: 14px;
        }
    }
    .picture {
        height: $picture-length;
        width: $picture-length;
        border-radius: 100%;
    }
    .share {
        width: 48px;
        height: 28px;
        line-height: 24px;
        background: #0076fe;
        border-radius: 4px;
        margin-right: 8px;
        align-self: center;
        text-align: center;
    }
}
::v-deep .popover--top {
    p {
        margin: 10px;
    }
    .popover__arrow {
        background: none;
    }
    .popover__content {
        width: 150px;
        min-height: 32px;
        margin-top: -20px;
        box-shadow: 0 0 1px #666;
    }
}
</style>
