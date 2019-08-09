<template>
    <div class="timeline-item">
        <div class="fl">
            <div>
                <strong class="day">30</strong>
                <span class="week">周五</span>
            </div>
            <div class="year-mouth">
                2019.09
            </div>
        </div>
        <div class="fr">
            <div class="timeline-item__tail"></div>
            <div class="timeline-item__node"></div>
            <div class="timeline-item__warp">
                <div class="content">测试一下测试一下测试一下测试一下测试一下二十四字了</div>
                <div class="time">13:23</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TimeLine extends Vue {
}
</script>

<style scoped lang="scss">
    $base-font-size: 14px;
    $sm-font-size: 12px;

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

            .week {
                margin-left: 4px;
            }

            .year-mouth {
                font-size: $sm-font-size;
            }
        }

        .fr {
            position: relative;
            padding-bottom: $sm-font-size;

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
                background-color: #ffffff;
                height: 100%;
                border-radius: 6px;
                margin-right: 8px;
                &:before {
                    content: '';
                    position: absolute;
                    left: -12px;
                    top: 16px;
                    width: 0;
                    height: 0;
                    border-top: 6px solid transparent;
                    border-right: 12px solid #fff;
                    border-bottom: 2px solid transparent;
                }
                .content{
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
