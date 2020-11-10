<template>
    <v-ons-page :infinite-scroll="loadMore">
        <v-toolbar v-bind="toolbarInfo">
            <div slot="right"></div>
        </v-toolbar>
        <v-ons-pull-hook :action="init" @changestate="state = $event.state">
            <span v-show="state === 'initial'">刷新</span>
            <span v-show="state === 'preaction'">加载完成</span>
            <span v-show="state === 'action'">加载中。。</span>
        </v-ons-pull-hook>
        <v-ons-list>
            <v-ons-list-item class="item-box" v-for="(item,index) in list" :key="index" @tap="download(item)">
                <v-touch @swipe="swipe($event,index)" :swipe-options="{direction:'left'}" class="w-100">
                    <div class="item">
                        <div class="title">
                            {{item.title |stripHtml(20)}}
                        </div>
                        <div class="time">{{item.createTime |dataformat("yyyy-MM-d")}}</div>
                    </div>
                </v-touch>

                <div class="opts" :class="itemIndex == index?'active':''" v-if="userInfo && (item.createId == userInfo.id || userInfo.role == 0)">
                    <span class="opt-btn" @click="modifyTitle(item)">编辑</span>
                    <span class="opt-btn" @tap.stop="del(item,index)">删除</span>
                </div>

            </v-ons-list-item>
        </v-ons-list>

        <div class="fab" v-if="userInfo && userInfo.role == '0'" @click="switchDiaLog">
            <v-ons-icon icon="ion-ios-add" size="26px" />
        </div>
        <div class="text-center mt-4" v-if="currPage < total">
            <v-ons-icon icon="ion-ios-sync" size="26px" spin />
        </div>

        <v-ons-modal cancelable :visible.sync="addDialogVisible" class="dialog-box">
            <div>
                <v-ons-list class="pt-2" style="width:90%;margin: 0 auto">
                    <v-ons-list-item>
                        <v-ons-input placeholder="请输入标题" type="text" v-model="title" class="w-100"></v-ons-input>
                    </v-ons-list-item>

                    <v-ons-list-item>
                        <v-ons-input type="file" @change="handleFile"></v-ons-input>
                    </v-ons-list-item>

                    <v-ons-list-item>
                        <v-ons-button class="ml-auto" modifier="outline" @click="save">确定</v-ons-button>
                        <v-ons-button class="mx-2" modifier="outline" @click="switchDiaLog">取消</v-ons-button>
                    </v-ons-list-item>

                </v-ons-list>
            </div>
        </v-ons-modal>

        <div :class="itemIndex!=-1? 'mask':''" @tap="itemIndex=-1" />

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
import { UserModule } from "@/store/modules/user";
import ossUtils from "@/utils/oss";
import { UserDTO } from '@/core/models/sys/user.dto';


@Component({
    filters: {
        stripHtml: (html: string, limit: number) =>
            new HtmlFilter().strip(html, limit),
        dataformat: (date: Date, format: string) =>
            new DateFilter().format(date, format),
    }
})
export default class FileListComponent extends Vue {
 @Prop() toolbarInfo?: {};

    list: OssFileDTO[] = [];
    currPage = 1;
    total = 1;
    state = "initial";
    password = "";
    addDialogVisible = false;
    itemIndex: number = -1;

	fileType = "word";
    title?: string = "";
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
                order: { create_time: "DESC" },
                currPage: num,
				pageSize: 20,
            }, {type: this.fileType})
            .then((rsp) => {
                const pageList: Page<OssFileDTO> = rsp.data.data;
                this.total = pageList.total as number;
                this.currPage = pageList.currPage as number;
                var list = pageList.list;
                fun(list);
            });
	}
	modifyTitle(file: OssFileDTO){
		this.$ons.notification.prompt("请输入新标题",{
			title: "修改",
			buttonLabels: ["取消", "修改"],
		}).then((res)=>{
			if(res){
				file.title = res;
				ossFileService.update(file).then();
				this.$ons.notification.toast("修改成功",{
					 timeout: 1500
				});
			}
		})
		this.itemIndex = -1;
	}
    async download(f: OssFileDTO) {
        if(this.itemIndex!=-1){
            return;
		}
		if (f){
		const confirm = await this.$ons.notification.confirm(`确认下载${f.title}?`, {
            title: "提示",
            buttonLabels: ["取消", "确定"],
        });
        if (confirm) {
			const rsp = await ossFileService.getPrivate(f.id!, "word");
			 if (!rsp) {
				return
			}
			const file = rsp.data.data as OssFileDTO;
			window.open(file.url);
            await this.$ons.notification.toast(rsp.data.message, {
                timeout: 1500,
            });
        }
		}


    }
    
    handleFile(e: Event) {
        var target = e.target as any;
        var file = target.files[0];
        this.file = file;
    }
    switchDiaLog() {
        this.file = "";
        this.title = "";
        this.addDialogVisible = !this.addDialogVisible;
    }

    swipe(e: Event, index: number) {
        this.itemIndex = index;
    }

    async del(file: OssFileDTO, index: number) {
        this.itemIndex = -1;
        const confirm = await this.$ons.notification.confirm(`确认删除${file.title}?`, {
            title: "提示",
            buttonLabels: ["取消", "确定"],
        });
        if (confirm) {
            const rsp = await ossFileService.delete(file.id!);
            await this.$ons.notification.toast(rsp.data.message, {
                timeout: 1500,
            });
            this.init();
        }
    }
    save() {
        ossFileService.getSts("word").then(async (res) => {
            this.$ons.notification.toast("上传中，请稍等..。",{
                buttonLabels: "关闭",
                timeout: 1500
            })
            const sts = res.data.data;
            const rsp = await ossUtils.upload(sts, this.file, this.file.name,true);
            if (rsp) {
                await ossFileService.save({
                    url: rsp.url,
                    title: this.title,
                    targetUser: 'only',
                    type: "word",
                    filename: rsp.filename
                });
                this.init();
                this.switchDiaLog();
            }
        });
    }

    isNew(createTime: Date){
        return (Date.now() -  new Date(createTime).getTime()) < 3600000 * 24
    }

    get userInfo() {
        return UserModule.userInfo;
    }
}
</script>
<style scoped lang='scss'>


.item {
    display: flex;
    // flex-direction: column;
    align-items: center;
    font-size: 14px;
    .time {
        font-size: 12px;
        color: #333;
        margin-left: auto;
        min-width: 74px;
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
::v-deep .dialog-box .dialog {
    width: 90%;
    height: 100%;
}


::v-deep .opts {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: -80px;
    font-size: 14px;
    background-color: #0076ff;
    color: #fff;
    line-height: 48px;
    height: 46px;
    padding: 0 8px;
    opacity: 0.8;
    transition: right 0.3s;
    z-index: 99;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    &.active {
        right: 0;
        box-shadow: -2px 0 2px 0 #0076ff;
        .opt-btn {
            padding-left: 4px;
            padding-right: 4px;
            &:not(:first-child) {
                border-left: 1px solid;
            }
        }
    }
}
.mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
}
</style>