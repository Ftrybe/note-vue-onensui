<template>
    <div class="chequer-input">
        <input
            v-for="(item,index) in max"
            :key="index"
            maxlength="1"
            @input="change($event,index)"
            @keyup.delete="backspace($event,index)"
            :ref="'input'+index"
        />
    </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component
export default class ChequerInputComponent extends Vue {
    @Prop({ default: 4, type: Number }) max?: number;

    arr: Array<string> = new Array(this.max);

    change(event: InputEvent, index: number) {
        if (event.data) {
            this.arr[index] = event.data;
            const num = index == this.max! - 1 ? index : index + 1;
            ((this.$refs[
                "input" + num
            ] as Element[])[0] as HTMLInputElement).focus();
            this.$nextTick(() => {
                this.$emit("change", this.arr.join(""));
            });
        }
    }
    backspace(e: Event, index: number) {
        if (this.arr[index] == "") {
            const num = index > 0 ? index - 1 : index;
            ((this.$refs[
                "input" + num
            ] as Element[])[0] as HTMLInputElement).focus();
        }
        this.arr[index] = "";
        this.$emit("change", this.arr.join(""));
    }

    public clear() {
        for(var i=0;i<this.max!;i++){
            ((this.$refs[
                "input" + i
            ] as Element[])[0] as HTMLInputElement).value = "";
        }

        this.arr = new Array(this.max);
        this.$emit("change", this.arr);
    }
}
</script>
<style scoped lang='scss'>
.chequer-input {
    input {
        width: 32px;
        height: 32px;
        margin: 2px;
        text-align: center;
        font-size: 24px;
    }
}
</style>