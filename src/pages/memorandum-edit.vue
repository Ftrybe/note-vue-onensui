<template>
  <v-ons-page>
    <v-toolbar v-bind="toolbarInfo">
      <div slot="right">
        <v-ons-icon icon="md-save" style="color:#c8e0fb" @click="save()"></v-ons-icon>
      </div>
    </v-toolbar>
    <div class="flex-column h-100">
      <div class="mmdm-header d-flex">
        <div class="select-box">
          <v-select-dropdown v-model="selectedItem" :list="tags"></v-select-dropdown>
        </div>
        <div class="ml-auto time">
          <v-date-picker
            v-model="date"
            :popover="{ placement: 'align-right', visibility: 'click' }"
          >
            <div>{{date |dataformat("yyyy-MM-d")}}</div>
          </v-date-picker>
        </div>
      </div>
      <div class="h-100">
        <v-quill-editor></v-quill-editor>
      </div>
    </div>
  </v-ons-page>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import QuillEditorComponent from "@/partials/quill-editor.vue";
import { DateFilter } from "@/core/filters/date.filter";
import SelectDropdownComponent from "../partials/select-dropdown.vue";
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
  isOpenPicker: boolean = false;
  date: Date = new Date();
  tags = [
    { text: "Vue", value: "Vue" },
    { text: "React", value: "React" },
    {
      text: "Angular长点的标题好进行测试",
      value: "Angular长点的标题好进行测试"
    }
  ];
  selectedItem = "Vue";
  test() {}
}
</script>
<style scoped lang='scss'>
.mmdm-header {
  background: #fff;
  padding: 0.5rem 1rem 0;
  .select-box {
    max-width: 5rem;
    .select-title {
    }
  }
}
::v-deep .popover-origin.direction-bottom.align-left {
  left: auto;
  right: 0;
}
::v-deep .popover-origin .popover-content-wrapper .popover-content.align-left::after {
  left: auto;
  right: 20px;
}
</style>