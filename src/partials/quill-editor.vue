<template>
    <v-quill-editor
        :value="value"
        @input="changeContent"
        :editorToolbar="customToolbar"
        :placeholder="placeholder"
        @focus="focus"
        @blur="blur"
    ></v-quill-editor>
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
    @Prop() placeholder?: string;
    customToolbar = [
        [
            { header: 2 },
            { align: "center" },
            { list: "ordered" },
            { list: "bullet" }
        ]
    ];
    created() {
    }

    @Emit()
    changeContent(value: string) {}

    @Emit()
    focus(event:FocusEvent){}

    @Emit()
    blur(event:FocusEvent){}
}
</script>
<style scoped lang='scss'>
.quillWrapper {
    background: white;
    height: 100%;
    width: 100%;
    position: relative;
}
::v-deep #quill-container {
    position: absolute;
    left: 0;
    bottom: 48px;
    width: 100%;
    font-family: inherit;
    height: calc(100% - 48px);
    
    .ql-editor {
        * {
            -webkit-user-select: text;
        }
        &.ql-blank::before {
            font-style: normal;
        }
    }
}
::v-deep .ql-toolbar {
    position: absolute;
    background-color: white;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 9;
}
::v-deep .ql-snow .ql-picker.ql-expanded .ql-picker-options {
    top: auto;
    bottom: 100%;
}
</style>