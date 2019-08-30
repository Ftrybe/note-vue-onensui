<template>
     <v-ons-page>
        <v-toolbar v-bind="toolbarInfo"></v-toolbar>
	</v-ons-page>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class MemorandumListPage extends Vue {
    @Prop() toolbarInfo!:{};
}
</script>
<style scoped lang='scss'>

</style>