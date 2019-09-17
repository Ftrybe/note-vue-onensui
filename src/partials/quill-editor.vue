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
    [{ header: 2 },{ align: "center" },{ list: "ordered" }, { list: "bullet" }]
    ];
  @Emit()
  changeContent(value: string) {}
}
</script>
<style scoped lang='scss'>
.quillWrapper {
  background: white;
  height: 100%;
  width: 100%;
  position: relative;
}
::v-deep .ql-toolbar{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 9;
}
::v-deep .ql-editor * {
   -webkit-user-select: text;
}
::v-deep .ql-snow .ql-picker.ql-expanded .ql-picker-options {
  top: auto;
  bottom: 100%;
}
</style>