<template>
    <v-ons-page modifier="white">
        <v-ons-list>
            <time-line></time-line>
            <time-line></time-line>
            <time-line></time-line>
        </v-ons-list>
        <v-ons-fab
                position="bottom right"
                :visible="fabVisible"
                @click="push(DiaryModify,'1')"
        >
            <v-ons-icon icon="md-edit"></v-ons-icon>
        </v-ons-fab>
    </v-ons-page>
</template>

<script>
    import TimeLine from "../partials/TimeLine";
    import DiaryModify from './DiaryModify'

    export default {
        components: {TimeLine},
        data() {
            return {
                fabVisible: true,
                DiaryModify: DiaryModify
            };
        },
        methods: {
            push(page, key) {
                this.$store.commit('navigator/push', {
                    extends: page,
                    data() {
                        return {
                            toolbarInfo: {
                                backLabel: '时间轴',
                                title: key
                            }
                        }
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
