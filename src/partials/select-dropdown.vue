<template>
    <div class="flex-column dd-select">
        <div class="dd-select-inp-box" @click="showPopover($event,'down',true)">
            <slot name="select-icon">
                <v-ons-icon class="dd-select-icon" icon="ion-ios-pricetags"></v-ons-icon>
            </slot>
            <input class="dd-select-inp d-none" :value="localValue" readonly />
            <span class="dd-label" :style="'max-width:'+maxWidth">{{localName}}</span>
            <span class="dd-suffix-box" v-if="suffixIcon">
                <i class="dd-suffix" />
            </span>
        </div>

        <v-ons-popover
            cancelable
            :visible.sync="popoverVisible"
            :target="popoverTarget"
            :direction="popoverDirection"
            :cover-target="coverTarget"
            :mask-color="'rgba(0,0,0,0)'"
        >
            <v-ons-list
                class="dd-options"
                :style="popoverVisible ? 'transform: scale(1);opacity:1;' : ''"
            >
                <v-ons-list-item
                    v-for="(item,index) of list"
                    :key="index"
                    @click="select(item.id)"
                    :class="item.id==localValue?'active':''"
                >
                    <slot name="option-icon">
                        <v-ons-icon class="dd-select-icon" icon="ion-ios-pricetag"></v-ons-icon>
                    </slot>
                    <span class="pr-2">{{item.name}}</span>
                </v-ons-list-item>
            </v-ons-list>
        </v-ons-popover>
    </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import { PopoverOptions } from "../core/models/ons";
import Tag from "@/core/models/sys/tag";
@Component
export default class SelectDropdownComponent extends Vue {
    @Prop()
    value?: any;
    // 列表需要有id 和 name属性
    @Prop()
    list?: any;

    @Prop({ default: true })
    suffixIcon?: boolean;

    // 点击选项后是否关闭窗口
    @Prop({default:false})
    close?:boolean;

    @Prop({default:'10rem'})
    maxWidth?:string;

    popoverVisible = false;
    popoverTarget = null;
    popoverDirection = "down";
    coverTarget = true;

    map: Map<string, string> = new Map();
    // value为需要返回的值

    localValue: any = this.value;
    // localName?:string = "";
    currentSelect: string = "";

    beforeMount() {
        this.list.map((item: Tag) => {
            this.map.set(item.id, item.name);
        });
    }
    mounted(){
        this.localValue = this.value;
        this.currentSelect = this.value;
    }
    
    @Emit("input")
    select(localValue: string) {
        this.localValue = localValue;
        this.currentSelect = this.value;
        if(this.close){
            this.popoverVisible = false;
        }

    }

    showPopover(event: any, direction: any, coverTarget = false) {
        this.popoverTarget = event;
        this.popoverDirection = direction;
        this.coverTarget = coverTarget;
        this.popoverVisible = true;
    }

    //  @Watch("localValue")
    get localName() {
        return this.map.get(this.localValue);
    }

    // set localName(value) {
    //     value = this.localValue();
    // }
}
</script>
<style scoped lang='scss'>
.dd-select {
    width: 100%;
    position: relative;
    .dd-select-inp-box {
        height: 24px;
        display: flex;
        align-items: center;
        .dd-select-inp {
            border: none;
            width: 100%;
            font-size: 14px;
        }

        .dd-label {
            overflow: hidden;
            word-break:keep-all;
        }
        .dd-suffix-box {
            width: 16px;
            height: 0;
            position: relative;
            .dd-suffix {
                margin-left: 8px;
                width: 0;
                height: 0;
                position: absolute;

                &::after {
                    position: absolute;
                    top: -4px;
                    content: "";
                    width: 0;
                    height: 0;
                    border: 0.375rem solid transparent;
                    border-top: 0.375rem solid #000;
                }
            }
        }
    }

    &-icon {
        margin-right: 8px;
    }
}
.dd-options {
    list-style: none;
    transform: scale(0);
    opacity: 0.4;
    transition: transform 0.2s;
    min-width: 110px;
    box-shadow: 0 0 1px 0px #000000b5 !important;
    border-radius: 3px;
    .dd-option {
        height: 1.5rem;
        line-height: 1.5rem;
    }
    .active {
        background-color: #d3e4fb;
    }
}
::v-deep .popover__content.popover--top__content {
    width: 100%;
    overflow: visible;
}
::v-deep .popover__arrow.popover--top__arrow {
    display: none;
}
</style>