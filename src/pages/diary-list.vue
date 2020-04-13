<template>
    <v-ons-page :infinite-scroll="loadMore">
        <v-toolbar v-bind="toolbarInfo"></v-toolbar>
        <v-ons-pull-hook :action="init" @changestate="state = $event.state">
            <span v-show="state === 'initial'">刷新</span>
            <span v-show="state === 'preaction'">加载完成</span>
            <span v-show="state === 'action'">加载中。。</span>
        </v-ons-pull-hook>
        <p class="intro">
            在这里分享你的故事
            <br />
        </p>
        <v-ons-list>
            <v-ons-list-item class="item" v-for="(diary,index) in list" :key="index">
                <v-touch
                    @swipe="swipe($event,index)"
                    :swipe-options="{direction:'left'}"
                    class="w-100"
                >
                    <v-ons-list-title @click="forward(diary,diaryPage)">{{diary.title}}</v-ons-list-title>
                </v-touch>
                <div>
                    <div class="opts" :class="itemIndex == index?'active':''">
                        <span
                            class="opt-btn"
                            @click="forward(diary,diaryEditPage)"
                        >编辑</span>
                        <span class="opt-btn" @click="del(diary)">删除</span>
                    </div>
                </div>
            </v-ons-list-item>
        </v-ons-list>
        <div :class="itemIndex!=-1? 'mask':''" @touch="itemIndex=-1" />
        <div class="text-center mt-4" v-if="currPage < total">
            <v-ons-icon icon="ion-ios-sync" size="26px" spin />
        </div>
    </v-ons-page>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from "vue-property-decorator";
import ToolbarSearchComponent from "../partials/toolbar-search.vue";
import { Component as VueComponent } from "vue";
import DiaryPage from "./diary.vue";
import { RouterUtils } from "../utils/router.utils";
import { DiaryService } from "@/core/services/diary.service";
import { DiaryDTO } from "../core/models/sys/diary.dto";
import { DiaryTagEnum } from "../core/enums/diary-tag.enum";
import Page from "@/core/models/diary/page";
import DiaryEditPage from "./diary-edit.vue";
import { UserModule } from "../store/modules/user";
import { UserDTO } from "../core/models/sys/user.dto";

@Component({
    components: {
        "v-toolbar-search": ToolbarSearchComponent
    }
})
export default class DiaryListPage extends Vue {
    @Prop() toolbarInfo!: any;
    @Prop() data?: any;

    diaryPage = DiaryPage;
    diaryEditPage = DiaryEditPage;

    diaryService = new DiaryService();
    itemIndex: number = -1;
    list: DiaryDTO[] = [];
    currPage = 1;
    total = 1;
    state = "initial";

    forward(data: DiaryDTO, page: VueComponent) {
        if (page == this.diaryPage) {
            data.userInfo = UserModule.userInfo as UserDTO;
        }
        RouterUtils.forward({
            page: page,
            animation: "slide",
            title: "",
            backLabel: this.toolbarInfo.title,
            data: data
        });
    }

    loadMore(done: Function) {
        if (this.total > this.currPage) {
            setTimeout(() => {
                this.currPage += 1;
                this.diaryService
                    .list({ currPage: this.currPage }, { tag: this.data.id })
                    .then(rsp => {
                        const pageList: Page<DiaryDTO> = rsp.data.data;
                        this.total = pageList.total as number;
                        pageList.list.map((diary: DiaryDTO) => {
                            this.list.push(diary);
                        });
                    });

                done();
            }, 1000);
        }
    }

    beforeMount() {
        this.init();
    }

    init(done?: any) {
        this.list = [];
        this.diaryService
            .list({ currPage: 1 }, { tag: this.data.id })
            .then(rsp => {
                const pageList: Page<DiaryDTO> = rsp.data.data;
                this.total = pageList.total as number;
                this.currPage = pageList.currPage as number;
                pageList.list.map((diary: DiaryDTO) => {
                    this.list.push(diary);
                });
                if (done) {
                    done();
                }
            });
    }
    swipe(e: Event, index: number) {
        this.itemIndex = index;
    }
    async del(diary:DiaryDTO){
        this.itemIndex = -1;
       const confirm =  await this.$ons.notification.confirm(diary.title!,{
            title: "确定删除该故事？",
            buttonLabels: ["取消","确定"]
        });
        if(confirm){
           const rsp = await this.diaryService.delete(diary.id!);
           await this.$ons.notification.toast(rsp.data.message,{
               timeout: 1500
           })
        }
    }
    
}
</script>
<style scoped lang='scss'>
.intro {
    text-align: left;
    padding: 0 22px;
    margin-top: 20px;
    font-size: 14px;
    line-height: 1.4;
    color: rgba(0, 0, 0, 0.54);
    .item {
        position: relative;
        z-index: 1;
    }
}
::v-deep .opts {
    position: absolute;
    top: 0;
    right: -80px;
    font-size: 14px;
    background-color: #0076ff;
    color: #fff;
    line-height: 48px;
    height: 46px;
    padding: 0 8px;
    opacity: 0.8;
    transition: right 0.3s;
    z-index: 11;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    .opt-btn {
        padding-left: 4px;
    }
    &.active {
        right: 0;
        box-shadow: -2px 0 2px 0 #0076ff;
    }
}
.mask {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
}
</style>