<template>
  <v-quill-editor :value="value" @input="changeContent" :editorToolbar="customToolbar"></v-quill-editor>
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
    [{ header: 2 },{ align: "center" },{ list: "ordered" }, { list: "bullet" }],
    [{font:[]}]
    ];
  @Emit()
  changeContent(value: string) {}
}
</script>
<style scoped lang='scss'>
.quillWrapper {
  display: flex;
  flex-direction: column-reverse;
  background: white;
  flex-grow: 1;
  .ql-editor.ql-blank {
    display: flex;
    flex-grow: 1;
  }
  .ql-container {
    flex-grow: 1;
  }
  .ql-toolbar .ql-formats .ql-picker-options {
    bottom: 100%;
    top: 0 !important;
  }
}
::v-deep .qu-editor * {
   -webkit-user-select: text;
}
::v-deep .ql-snow .ql-picker.ql-expanded .ql-picker-options {
  top: unset;
  bottom: 100%;
}
</style>