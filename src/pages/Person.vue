<template>
    <v-ons-page>
        <v-ons-list>
            <v-ons-list-item class="info" modifier="chevron">
                <div class="left">
                    <img class="list-item__thumbnail" src="bg/love_gril.jpg">
                </div>
                <div class="center" style="line-height: 28px;margin-left: 8px">
                    <span class="list-item__title">Cutest kitty</span><span
                        class="list-item__subtitle">On the Internet</span>
                </div>
            </v-ons-list-item>

            <v-ons-list-item>
                <div class="left">
                    <v-ons-icon icon="md-face" class="list-item__icon"></v-ons-icon>
                </div>
                <div class="center">
                    Icon
                </div>
            </v-ons-list-item>
        </v-ons-list>
    </v-ons-page>
</template>

<script>
    export default {
        name: "Person",
        data() {
            return {}
        }
    }
</script>

<style scoped lang="scss">
    .info {
        height: 96px;
        line-height: 48px;

        img {
            height: 64px;
            width: 64px;
            border-radius: 0;
        }

    }
</style>
