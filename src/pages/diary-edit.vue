<template>
  <v-ons-page modifier="white">
    <v-toolbar v-bind="toolbarInfo">
      <div slot="right">
        <v-ons-icon icon="md-save" style="color:#c8e0fb" @click="save()"></v-ons-icon>
      </div>
    </v-toolbar>

    <v-ons-list class="flex-column h-100">
      <v-ons-list-item>
        <div class="center">
          <v-ons-input placeholder="请输入标题" float v-model="name" class="center"></v-ons-input>
        </div>
      </v-ons-list-item>
      <v-ons-list-header>
        <div class="flex-column h-100">
          <div class="mmdm-header d-flex">
            <div class="select-box">
              <v-select-dropdown v-model="selectedItem" :list="tags"></v-select-dropdown>
            </div>
            <div class="ml-auto p-1">
              <v-date-picker
                v-model="date"
                :popover="{ placement: 'align-right', visibility: 'click' }"
              >
                <div class="text-14">{{date |dataformat("yyyy-MM-d")}}</div>
              </v-date-picker>
            </div>
          </div>
        </div>
      </v-ons-list-header>

      <v-quill-editor></v-quill-editor>
    </v-ons-list>
  </v-ons-page>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import QuillEditorComponent from "../partials/quill-editor.vue";
import SelectDropdownComponent from '@/partials/select-dropdown.vue';
import { DateFilter } from '@/core/filters/date.filter';
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
}
</script>

<style scoped>
.list-item__title {
  padding: 8px 16px;
  font-size: 14px;
  color: #444444;
}
</style>
<style>
.list-item__input input {
  width: 100%;
  height: 25px;
  border: 0;
}

</style>
