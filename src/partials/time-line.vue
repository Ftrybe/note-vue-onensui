<template>
    <div class="timeline-item">
        <div class="fl">
            <div>
                <strong class="day">{{item.createTime | dataformat("d")}}</strong>
                <span class="day_week">{{ dayOfWeek }}</span>
            </div>
            <div class="year-mouth">
               {{item.createTime | dataformat('yyyy.MM')}}
            </div>
        </div>
        <div class="fr">
            <div class="timeline-item__tail"></div>
            <div class="timeline-item__node"></div>
            <div class="timeline-item__warp">
                <div class="title "> {{item.title}} </div>
                <div class="time"> {{item.createTime | dataformat("hh:mm")}} </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import {TimeLine} from '@/core/models/diary/time-line'
import { DateFilter } from '@/core/filters/date.filter'
@Component({
    filters:{
        dataformat: (date: Date,format: string)=>  new DateFilter().format(date, format)
    }
})
export default class TimeLineComponent extends Vue {
    @Prop() item!: TimeLine;

    get dayOfWeek(){
        return '周'+'日一二三四五六'.charAt(this.item.createTime.getDay());
    }
}
</script>

<style scoped lang="scss">
    $base-font-size: 0.875rem;
    $sm-font-size: 0.75rem;

    .timeline-item {
        display: flex;
        flex-direction: row;
        .fl {
            width: 56px;
           // height: 4rem;
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

        .fr {
            position: relative;
            padding: 8px;

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
                    content: '';
                    position: absolute;
                    left: -12px;
                    top: 8px;
                    width: 0;
                    height: 0;
                    border-top: 6px solid transparent;
                    border-right: 12px solid #fff;
                    border-bottom: 2px solid transparent;
                    
                }
                .title{
                    padding: 8px;
                    text-align: justify;
                }
                .time{
                    padding-left: 8px;
                    margin-top: auto;
                }
            }
        }


    }
</style>
