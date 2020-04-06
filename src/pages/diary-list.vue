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
            <v-ons-list-item v-for="(diary,index) in list" :key="index" @click="forward(diary)">
                <v-ons-list-title>{{diary.title}}</v-ons-list-title>
            </v-ons-list-item>
        </v-ons-list>

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

@Component({
    components: {
        "v-toolbar-search": ToolbarSearchComponent
    }
})
export default class DiaryListPage extends Vue {
    @Prop() toolbarInfo!: any;
    @Prop() data?: any;

    diaryService = new DiaryService();

    list: DiaryDTO[] = [];
    currPage = 1;
    total = 1;
    state = "initial";

    forward(data: any) {
        RouterUtils.forward({
            page: DiaryEditPage,
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
}
</style>