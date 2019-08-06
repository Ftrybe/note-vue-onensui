<template>
    <v-ons-page modifier="white">
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
        <v-ons-list>
            <v-ons-list-item>
                <div class="left">
                    <span class="list-item__title">Cutest kitty</span>
                </div>
                <div class="right">
                    <img class="list-item__thumbnail" src="http://placekitten.com/g/40/40">
                </div>
            </v-ons-list-item>
        </v-ons-list>
    </v-ons-page>
</template>

<script>
    export default {
        data(){
            return {
                toolbarInfo: {}
            }
        }
    }
</script>

<style scoped>

</style>
