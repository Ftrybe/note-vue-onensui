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
            <v-ons-list-item class="item-box" v-for="(item,index) in list" :key="index" @tap="forward(item)">
                <v-touch @swipe="swipe($event,index)" :swipe-options="{direction:'left'}" class="w-100">
                    <div class="item">
                        <div class="title">
                            <v-ons-icon v-if="item.password" icon="ion-ios-key" class="lock" />
                            {{item.title |stripHtml(20)}}
                            <span v-if="isNew(item.createTime)" class="new">new</span>
                        </div>
                        <div class="time">{{item.createTime |dataformat("yyyy-MM-d")}}</div>
                    </div>
                </v-touch>

                <div class="opts" :class="itemIndex == index?'active':''" v-if="userInfo && (item.createId == userInfo.id || userInfo.role == 0)">
                    <!-- <span class="opt-btn" @click="forward(diary,diaryEditPage)">编辑</span> -->
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

                    <v-ons-list-item style="height:200px">
                        <v-quill-editor placeholder="这里输入说明" v-model="content" />
                    </v-ons-list-item>

                    <v-ons-list>
                        <v-ons-list-item v-for="(item, $index) in targetUserItems" :key="item.value" tappable>
                        <label class="left">
                            <v-ons-radio
                            :input-id="'radio-' + $index"
                            :value="item.value"
                            v-model=" targetUser"
                            >
                            </v-ons-radio>
                        </label>
                        <label :for="'radio-' + $index" class="center">
                            {{ item.text }}
                        </label>
                        </v-ons-list-item>
                    </v-ons-list>

                    <v-ons-list-item v-show="targetUser == 'all'" modifier="nodivider">
                        <v-ons-input type="password" placeholder="请输入密码（可选）" v-model="password" class="w-100 password"/>
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
import QuillEditorComponent from "@/partials/quill-editor.vue";
import { UserDTO } from '@/core/models/sys/user.dto';

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
    password = "";
    addDialogVisible = false;
    itemIndex: number = -1;

    title?: string = "";
    content?: string = "";
    file: any = null;
    targetUser: string = "";
    targetUserItems: any[] = [
        {
            text: "所有人可见",
            value: "all"
        },
        {
            text: "仅自己可见",
            value: "only"
        }];

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
        if(this.itemIndex!=-1){
            return;
        }
      if(this.userInfo){
         
         if((this.userInfo as UserDTO).role == '0'){
            this.getFileDetailed(data) 
         }
        }else{
             if(data.password && data.password !=""){
                this.$ons.notification.prompt("当前音频需要验证",{
                        autofocus: true,
                        placeholder: "请输入密码",
                        title: "",
                        buttonLabels: ["取消","验证"]
                    }).then(password=>{
                        if(password){
                            this.getFileDetailed(data, password) 
                        }
                    })
            }else{
                this.getFileDetailed(data);
            }
      }
      
    }

    getFileDetailed(data:OssFileDTO,password?:string){
      
        let query = {
            id: data.id,
            password: password
        }
        ossFileService.getDynamic(query).then(res => {
            data = res.data.data;
            RouterUtils.forward({
                page: AudioPage,
                animation: "slide",
                title: data.title,
                backButton: true,
                data: data,
            });
        })
    }
    
    handleFile(e: Event) {
        var target = e.target as any;
        var file = target.files[0];
        this.file = file;
    }
    switchDiaLog() {
        this.file = "";
        this.title = "";
        this.content = "";
        this.password = "";
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
        ossFileService.getSts("audio").then(async (res) => {
            this.$ons.notification.toast("上传中，请稍等..。",{
                buttonLabels: "关闭",
                timeout: 1500
            })
            const sts = res.data.data;
            const rsp = await ossUtils.upload(sts, this.file, this.file.name,false);
            if (rsp) {
                await ossFileService.save({
                    url: rsp.url,
                    title: this.title,
                    targetUser: this.targetUser,
                    type: "audio",
                    content: this.content,
                    password: this.password,
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

.lock{
    transform: rotate(-100deg);
    color: gray;
}
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

::v-deep .password .text-input,
::v-deep .password  .text-input__label
{
    font-size: 14px;
    padding-left: 16px;
    height: 16px;
    line-height: 16px;
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
.new{
    font-size: 12px;
    color: #ff0000;
    transform: scale(.75);
    text-shadow: 0 0 1px #ff0000;
    margin-top: -4px;
    position: absolute;
}
</style>