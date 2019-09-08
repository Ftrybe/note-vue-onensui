<template>
  <v-ons-page>
    <v-toolbar v-bind="toolbarInfo">
      <div slot="right">
        <v-ons-icon icon="md-save" style="color:#c8e0fb" @click="save()"></v-ons-icon>
      </div>
    </v-toolbar>
    <div class="flex-column h-100">
      <div class="mmdm-header">
        <div class="select-box">
          <div class="select-title">一堆选项</div>
          <div class="select-list">
            <div class="select-list-item"></div>
          </div>
        </div>
        <div class="time"></div>
      </div>
      <div class="d-flex flex-grow">
        <v-quill-editor></v-quill-editor>
      </div>
    </div>
  </v-ons-page>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import QuillEditorComponent from "@/partials/quill-editor.vue";
@Component({
  components: {
    "v-quill-editor": QuillEditorComponent
  }
})
export default class MemorandumEditPage extends Vue {
  @Prop() toolbarInfo!: {};
}
</script>
<style scoped lang='scss'>

</style>