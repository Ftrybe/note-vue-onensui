<template>
    <v-ons-page modifier="white">
        <v-ons-list>
            <v-ons-list-item class="info" modifier="chevron" @click="showInfo()">
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
            <div class="list-item__division"></div>
            <v-ons-list-item>
                <div class="left">
                    <v-ons-icon icon="md-face" class="list-item__icon"></v-ons-icon>
                </div>
                <div class="center">
                    退出
                </div>
            </v-ons-list-item>
        </v-ons-list>
    </v-ons-page>
</template>

<script>
    import PersonInfo from "./PersonInfo";

    export default {
        data() {
            return {}
        },
        methods: {
            showInfo() {
                this.$store.commit('navigator/options', {
                    // Sets animations
                    animation: "slide-ios",
                    // Resets default options
                    callback: () => this.$store.commit('navigator/options', {})
                });
                this.$store.commit('navigator/push', {
                    extends: PersonInfo,
                    data() {
                        return {
                            toolbarInfo: {
                                backLabel: '时间轴',
                                title: "个人信息"
                            }
                        }
                    }
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .info {
        height: 6rem;
        line-height: 3rem;

        img {
            height: 4rem;
            width: 4rem;
            border-radius: 0;
        }

    }

    .list-item__division {
        &:after {
            content: '';
            height: 0;
            padding: 8px;
            background: transparent;
        }
    }
</style>
