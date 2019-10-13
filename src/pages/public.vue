<template>
  <v-ons-page :infinite-scroll="loadMore">
    <div class="m-2">
      <v-ons-segment :index.sync="segmentIndex" style="width: 300px;background:transparent">
        <button>故事</button>
        <button>心情</button>
        <button>情感</button>
        <button>搞笑</button>
        <button>随笔</button>
      </v-ons-segment>
    </div>
    <v-ons-list>
      <v-ons-card v-for="(item,index) in list" :key="index" @click="forward(item)">
        <div class="title">这是个标题</div>
        <div class="content">{{item}}这是一个内容,贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长
          贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长贼长
        </div>
      </v-ons-card>
    </v-ons-list>

    <div class="text-center mt-4">
      <v-ons-icon icon="ion-ios-sync" size="26px" spin></v-ons-icon>
    </div>
  </v-ons-page>
</template>
<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import HomePage from "./home.vue";
import { getModule } from "vuex-module-decorators";
import UserModule from "../store/modules/user";

@Component
export default class PublicPage extends Vue {
  toolbarInfo!: {};
  list: any = [];
  segmentIndex = 0;
  log(name: any, event: any) {
    console.log(name, event);
  }
  loadMore(done: Function) {
    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        this.list.push(this.list.length + i);
      }
      done();
    }, 1000);
  }

  beforeMount() {
    for (let i = 0; i < 30; i++) {
      this.list.push(i);
    }
  }
  get loginState() {
    return getModule(UserModule).isLogin;
  }
}
</script>
<style scoped lang='scss'>
.center {
  width: auto;
}
</style>