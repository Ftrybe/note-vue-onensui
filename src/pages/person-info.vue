<template>
  <v-ons-page>
    <v-toolbar v-bind="toolbarInfo"></v-toolbar>
    <v-ons-list>
      <v-ons-list-item class="person-pic" modifier="chevron">
        <div class="center">
          <span class="list-item__title">头像</span>
        </div>
        <div class="right">
          <img class="list-item__thumbnail" src="http://placekitten.com/g/40/40" />
        </div>
      </v-ons-list-item>

      <v-ons-list-item>
        <div class="center">
          <span class="list-item__title">用户名</span>
        </div>
        <div class="right">sssssnnx</div>
      </v-ons-list-item>
      
      <v-ons-list-item modifier="chevron">
        <div class="center">
          <span class="list-item__title">昵称</span>
        </div>
        <div class="right">不知道啥</div>
      </v-ons-list-item>

      <v-ons-list-item modifier="chevron">
        <div class="center">
          <span class="list-item__title">手机号</span>
        </div>
        <div class="right">13400994216</div>
      </v-ons-list-item>

      <v-ons-list-item modifier="chevron">
        <div class="center">
          <span class="list-item__title">性别</span>
        </div>
        <div class="right">男</div>
      </v-ons-list-item>

      <v-ons-list-item modifier="chevron">
        <div class="center">
          <span class="list-item__title">心情</span>
        </div>
        <div class="right">真是个愉快的一天阿</div>
      </v-ons-list-item>

      <v-ons-list-item modifier="chevron">
        <div class="center">
          <span class="list-item__title">生日</span>
        </div>
        <div class="right">2019-9-1</div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class PersonInfoPage extends Vue {
  @Prop() toolbarInfo?: {};
}
</script>

<style scoped lang="scss">
.person-pic {
  .list-item__title {
    line-height: 4rem;
  }

  .list-item__thumbnail {
    height: 4rem;
    width: 4rem;
    border-radius: 0.25rem;
  }
}
.right {
  margin-right: 1rem;
  color: #9a9a9a;
}
</style>
