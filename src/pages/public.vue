<template>
    <v-ons-page :infinite-scroll="loadMore">
        <div class="background" />
        <v-ons-pull-hook :action="init" @changestate="state = $event.state">
            <span v-show="state === 'initial'">刷新</span>
            <span v-show="state === 'preaction'">加载完成</span>
            <span v-show="state === 'action'">加载中。。</span>
        </v-ons-pull-hook>
        <div class="m-2">
            <v-ons-segment :index.sync="segmentIndex" style="width: 100%;background:transparent">
                <button v-for="(tag,index) of tagList" :key="index">{{tag.name}}</button>
            </v-ons-segment>
        </div>
        <v-ons-list>
            <v-ons-card
                v-for="(item,index) in map"
                :key="index"
                @click="forward(item)"
            >
                <div class="title">{{item.title}}</div>
                <div class="content">
                    {{item.content | stripHtml}}
                    <div class="d-flex mt-2">
                        <div>{{item.userInfo.nickname}}</div>
                        <div class="ml-auto">{{item.unKnowDate | dataformat("yyyy-MM-d")}}</div>
                    </div>
                </div>
            </v-ons-card>
        </v-ons-list>

        <div class="text-center mt-4" v-if="currPage < total">
            <v-ons-icon icon="ion-ios-sync" size="26px" spin></v-ons-icon>
        </div>
    </v-ons-page>
</template>
<script lang='ts'>
import { Component, Vue, Watch } from "vue-property-decorator";
import HomePage from "./home.vue";
import { getModule } from "vuex-module-decorators";
import { RouterUtils } from "@/utils/router.utils";
import DiaryPage from "./diary.vue";
import { DiaryDTO } from "@/core/models/sys/diary.dto";
import AuthModule from "../store/modules/auth";
import DiaryModule from "../store/modules/diary";
import { PublicService } from "../core/services/public.service";
import { DiaryTagEnum } from "../core/enums/diary-tag.enum";
import Page from "@/core/models/diary/page";
import { DateFilter } from "@/core/filters/date.filter";
import { HtmlFilter } from "@/core/filters/html.filter";
@Component({
    filters: {
        dataformat: (date: Date, format: string) =>
            new DateFilter().format(date, format),
        stripHtml: (html: string) => new HtmlFilter().strip(html)
    }
})
export default class PublicPage extends Vue {
    segmentIndex: number = 0;
    publicService = new PublicService();

    list: DiaryDTO[] = [];

    diaryMap: Map<number, DiaryDTO[]> = new Map();

    currPage = 1;
    total = 1;
    state = "initial";

    forward(item: DiaryDTO) {
        RouterUtils.forward({
            animation: "slide",
            page: DiaryPage,
            title: "",
            backLabel: "广场",
            data: item
        });
    }

    loadMore(done: Function) {
        if (this.total > this.currPage) {
            setTimeout(() => {
                this.currPage += 1;
                this.publicService
                    .list(
                        { currPage: this.currPage },
                        { tag: this.segmentIndex+""}
                    )
                    .then(rsp => {
                        const pageList: Page<DiaryDTO> = rsp.data.data;
                        this.total = pageList.total as number;
                        pageList.list.map((diary: DiaryDTO) => {
                            this.list.push(diary);
                        });
                        this.diaryMap.set(this.segmentIndex, this.list);
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
        this.diaryMap.set(this.segmentIndex, this.list);
        this.publicService
            .list({ currPage: 1 }, { tag: this.segmentIndex +""})
            .then(rsp => {
                const pageList: Page<DiaryDTO> = rsp.data.data;
                this.total = pageList.total as number;
                this.currPage = pageList.currPage as number;
                pageList.list.map((diary: DiaryDTO) => {
                    this.list.push(diary);
                });
                this.diaryMap.set(this.segmentIndex, this.list);
                if (done) {
                    done();
                }
            });
    }
    get tagList() {
        return getModule(DiaryModule).diaryTags;
    }

    get map(){
        if(!this.diaryMap.get(this.segmentIndex)){
            this.init();
        }
        return this.diaryMap.get(this.segmentIndex);
    }
}
</script>
<style scoped lang='scss'>
.center {
    width: auto;
}
.list{
    background: none;
}
</style>