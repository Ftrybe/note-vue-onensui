<template>
    <v-ons-page>
        <v-toolbar v-bind="toolbarInfo">
            <div slot="right"></div>
        </v-toolbar>
        <v-ons-pull-hook :action="init" @changestate="state = $event.state">
            <span v-show="state === 'initial'">刷新</span>
            <span v-show="state === 'preaction'">加载完成</span>
            <span v-show="state === 'action'">加载中。。</span>
        </v-ons-pull-hook>
        <v-ons-list>
            <v-ons-list-item v-for="(item,index) in list" :key="index" @click="forward(item)">
                <div class="item">
                    <div class="title">{{item.title |stripHtml(20)}}</div>
                    <div class="time">{{item.createTime |dataformat("yyyy-MM-d")}}</div>
                </div>
            </v-ons-list-item>
        </v-ons-list>

        <div class="fab" v-if="userInfo && userInfo.id == 1" @click="switchDiaLog">
            <v-ons-icon icon="ion-ios-add" size="26px" />
        </div>
        <div class="text-center mt-4" v-if="currPage < total">
            <v-ons-icon icon="ion-ios-sync" size="26px" spin />
        </div>

        <v-ons-modal cancelable :visible.sync="addDialogVisible" class="dialog-box">
            <div>
                <v-ons-list class="w-100 pt-2">
                    <!-- <v-ons-list-header>标题</v-ons-list-header> -->
                    <v-ons-list-item>
                        <v-ons-input placeholder="请输入标题" type="text" v-model="title"></v-ons-input>
                    </v-ons-list-item>

                    <!-- <v-ons-list-header>语音</v-ons-list-header> -->
                    <v-ons-list-item>
                        <v-ons-input type="file" @change="handleFile"></v-ons-input>
                    </v-ons-list-item>

                    <v-ons-list-item style="height:300px">
                        <v-quill-editor placeholder="在此输入您想记住的内容" v-model="content" />
                    </v-ons-list-item>

                    <v-ons-list-item>
                        <v-ons-button class="ml-auto" modifier="outline" @click="save">确定</v-ons-button>
                        <v-ons-button class="mx-2" modifier="outline" @click="switchDiaLog">取消</v-ons-button>
                    </v-ons-list-item>

                </v-ons-list>
            </div>

        </v-ons-modal>

    </v-ons-page>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from "vue-property-decorator";
import ossFileService from "@/core/services/oss-file.service";
import Page from "@/core/models/diary/page";
import { HtmlFilter } from "@/core/filters/html.filter";
import { OssFileDTO } from "@/core/models/sys/oss-file.dto";
import { DateFilter } from "@/core/filters/date.filter";
import { RouterUtils } from "@/utils/router.utils";
import AudioPage from "@/pages/audio.vue";
import { UserModule } from "../store/modules/user";
import ossUtils from "@/utils/oss";
import QuillEditorComponent from "@/partials/quill-editor.vue";

@Component({
    filters: {
        stripHtml: (html: string, limit: number) =>
            new HtmlFilter().strip(html, limit),
        dataformat: (date: Date, format: string) =>
            new DateFilter().format(date, format),
    },
    components: {
        "v-quill-editor": QuillEditorComponent,
    },
})
export default class AudioListComponent extends Vue {
    @Prop() toolbarInfo?: {};

    list: OssFileDTO[] = [];
    currPage = 1;
    total = 1;
    state = "initial";
    addDialogVisible = false;

    title?: string = "";
    content?: string = "";
    file: any = null;

    loadMore(done: Function) {
        if (this.total > this.currPage) {
            setTimeout(() => {
                this.currPage += 1;
                this.load(this.currPage, (list: OssFileDTO[]) => {
                    list.forEach((diary) => {
                        this.list.push(diary);
                    });
                    done();
                });
            }, 1000);
        }
    }

    created() {
        this.init();
    }

    init(done?: any) {
        this.load(1, (list: any) => {
            this.list = list;
            if (done) {
                done();
            }
        });
    }

    load(num: number, fun: Function) {
        ossFileService
            .list({
                order: { create_time: "ASC" },
                currPage: num,
                pageSize: 20,
            })
            .then((rsp) => {
                const pageList: Page<OssFileDTO> = rsp.data.data;
                this.total = pageList.total as number;
                this.currPage = pageList.currPage as number;
                var list = pageList.list;
                fun(list);
            });
    }
    forward(data: OssFileDTO) {
        RouterUtils.forward({
            page: AudioPage,
            animation: "slide",
            title: data.title,
            backButton: true,
            data: data,
        });
    }
    handleFile(e: Event) {
        var target = e.target as any;
        var file = target.files[0];
        this.file = file;
    }
    switchDiaLog() {
        this.file = null;
        this.title = "";
        this.content = "";
        this.addDialogVisible = !this.addDialogVisible;
    }

    save() {
        ossFileService.getSts("audio").then(async (res) => {
            const sts = res.data.data;
            const url = await ossUtils.upload(sts, this.file, this.file.name);
            if (url) {
                await ossFileService.save({
                    url: url,
                    title: this.title,
                    targetUser: "-1",
                    type: "audio",
                    content: this.content
                });
                this.init();
                this.switchDiaLog();
            }
        });
    }
    get userInfo() {
        return UserModule.userInfo;
    }
}
</script>
<style scoped lang='scss'>
.item {
    display: contents;
    .time {
        font-size: 14px;
        color: #333;
        margin-left: auto;
    }
}
.fab {
    display: flex;
    position: fixed;
    right: 8px;
    bottom: 8px;
    width: 48px;
    height: 48px;
    border-radius: 48px;
    justify-items: center;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    box-shadow: 0 0 5px 0 #efefef;
}
::v-deep .dialog-box .dialog{
    width: 100%;
    height: 100%;
}
</style>