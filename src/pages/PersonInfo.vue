<template>
    <v-ons-page>
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
        <v-ons-list>
            <v-ons-list-item class="person-pic">
                <div class="left">
                    <span class="list-item__title">Cutest kitty</span>
                </div>
                <div class="right">
                    <img class="list-item__thumbnail" src="http://placekitten.com/g/40/40">
                </div>
            </v-ons-list-item>
            <v-ons-list-item>

            </v-ons-list-item>
        </v-ons-list>
    </v-ons-page>
</template>

<script>
    export default {
        data() {
            return {
                toolbarInfo: {}
            }
        }
    }
</script>

<style scoped lang="scss">
    .person-pic {
        .list-item__title {
            line-height: 4rem;
        }

        .list-item__thumbnail {
            height: 4rem;
            width: 4rem;
        }
    }

</style>
