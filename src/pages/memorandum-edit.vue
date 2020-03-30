<template>
    <v-ons-page>
        <v-toolbar v-bind="toolbarInfo">
            <v-ons-toolbar-button slot="right">
                <v-ons-icon icon="ion-ios-save" @click="save"></v-ons-icon>
            </v-ons-toolbar-button>
        </v-toolbar>
        <div class="flex-column h-100 mt-0">
            <div class="mmdm-header d-flex">
                <div class="select-box">
                    <v-select-dropdown v-model="memo.scope.tagId" :list="tags"></v-select-dropdown>
                </div>
                <div class="ml-auto p-1">
                    <v-date-picker
                        v-model="memo.eventStartTime"
                        :popover="{ placement: 'align-right', visibility: 'click' }"
                    >
                        <div class="text-14">{{memo.eventStartTime | dataformat("yyyy-MM-d")}}</div>
                    </v-date-picker>
                </div>
            </div>
            <v-quill-editor placeholder="在此输入您想记住的内容" v-model="memo.content"></v-quill-editor>
        </div>
    </v-ons-page>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import QuillEditorComponent from "@/partials/quill-editor.vue";
import { DateFilter } from "@/core/filters/date.filter";
import SelectDropdownComponent from "../partials/select-dropdown.vue";
import { getModule } from "vuex-module-decorators";
import MemorandumTagModule from "../store/modules/memorandum-tag";
import { MemorandumDTO } from "../core/models/sys/memorandum.dto";
import { MemorandumService } from "../core/services/memorandum.service";
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
export default class MemorandumEditPage extends Vue {
    @Prop() toolbarInfo!: {};

    @Prop() data?: any;

    memoService = new MemorandumService();

    memo = new MemorandumDTO(true);
    
    beforeMount() {
        
        if (this.data && this.data.id) {
            this.memo = this.data;
            // this.memoService.get(this.data.id).then(res => {
            //     this.memo = res.data.dataformat;
            // });
        }
    }

    async save() {
        let response;
        if (this.data) {
            response = await this.memoService.update(this.memo);
        } else {
            response = await this.memoService.save(this.memo);
        }
        if (response && response.data.code == "0") {
            this.$ons.notification.toast(response.data.message, {
                timeout: 1500
            });
        }
    }
    get tags() {
        return getModule(MemorandumTagModule).tags;
    }
}
</script>
<style scoped lang='scss'>
.mmdm-header {
    background: #fff;
    padding: 0.5rem 0.5rem 0 0.5rem;
    .select-box {
        max-width: 5rem;
    }
}
.mmdm-editor {
    height: 100%;
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
</style>