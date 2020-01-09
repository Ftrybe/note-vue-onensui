<template>
    <v-ons-page :infinite-scroll="loadMore">
        <v-toolbar v-bind="toolbarInfo"></v-toolbar>
        <p class="intro">
            在这里分享你的故事
            <br />
        </p>
        <v-ons-list>
            <v-ons-list-item v-for="(item,index) in list" :key="index" @click="forward(item)">
                <v-ons-list-title>{{item}}</v-ons-list-title>
            </v-ons-list-item>
        </v-ons-list>

        <div class="text-center mt-4">
            <v-ons-icon icon="ion-ios-sync" size="26px" spin></v-ons-icon>
        </div>
    </v-ons-page>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from "vue-property-decorator";
import ToolbarSearchComponent from "../partials/toolbar-search.vue";
import NavigatorModule from "@/store/modules/navigator";
import { Component as VueComponent } from "vue";
import { getModule } from "vuex-module-decorators";
import DiaryPage from "./diary.vue";
import { RouterUtils } from "../utils/router.utils";

@Component({
    components: {
        "v-toolbar-search": ToolbarSearchComponent
    }
})
export default class DiaryListPage extends Vue {
    @Prop() toolbarInfo!: {};
    navigator: NavigatorModule = getModule(NavigatorModule);
    list: any = [];

    forward(title: string) {
        RouterUtils.forward({
            page: DiaryPage,
            animation: "slide",
            title: title,
            backButton: true
        });
    }

    loadMore(done: Function) {
        setTimeout(() => {
            for (let i = 0; i < 10; i++) {
                this.list.push(this.list.length + i);
            }
            done();
        }, 1000);
    }

    beforeMount() {
        for (let i = 0; i < 30; i++) {
            this.list.push(i);
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
}
</style>