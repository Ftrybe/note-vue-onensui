<template>
    <v-ons-page>
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
    </v-ons-page>
</template>

<script>
    export default {
        name: "PersonInfo",
        data(){
            return {
                toolbarInfo: {}
            }
        }
    }
</script>

<style scoped>

</style>
