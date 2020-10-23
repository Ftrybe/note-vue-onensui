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
            <v-ons-list-item v-for="(item,index) in list" :key="index" @click="forward(item)">
                <v-ons-list-title>{{item.content |stripHtml(20)}}</v-ons-list-title>
            </v-ons-list-item>
        </v-ons-list>

        <div class="text-center mt-4" v-if="currPage < total">
            <v-ons-icon icon="ion-ios-sync" size="26px" spin />
        </div>
    </v-ons-page>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from "vue-property-decorator";
import MemorandumEditPage from "./memorandum-edit.vue";
import { RouterUtils } from "@/utils/router.utils";
import { MemorandumDTO } from "@/core/models/sys/memorandum.dto";
import { MemorandumService } from "@/core/services/memorandum.service";
import Page from "@/core/models/diary/page";
import { HtmlFilter } from "@/core/filters/html.filter";
import { MemorandumTagScopeDTO } from "../core/models/sys/memorandum-tag-scope.dto";

@Component({
    filters: {
        // dataformat: (date: Date, format: string) =>
        //     new DateFilter().format(date, format),
        stripHtml: (html: string, limit: number) =>
            new HtmlFilter().strip(html, limit)
    }
})
export default class MemorandumListPage extends Vue {
    @Prop() toolbarInfo!: {};
    @Prop() data?: any;

    memoService = new MemorandumService();

    list: MemorandumDTO[] = [];
    currPage = 1;
    total = 1;
    state = "initial";

    forward(data: MemorandumDTO) {
        RouterUtils.forward({
            page: MemorandumEditPage,
            animation: "slide",
            title: data.title,
            backButton: true,
            data: data
        });
    }

    loadMore(done: Function) {
        if (this.total > this.currPage) {
            setTimeout(() => {
                this.currPage += 1;
                this.memoService
                    .list({ currPage: this.currPage }, { tagId: this.data.id })
                    .then(rsp => {
                        const pageList: Page<MemorandumDTO> = rsp.data.data;
                        this.total = pageList.total as number;
                        pageList.list.map((memo: MemorandumDTO) => {
                            memo.scope = memo.scope
                                ? memo.scope
                                : new MemorandumTagScopeDTO(true);
                            this.list.push(memo);
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
        this.memoService.list({}, { tagId: this.data.id }).then(rsp => {
            const pageList: Page<MemorandumDTO> = rsp.data.data;
            this.total = pageList.total as number;
            this.currPage = pageList.currPage as number;
            pageList.list.map((memo: MemorandumDTO) => {
                memo.scope = memo.scope
                    ? memo.scope
                    : new MemorandumTagScopeDTO(true);
                this.list.push(memo);
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