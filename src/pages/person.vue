<template>
    <v-ons-page>
        <v-ons-list>
            <v-ons-list-item modifier="nodivider" style="background-color:#fafafa">
                <div class="right">
                    <v-ons-icon
                        icon="ion-ios-close"
                        class="list-item__icon"
                        @click="splitter.toggle()"
                    ></v-ons-icon>
                </div>
            </v-ons-list-item>

            <v-ons-list-item
                class="info"
                modifier="chevron nodivider"
                @click="forward(infoPage,'个人信息')"
                v-if="userInfo"
            >
                <div class="left">
                    <img class="list-item__thumbnail" :src="userInfo.photo" />
                </div>
                <div class="center" style="line-height: 28px;margin-left: 8px">
                    <span class="list-item__title">{{userInfo.nickname}}</span>
                    <span class="list-item__subtitle">{{userInfo.username}}</span>
                </div>
            </v-ons-list-item>

            <v-ons-list-item
                class="info"
                modifier="chevron nodivider"
                @click="forward(loginPage,'登录')"
                v-else
            >
                <div class="left">
                    <img class="list-item__thumbnail" src="pic/unlogin.gif" />
                </div>
                <div class="center" style="line-height: 28px;margin-left: 8px">
                    <span class="list-item__title">还未登录哦</span>
                    <span class="list-item__subtitle">点击登录账号~</span>
                </div>
            </v-ons-list-item>

            <v-ons-list-item modifier="nodivider" expandable v-if="userInfo">
                <div class="left">
                    <v-ons-icon icon="ion-ios-book" class="list-item__icon"></v-ons-icon>
                </div>
                <div class="center">日记</div>

                <v-ons-list class="expandable-content p-0 bg-none">
                    <v-ons-list-item
                        modifier="chevron nodivider"
                        v-for="(tag,index) of diaryTags"
                        :key="index"
                        @click="forward(diaryListPage,tag.name,tag)"
                    >
                        <div class="left">
                            <v-ons-icon icon="ion-ios-pricetag"></v-ons-icon>
                        </div>
                        <div class="center">{{tag.name}}</div>
                    </v-ons-list-item>
                </v-ons-list>
            </v-ons-list-item>

            <v-ons-list-item
                modifier="nodivider"
                expandable
                style="user-select:'none'"
                v-if="userInfo"
            >
                <div class="left">
                    <div @touchstart.prevent>
                        <v-touch @press="addTag">
                            <v-ons-icon icon="ion-ios-pricetags" class="list-item__icon"></v-ons-icon>
                        </v-touch>
                    </div>
                </div>
                <div class="center">备忘录</div>
                <v-ons-list class="expandable-content p-0 bg-none" expandable>
                <draggable
                    v-model="memorandumTags"
                    v-bind="dragOptions"
                    :move="onMove"
                    :change="onChange"
                    tag="div"
                    
                >
                    <v-ons-list-item
                        modifier="chevron nodivider"
                        v-for="tag in memorandumTags"
                        :key="tag.id"
                        @touchstart="touchStart"
                        @touchend="touchEnd($event,tag)"
                    >
                        <div class="left">
                            <v-ons-icon icon="ion-ios-pricetag"></v-ons-icon>
                        </div>
                        <div class="center">{{tag.name}}</div>
                    </v-ons-list-item>
                </draggable>
                 <v-ons-list-item
                        modifier="chevron nodivider"
                        @touchstart="touchStart"
                        @touchend="touchEnd($event, {id:0,name:'全部'})"
                    >
                        <div class="left">
                            <v-ons-icon icon="ion-ios-pricetag"></v-ons-icon>
                        </div>
                        <div class="center">全部</div>
                    </v-ons-list-item>
                </v-ons-list>
            </v-ons-list-item>

            <v-ons-list-item
                modifier="chevron"
                @click="forward(timeLinePage,'时光轴')"
                v-if="userInfo"
            >
                <div class="left">
                    <v-ons-icon icon="ion-ios-timer" class="list-item__icon"></v-ons-icon>
                </div>
                <div class="center">时光轴</div>
            </v-ons-list-item>
        </v-ons-list>

        <v-ons-list class="mt-3">
            <v-ons-list-item modifier="chevron" @click="forward(settingPage,'设置','0')">
                <div class="left">
                    <v-ons-icon icon="ion-ios-settings" class="list-item__icon"></v-ons-icon>
                </div>
                <div class="center">设置</div>
            </v-ons-list-item>
        </v-ons-list>
    </v-ons-page>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import PersonInfoPage from "./person-info.vue";
