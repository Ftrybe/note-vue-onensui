<template>
    <v-ons-page>
        <v-toolbar v-bind="toolbarInfo">
            <div slot="right"></div>
        </v-toolbar>
        <div class="content">
            <div class="audio-box mt-3">
                <audio class="audio" :src="data.url" ref="doubleAudio" controls />
                <div class="controller">
                    当前倍速{{playbackRate}}<v-ons-range v-model="volume" style="width: 100%;"></v-ons-range>
                </div>
            </div>
            <div class="text" v-if="data.content && data.content != ''" >
                <div v-html="data.content"></div>
            </div>
        </div>
    </v-ons-page>
</template>
<script lang='ts'>
import { Component, Ref, Vue, Prop, Watch } from "vue-property-decorator";
import { OssFileDTO } from "@/core/models/sys/oss-file.dto";
@Component
export default class AudioComponent extends Vue {
    @Prop() toolbarInfo?: {};
    @Prop() data!: OssFileDTO;
    @Ref("doubleAudio") readonly doubleAudio!: HTMLAudioElement;

    currentAudio: string = "double";
    volume: number = 50;
    playbackRate: number = 1;
    file: OssFileDTO = {};

    @Watch("volume")
    playbackRateChange() {
        this.playbackRate = this.volume / 50;
        if (this.volume < 10) {
            this.volume = 10;
        }
        if(this.playbackRate < 0.2){
            this.playbackRate = 0.2;
        }
        this.doubleAudio.playbackRate = this.playbackRate;
    }
}
</script>
<style scoped lang='scss'>
.content {
    padding: 16px;

    .audio {
        width: 100%;
    }
    .text {
        margin-top: 16px;
        text-indent: 2rem;
        letter-spacing: 1px;
        line-height: 1.5rem;
        font-size: 15px;
        background-color: #fff;
        box-shadow: 0 0 20px 20px #fff;
    }
}
</style>