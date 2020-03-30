<template>
    <v-ons-toolbar>
        <div class="left">
            <slot name="left">
                <v-ons-back-button v-if="backLabel" class="fs-15">{{ backLabel }}</v-ons-back-button>
                <v-ons-back-button v-if="!backLabel&&backButton" class="fs-15"></v-ons-back-button>
            </slot>
        </div>
        <div class="center">
            <slot>{{ title }}</slot>
        </div>
        <div class="right">
            <slot name="right">
                <v-ons-toolbar-button @click="showPopover($event,'down',true)">
                    <v-ons-icon icon="ion-ios-create"></v-ons-icon>
                </v-ons-toolbar-button>

                <v-ons-popover
                    cancelable
                    :visible.sync="popoverVisible"
                    :target="popoverTarget"
                    :direction="popoverDirection"
                    :cover-target="coverTarget"
                    :mask-color="'rgba(0,0,0,0)'"
                >
                    <p class="text-center" v-for="(item, index) of forwardItems" :key="index">
                        <v-ons-icon :icon="item.icon" @click="forward(item)"><span class="pl-1">{{item.name}}</span></v-ons-icon>
                    </p>
                </v-ons-popover>
            </slot>
        </div>
    </v-ons-toolbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NavigatorModule from "@/store/modules/navigator";
import { getModule } from "vuex-module-decorators";
import DiaryEditPage from "@/pages/diary-edit.vue";
import MemorandumPage from "@/pages/memorandum-edit.vue";
import TabbarModule from "@/store/modules/tabbar";
import AuthModule from '../store/modules/auth';

@Component
export default class ToolbarComponent extends Vue {
    @Prop() private title!: string;
    @Prop() private backLabel?: string;
    @Prop() private backButton?: boolean;

    private navigatorVuex: NavigatorModule = getModule(NavigatorModule);

    private popoverVisible: boolean = false;
    private popoverTarget = null;
    private popoverDirection: string = "down";
    private coverTarget: boolean = false;

    private forwardItems = [
        {
            name: "编写日记",
            icon: "ion-ios-journal",
            page: DiaryEditPage
        },
        {
            name: "编写备忘",
            icon: "ion-ios-bookmarks",
            page: MemorandumPage
        }
    ];
    showPopover(event: any, direction: string, coverTarget = false) {
        if(this.token){
        this.popoverTarget = event;
        this.popoverDirection = direction;
        this.coverTarget = coverTarget;
        this.popoverVisible = true;
        }else{
          this.$ons.notification.toast("请先登录账户",{
            timeout: 1500
          })
        }

    }

    private forward(item: any) {
        this.popoverVisible = false;
        this.navigatorVuex.option({
            animation: "slide",
            callback: () => this.navigatorVuex.option({})
        });
        this.navigatorVuex.push({
            extends: item.page,
            onsNavigatorOptions: {
                animation: "slide"
            },
            onsNavigatorProps: {
                toolbarInfo: {
                    backLabel: this.title,
                    title: item.name
                }
            }
        });
    }
    get token(){
      return getModule(AuthModule).token;
    }
}
</script>
<style scoped lang="scss">
.right {
    font-size: 16px;
}
.left {
    font-size: 14px;
    .back-button__label {
        font-size: 14px;
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
        margin-top: -24px;
        box-shadow: 0 0 1px #666;
    }
}
</style>
