<template>
  <v-ons-page>
    <v-toolbar v-bind="toolbarInfo">
      <div slot="right">
        <v-ons-icon icon="md-save" style="color:#c8e0fb" @click="save()"></v-ons-icon>
      </div>
    </v-toolbar>
    <div class="mmdm-header">
        <div class="select-box">
            <div class="select-title"></div>
            <div class="select-list">
                <div class="select-list-item"></div>
            </div>
        </div>
        <div class="time">
        </div>
    </div>
    <v-quill-editor>
      
    </v-quill-editor>
  </v-ons-page>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import QuillEditorComponent from '@/partials/quill-editor.vue';
@Component({
  components:{
    'v-quill-editor': QuillEditorComponent
  }
})
export default class MemorandumEditPage extends Vue {
  @Prop() toolbarInfo!: {};
}
</script>
<style scoped>
</style>