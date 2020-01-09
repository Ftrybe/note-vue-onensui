<template>
    <v-ons-page modifier="white">
        <v-toolbar v-bind="toolbarInfo">
            <div slot="right">
                <v-ons-icon icon="md-save" style="color:#c8e0fb" @click="save()"></v-ons-icon>
            </div>
        </v-toolbar>

        <v-ons-list class="flex-column h-100">
            <div class="subcontent" ref="subcontent">
                <v-ons-list-item>
                    <div class="center">
                        <v-ons-input placeholder="请输入标题" float v-model="name" class="center"></v-ons-input>
                    </div>
                </v-ons-list-item>

                    <div class="ext-content px-4">
                        <div class="select-box w-100">
                            <!-- <v-select-dropdown v-model="selectedItem" :list="tags"></v-select-dropdown> -->
                            <v-ons-icon icon="ion-ios-bookmark"> 默认</v-ons-icon>
                        </div>
                         <div class="w-100">
                            <v-ons-icon v-if="true" icon="ion-ios-eye"> 显示</v-ons-icon>
                            <v-ons-icon v-else icon="ion-ios-eye"> 隐藏</v-ons-icon>
                        </div>
                        <div class="w-100">
                            <v-ons-icon icon="ion-ios-time">
                                <v-date-picker
                                    v-model="date"
                                    :popover="{ placement: 'align-right', visibility: 'click' }"
                                    style="display:inline-block"
                                >
                                    <div class="text-14"> {{date |dataformat("yyyy-MM-d")}}</div>
                                </v-date-picker>
                            </v-ons-icon>
                        </div>
                       
                    </div>
            </div>
            <div class="editor-box h-100">
                <div class="editor-arrow" @click="toggleSubcontent(false)">
                    <v-ons-icon v-if="isFocus" icon="ion-ios-arrow-down" style="color:#0076ff"></v-ons-icon>
                </div>
                <v-quill-editor @focus="toggleSubcontent(true)" @blur="toggleSubcontent(false)" placeholder="请输入内容"></v-quill-editor>
            </div>
        </v-ons-list>
    </v-ons-page>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import QuillEditorComponent from "../partials/quill-editor.vue";
import SelectDropdownComponent from "@/partials/select-dropdown.vue";
import { DateFilter } from "@/core/filters/date.filter";
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
    private name = "text";
    private date = new Date();
    private selectedItem = "生日";
    private isFocus: boolean = false;

    @Prop() toolbarInfo: any;
    tags = [
        { text: "生日", value: "生日" },
        { text: "React", value: "React" },
        {
            text: "Angular长点的标题好进行测试",
            value: "Angular长点的标题好进行测试"
        }
    ];
    private save() {
        alert(1);
    }
    private toggleSubcontent(isFocus:boolean) {
        this.isFocus = isFocus;
         const style = this.isFocus ? "height: 0px" : "";
        (this.$refs.subcontent as HTMLElement).setAttribute("style", style);
    }
}
</script>

<style scoped lang="scss">
.subcontent {
    height: 6rem;
    transition: height ease 0.4s;
    font-size: 14px;

}
.select-box {
    // padding: 0 16px;
}
.ext-content{
    justify-content:space-between;
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
.ons-icon{
    &::before{
        padding-right: .5rem;
    }
}
</style>
