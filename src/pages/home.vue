<template>
  <v-ons-page>
    <div class="warp bg" style="background-image: url('bg/light_gril.jpg')">
      <v-ons-card class="panel">
        <div class="content">
          <div class="note">测试测试</div>
          <div class="time">-- 2017/6/8</div>
        </div>
      </v-ons-card>
    </div>
  </v-ons-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class HomePage extends Vue {

}
</script>

<style scoped lang="scss">
$base-font-size: 14px;
$sm-font-size: 12px;
.bg {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
}

.warp {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;

  .panel {
    z-index: 1;
    position: relative;
    width: 90%;
    max-height: 80%;
    background: inherit;
    overflow: hidden;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    &::after {
      content: "";
      position: absolute;
      background: inherit;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      filter: blur(5px);
      margin: -40px;
      z-index: -1;
    }
    .content {
      display: flex;
      align-items: center;
      flex-direction: column;
      padding: 16px;
      letter-spacing: 1.5px;
      text-align: justify;
      line-height: 1.5rem;
      .time {
        align-self: flex-end;
      }
    }
  }
}
</style>
