<template>
    <v-ons-page :infinite-scroll="loadMore">
        <v-toolbar v-bind="toolbarInfo"></v-toolbar>
        <v-ons-pull-hook :action="init" @changestate="state = $event.state">
            <span v-show="state === 'initial'">刷新</span>
            <span v-show="state === 'preaction'">加载完成</span>
            <span v-show="state === 'action'">加载中。。</span>
        </v-ons-pull-hook>
        <v-ons-list>
            <div
                class="timeline-item"
                :class="reverse?'reverse':''"
                v-for="diary of diarys"
                :key="diary.id"
            >
                <div class="timeline-item__day">
                    <div v-if="createDateView(diary.createTime)">
                        <strong class="day">{{diary.createTime | dataformat("d")}}</strong>
                        <span class="day_week">{{ dayOfWeek(diary.createTime) }}</span>
                    </div>
                    <div
                        v-if="createDateView(diary.createTime)"
                        class="year-mouth"
                    >{{diary.createTime| dataformat('yyyy.MM')}}</div>
                </div>
                
                <div @click="forward(diary)">
                    <div class="timeline-item__content">
                        <div class="timeline-item__tail" />
                        <div class="timeline-item__node" />
                        <div class="timeline-item__warp">
                            <div class="title">{{diary.title}}</div>
                            <div class="time">{{diary.createTime | dataformat("hh:mm")}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </v-ons-list>
    </v-ons-page>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import DiaryEditPage from "./diary-edit.vue";
import MemorandumPage from "./memorandum-edit.vue";
import {NavigatorModule} from "@/store/modules/navigator";
import { Component as VueComponent } from "vue";
import { RouterUtils } from "../utils/router.utils";
import { DiaryService } from "../core/services/diary.service";
import { DiaryDTO } from "../core/models/sys/diary.dto";
import { DateFilter } from "@/core/filters/date.filter";
import { mapActions } from "vuex";
import DiaryPage from './diary.vue';
@Component({
    filters: {
        dataformat: (date: Date, format: string) =>
            new DateFilter().format(date, format)
    }
})
export default class TimeLinePage extends Vue {
    @Prop() toolbarInfo!: {};
    state = "initial";
    diaryService = new DiaryService();
    times: Map<string, Date> = new Map();
    diarys: DiaryDTO[] = [];
    total: number = 0;
    currPage: number = 1;
    reverse = false;
    beforeMount() {
        this.init();
    }
    dayOfWeek(date: any) {
        return "周" + "日一二三四五六".charAt(new Date(date).getDay());
    }
    loadMore(done: Function) {
        if (this.total > this.currPage) {
            setTimeout(() => {
                this.currPage += 1;
                this.load(this.currPage, (list: DiaryDTO[]) => {
                    list.forEach(diary => {
                        this.diarys.push(diary);
                    });
                    done();
                });
            }, 1000);
        }
    }
    init(done?: any) {
        this.load(1, (list: any) => {
            this.diarys = list;
            if (done) {
                done();
            }
        });
    }

    createDateView(date: Date) {
        const createTime = new Date(date).toLocaleDateString();
        if (this.times.get(createTime) == date) {
            return true;
        }
        return false;
    }
    load(num: number, fun: Function) {
        this.diaryService
            .list({
                order: { create_time:"ASC"},
                currPage: num,
                pageSize: 20
            })
            .then(rsp => {
                const list = rsp.data.data.list as Array<DiaryDTO>;
                const diaryMap: Map<string, DiaryDTO[]> = new Map();

                list.forEach((entity, index, arr) => {
                    const createTime = new Date(
                        entity.createTime!
                    ).toLocaleDateString();
                    if (!this.times.has(createTime)) {
                        this.times.set(createTime, entity.createTime!);
                    }
                });
                fun(list);
            });
    }
    private forward(item: any) {
        RouterUtils.forward({
            page: DiaryEditPage,
            title: item.title,
            backLabel: "时间轴",
            data: item
        });
    }
}
</script>
<style scoped lang="scss">
$base-font-size: 0.875rem;
$sm-font-size: 0.75rem;

.timeline-item {
    display: flex;
    flex-direction: row;
    &__day {
        width: 56px;
        // height: 4rem;
        // width: 50%;
        font-size: $base-font-size;
        padding: 8px;
        & > div {
            padding: 2px 0;
            width: 56px;
        }

        .day_week {
            margin-left: 4px;
        }

        .year-mouth {
            font-size: $sm-font-size;
        }
    }

    &__content {
        position: relative;
        padding: 8px;
        width: 100%;
        .timeline-item__tail {
            position: absolute;
            left: 4px;
            height: 100%;
            border-left: 2px solid #e4e7ed;
        }

        .timeline-item__node {
            left: -1px;
            top: 16px;
            width: 12px;
            height: 12px;
            position: absolute;
            background-color: #e4e7ed;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .timeline-item__warp {
            position: relative;
            display: flex;
            flex-direction: column;
            margin-left: 28px;
            font-size: 12px;
            background-color: #fff;
            height: 100%;
            border-radius: 6px;
            margin-right: 8px;
            &:before {
                content: "";
                position: absolute;
                left: -12px;
                top: 8px;
                width: 0;
                height: 0;
                border-top: 6px solid transparent;
                border-right: 12px solid #fff;
                border-bottom: 2px solid transparent;
            }
            .title {
                padding: 8px;
                text-align: justify;
            }
            .time {
                padding-left: 8px;
                margin-top: auto;
            }
        }
    }
    &.reverse {
        flex-direction: row-reverse;

        .timeline-item__day {
            padding: 8px;

            .day_week {
                margin-left: 4px;
            }
        }
        .timeline-item__content {
            .timeline-item__tail {
                right: 4px;
                left: auto;
            }

            .timeline-item__node {
                right: -1px;
                left: auto;
            }
            .timeline-item__warp {
                &:before {
                    content: "";
                    left: -12px;
                }
                .title {
                    padding: 8px;
                    text-align: justify;
                }
                .time {
                    padding-left: 8px;
                    margin-top: auto;
                }
            }
        }
    }
}
</style>