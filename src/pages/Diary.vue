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

<script lang="ts">
import {Component, Prop, Vue } from 'vue-property-decorator';
import TimeLine from '../partials/TimeLine.vue';
import DiaryModify from './DiaryModify.vue';
@Component
export default class Diary extends Vue {
   private  fabVisible = true;
    private  DiaryModify =  DiaryModify;
    private  push(page: any, key: any) {
                this.$store.commit('navigator/push', {
                    extends: page,
                    data() {
                        return {
                            toolbarInfo: {
                                backLabel: '时间轴',
                                title: key,
                            },
                        };
                    },
                });
            }
}

</script>

<style scoped>

</style>
