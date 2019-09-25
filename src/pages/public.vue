<template>
  <v-ons-page>
    <v-ons-toolbar>
      <v-ons-back-button v-if="loginState"></v-ons-back-button>
      
      <div class="center">
        <v-ons-segment :index.sync="segmentIndex" style="width: 300px">
          <button>故事</button>
          <button>心情</button>
          <button>情感</button>
          <button>搞笑</button>
          <button>随笔</button>
        </v-ons-segment>
      </div>
    </v-ons-toolbar>
  </v-ons-page>
</template>
<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import HomePage from './home.vue';
import { getModule } from 'vuex-module-decorators';
import UserModule from '../store/modules/user';

@Component
export default class PublicPage extends Vue {
  toolbarInfo!:{};

  segmentIndex = 0;
  log(name: any, event: any) {
    console.log(name, event);
  }

  get loginState(){
    return getModule(UserModule).isLogin;
  }
}
</script>
<style scoped lang='scss'>
.center{
    width: auto;
}
</style>