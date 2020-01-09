<template>
    <v-ons-page>
        <v-toolbar v-bind="toolbarInfo">
            <div slot="right" class="text-14 text-blue">
                <v-ons-toolbar-button icon="ion-ios-more" @click="showPopover($event)" /> 
                <v-ons-popover
                    cancelable
                    :visible.sync="popoverVisible"
                    :target="popoverTarget"
                    :direction="'down'"
                    :mask-color="'rgba(0,0,0,0)'"
                >
                    <p class="text-center">
                      分享
                    </p>
                     <p class="text-center">
                      收藏
                    </p>
                </v-ons-popover>
            </div>
        </v-toolbar>

        <div class="background bg-white" />
        <div class="p-3">
          <div class="title text-center">这是一个什么样子的标题呢</div>
          <div class="content">
            <p>
                这是一个测试的内容，虽然我不知道我写的是什么，但是我需要把他弄的很长很长很长。
                很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长
                很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长
                很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长
                很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长
                很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长
                很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长
                很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长
                很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长
                很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长
                很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长
                很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长
                很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长
                很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长
                很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长
                很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长
                很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长
                很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长
                很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长
            </p>
          </div>
           <div class="footer">
            <div class="username">
              不明白
            </div>
            <div class="time">
              2019-9-20 22:30:12
            </div>
        </div>
        </div>
    </v-ons-page>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class DiaryPage extends Vue {
    @Prop() toolbarInfo!: {};

    private popoverVisible: boolean = false;
    private popoverTarget = null;

    showPopover(event: any) {
    this.popoverTarget = event;
    this.popoverVisible = true;
  }
}
</script>

<style lang="scss" scoped>
.title{
  font-size: 20px;
  line-height: 3rem;
  font-weight: 800;
}
.content {
    text-align: justify;
    line-height: 2rem;
    font-size: 17px;
    p{
      margin: 0;
    }
}
.footer{
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 14px;
  .tag{

  }
  .time{

  }
}
::v-deep .popover--top {
  p{
    margin:10px;
  }
  .popover__arrow{
    background: none;

  }
  .popover__content{
    width:150px;
    min-height: 32px;
    margin-top: -4px;
    box-shadow: 0 0 1px #666;
  }
}
</style>
