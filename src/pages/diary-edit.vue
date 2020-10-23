<template>
    <v-ons-page modifier="white">
        <v-toolbar v-bind="toolbarInfo">
            <v-ons-toolbar-button slot="right">
                <v-ons-icon icon="ion-ios-save" @click="save" />
            </v-ons-toolbar-button>
        </v-toolbar>

        <v-ons-list class="flex-column h-100">
            <div class="subcontent" ref="subcontent">
                <v-ons-list-item modifier="noborder">
                    <div class="center" style="background-image:none">
                        <v-ons-input placeholder="请输入标题" float v-model="diary.title" class="w-100"/>
                    </div>
                </v-ons-list-item>

                <div class="ext-content px-4">
                    <div class="select-box w-100">
                        <v-select-dropdown
                            v-model="diary.tag"
                            :list="diaryTags"
                            :suffix-icon="false"
                            :close="true"
                        >
                            <v-ons-icon icon="ion-ios-bookmark" />
                        </v-select-dropdown>
                    </div>

                    <div class="w-100">
                        <v-ons-icon
                            v-if="diary.visible"
                            icon="ion-ios-eye"
                            @click="diary.visible=false"
                        >显示</v-ons-icon>
                        <v-ons-icon v-else icon="ion-ios-eye-off" @click="diary.visible=true">隐藏</v-ons-icon>
                    </div>

                    <div class="w-100">
                        <v-ons-icon icon="ion-ios-time">
                            <v-date-picker
                                v-model="unKnowDate"
                                :popover="{ placement: 'align-right', visibility: 'click' }"
                                style="display:inline-block"
                            >
                                <div class="text-14">{{unKnowDate | dataformat("yyyy-MM-d")}}</div>
                            </v-date-picker>
                        </v-ons-icon>
                    </div>
                </div>
            </div>
            <div class="editor-box h-100">
                <div class="editor-arrow" @click="toggleSubcontent(false)">
                    <v-ons-icon v-if="isFocus" icon="ion-ios-arrow-down" style="color:#0076ff" />
                </div>
                <v-quill-editor
                    @focus="toggleSubcontent(true)"
                    @blur="toggleSubcontent(false)"
                    placeholder="请输入内容"
                    v-model="diary.content"
                />
            </div>
        </v-ons-list>
    </v-ons-page>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from "vue-property-decorator";
import QuillEditorComponent from "../partials/quill-editor.vue";
import SelectDropdownComponent from "@/partials/select-dropdown.vue";
import { DateFilter } from "@/core/filters/date.filter";
import { DiaryService } from "../core/services/diary.service";
import { DiaryDTO } from "../core/models/sys/diary.dto";
import { DiaryTagEnum } from "../core/enums/diary-tag.enum";
import { DiaryModule } from "../store/modules/diary";
@Component({
    filters: {
        dataformat: (date: Date, format: string) =>
            new DateFilter().format(date, format)
    },
    components: {
        "v-quill-editor": QuillEditorComponent,
        "v-select-dropdown": SelectDropdownComponent
    }
})
export default class DiaryEditPage extends Vue {
    @Prop() toolbarInfo: any;
    @Prop() data?: any;

    private diary: DiaryDTO = new DiaryDTO(true);
    private diaryService = new DiaryService();
    private id?: string;
    private unKnowDate: Date = new Date();
    private flag = true;
    private isFocus: boolean = false;

    beforeMount() {
        if (this.data) {
            this.diary = this.data;
            this.id = this.data.id;
            this.unKnowDate = new Date(this.diary.unKnowDate!);
        }
    }

    private async save() {
        if (this.flag) {
            this.flag = false;
            let response;
            this.diary.userInfo = undefined;
            this.diary.unKnowDate = this.unKnowDate;
            if (this.id) {
                response = await this.diaryService.update(this.diary);
            } else {
                response = await this.diaryService.save(this.diary);
                this.id = response.data.data;
            }
            if (response && response.data.code == "0") {
                this.$ons.notification.toast(response.data.message, {
                    timeout: 1500
                });
            }
            let timer = setTimeout(() => {
                this.flag = true;
                clearInterval(timer);
            }, 2000);
            this.$once("hook:beforeDestroy", () => {
                clearInterval(timer);
            });
        }
    }
    private toggleSubcontent(isFocus: boolean) {
        if (!this.diary.title && isFocus) {
            return;
        }
        this.isFocus = isFocus;
        const style = this.isFocus ? "height: 0px" : "";
        (this.$refs.subcontent as HTMLElement).setAttribute("style", style);
    }

    public get diaryTags() {
        return DiaryModule.diaryTags;
    }
}
</script>

<style scoped lang="scss">
.subcontent {
    height: 6rem;
    transition: height ease 0.4s;
    font-size: 14px;
}
.ext-content {
    justify-content: space-between;
    display: flex;
}
.editor-box {
    border-radius: 1rem;
    padding-top: 1rem;
    position: relative;
    // box-shadow: 0px -1px 1px 0px #444;
    .editor-arrow {
        position: absolute;
        top: -5px;
        left: calc(50% - 5.25px);
        color: #444;
    }
}
.list-item__title {
    padding: 8px 16px;
    font-size: 14px;
    color: #444444;
}
.list-item__input input {
    width: 100%;
    height: 25px;
    border: 0;
}
::v-deep .popover-origin.direction-bottom.align-left {
    left: auto;
    right: 0;
}
::v-deep
    .popover-origin
    .popover-content-wrapper
    .popover-content.align-left::after {
    left: auto;
    right: 20px;
}
.ons-icon {
    &::before {
        padding-right: 0.5rem;
    }
}
</style>