import NavigatorModule from "../store/modules/navigator";
import { getModule } from "vuex-module-decorators";
import SplitterModule from "@/store/modules/splitter";
import { Component as VueComponent } from "vue";
import PersonSettingPage from "./person-setting.vue";
import DiaryListPage from "./diary-list.vue";
import MemorandumListPage from "./memorandum-list.vue";
import TimeLinePage from "./time-line.vue";
import LoginPage from "./login.vue";
import UserModule from "../store/modules/user";
import { RouterUtils } from "../utils/router.utils";
import draggable from "vuedraggable";
import MemorandumEditPage from "./memorandum-edit.vue";
import { UserDTO } from "../core/models/sys/user.dto";
import MemorandumTagModule from "../store/modules/memorandum-tag";
import DiaryModule from "../store/modules/diary";
import { MemorandumTagService } from "../core/services/memorandum-tag.service";
import { MemorandumTagDTO } from "../core/models/sys/memorandum-tag.dto";
import Tag from '../core/models/sys/tag';

@Component({
    components: {
        draggable
    }
})
export default class PersonPage extends Vue {
    // 导入vuex模块
    splitter = getModule(SplitterModule);
    userModule = getModule(UserModule);
    memorandumTagModule = getModule(MemorandumTagModule);

    memoranduTagService = new MemorandumTagService();

    // 导入需要的页面
    settingPage = PersonSettingPage;
    infoPage = PersonInfoPage;
    diaryListPage = DiaryListPage;
    memorandumListPage = MemorandumListPage;
    timeLinePage = TimeLinePage;
    loginPage = LoginPage;

    localMemorandumTags?:MemorandumTagDTO[];
    
    // 备忘录标签设置
    editable = true;
    isDragging = false;
    delayedDragging = false;
    mTouchStartTime: number = 0;
    dragOptions = {
        animation: 0,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost"
    };

    get diaryTags() {
        return getModule(DiaryModule).diaryTags;
    }

    onMove(event: { relatedContext: any; draggedContext: any }) {
        const relatedElement = event.relatedContext.element;
        const draggedElement = event.draggedContext.element;
        return (
            (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
        );
    }

    onChange(event:any){
        console.log(event+ 'change');
    }

    // onEnd(event:any){
    //     console.log(event);
    // }

    // 使用拖拽插件导致点击不可用，使用触摸事件监听触摸时间触发点击事件
    touchStart(e: TouchEvent) {
        this.mTouchStartTime = e.timeStamp;
        e.preventDefault();
    }

    touchEnd(e: TouchEvent, data: any) {
        const mTouchTime = e.timeStamp - this.mTouchStartTime;
        if (mTouchTime < 300) {
            this.forward(MemorandumListPage, data.name, data);
        }
    }

    forward(page: VueComponent, title: string, data?: any) {
        RouterUtils.forward({
            page: page,
            animation: "slide",
            backButton: true,
            title: title,
            data: data
        });
    }

    addTag() {
        if (this.userInfo) {
            this.$ons.notification
                .prompt("请输入要添加的标签名", {
                    title: "",
                    buttonLabels: ["取消", "添加"]
                })
                .then(name => {
                    if (name) {
                        const tag = new MemorandumTagDTO();
                        tag.name = name;
                        
                        this.memoranduTagService.save(tag).then(rsp => {
                            this.memorandumTagModule.getTagList();
                        });
                    }
                });
        } else {
            this.$ons.notification.toast("请先登录账户", {
                buttonLabels: "确定",
                timeout: 1500
            });
        }
    }

    mounted() {}

    beforeCreate() {
        if (localStorage.user_token) {
            getModule(UserModule).init();
            getModule(MemorandumTagModule).init();
        }
    }

    get userInfo() {
        return this.userModule.userInfo;
    }

    get memorandumTags() {
        return this.memorandumTagModule.tags;
    }
    set memorandumTags(value:any) {
        this.memorandumTagModule.setTag(value);
    }
}
</script>

<style scoped lang="scss">
.info {
    height: 6rem;
    line-height: 3rem;

    img {
        height: 4rem;
        width: 4rem;
        border-radius: 0.25rem;
    }
}

.list-item__division {
    &:after {
        content: "";
        height: 0;
        width: 100%;
        padding: 8px 0;
        display: block;
        background: red;
    }
}
.m-active {
    animation-name: shake;
    animation-iteration-count: infinite;
    animation-duration: 0.1s;
}
@keyframes shake {
    0%,
    100% {
        transform: translate(0);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
        transform: translate(-0.4px);
    }
    20%,
    40%,
    60%,
    80% {
        transform: translate(0.4px);
    }
}
</style>
