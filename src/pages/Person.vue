<template>
    <v-ons-page modifier="white">
        <v-ons-list>
            <v-ons-list-item class="info" modifier="chevron nodivider" @click="showInfo()">
                <div class="left">
                    <img class="list-item__thumbnail" src="bg/love_gril.jpg">
                </div>
                <div class="center" style="line-height: 28px;margin-left: 8px">
                    <span class="list-item__title">昵称</span><span
                        class="list-item__subtitle">用户名</span>
                </div>
            </v-ons-list-item>
        </v-ons-list>

        <v-ons-list>
            <v-ons-list-item modifier="chevron">
                <div class="left">
                    <v-ons-icon icon="ion-clipboard" class="list-item__icon" style="color:red"></v-ons-icon>
                </div>
                <div class="center">
                    日记
                </div>
            </v-ons-list-item>

             <v-ons-list-item modifier="chevron">
                <div class="left">
                    <v-ons-icon icon="ion-clipboard" class="list-item__icon" style="color:red"></v-ons-icon>
                </div>
                <div class="center">
                    备忘录
                </div>
            </v-ons-list-item>

            <v-ons-list-item modifier="chevron">
                <div class="left">
                    <v-ons-icon icon="ion-clipboard" class="list-item__icon" style="color:red"></v-ons-icon>
                </div>
                <div class="center">
                    表白
                </div>
            </v-ons-list-item>
        </v-ons-list>

        <v-ons-list>
            <v-ons-list-item modifier="chevron">
                <div class="left">
                    <v-ons-icon icon="ion-settings" class="list-item__icon"></v-ons-icon>
                </div>
                <div class="center">
                    设置
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
            border-radius: .25rem;
        }

    }

    .list-item__division {
        &:after {
            content: '';
            height: 0;
            width: 100%;
            padding: 8px 0;
            display: block;
            background: red;
        }
    }
</style>
