<template>
  <v-quill-editor :value="value" @input="changeContent(value)" :editorToolbar="customToolbar"></v-quill-editor>
</template>
<script lang='ts'>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

import { VueEditor } from "vue2-editor";
@Component({
  components: {
    "v-quill-editor": VueEditor
  }
})
export default class QuillEditorComponent extends Vue {
  @Prop() value?: string;

  customToolbar = [
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }]
  ];
  @Emit()
  changeContent(value: string) {}
}
</script>
<style scoped lang='scss'>
</style>