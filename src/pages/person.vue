<template>
  <v-ons-page>
    <v-ons-list>
      <v-ons-list-item modifier="nodivider" style="background-color:#fafafa">
        <div class="right">
          <v-ons-icon icon="ion-close" class="list-item__icon" @click="splitter.toggle()"></v-ons-icon>
        </div>
      </v-ons-list-item>
      <v-ons-list-item class="info" modifier="chevron nodivider" @click="forward(infoPage,'个人信息')">
        <div class="left">
          <img class="list-item__thumbnail" src="bg/love_gril.jpg" />
        </div>
        <div class="center" style="line-height: 28px;margin-left: 8px">
          <span class="list-item__title">昵称</span>
          <span class="list-item__subtitle">用户名</span>
        </div>
      </v-ons-list-item>

      <v-ons-list-item modifier="nodivider" expandable>
        <div class="left">
          <v-ons-icon icon="md-book" class="list-item__icon"></v-ons-icon>
        </div>
        <div class="center">日记</div>

        <v-ons-list class="expandable-content p-0 bg-none">
          <v-ons-list-item
            modifier="chevron nodivider"
            v-for="(tag,index) of diaryTags"
            :key="index"
            @click="forward(diaryListPage,tag.name)"
          >
            <div class="left">
              <v-ons-icon icon="ion-pricetag"></v-ons-icon>
            </div>
            <div class="center">{{tag.name}}</div>
          </v-ons-list-item>
        </v-ons-list>
      </v-ons-list-item>

      <v-ons-list-item modifier="nodivider" expandable>
        <div class="left">
          <v-ons-icon icon="md-bookmark" class="list-item__icon"></v-ons-icon>
        </div>
        <div class="center">备忘录</div>
        <v-ons-list class="expandable-content p-0 bg-none">
          <v-ons-list-item modifier="chevron nodivider">
            <div class="left">
              <v-ons-icon icon="ion-pricetag"></v-ons-icon>
            </div>
            <div class="center">全部</div>
          </v-ons-list-item>

          <v-ons-list-item modifier="chevron nodivider" v-for="(tag,index) of memorandumTags" :key="index"> 
            <div class="left">
              <v-ons-icon icon="ion-pricetag"></v-ons-icon>
            </div>
            <div class="center">{{tag.name}}</div>
          </v-ons-list-item>

          <v-ons-list-item modifier="chevron nodivider" tappable @click="addTag()">
            <div class="left">
              <v-ons-icon icon="ion-pricetags"></v-ons-icon>
            </div>
            <div class="center">添加</div>
          </v-ons-list-item>
        </v-ons-list>
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-list class="mt-3">
      <v-ons-list-item modifier="chevron" @click="forward(settingPage,'设置')">
        <div class="left">
          <v-ons-icon icon="ion-settings" class="list-item__icon"></v-ons-icon>
        </div>
        <div class="center">设置</div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PersonInfoPage from "./person-info.vue";
import NavigatorModule from "../store/modules/navigator";
import { getModule } from "vuex-module-decorators";
import SplitterModule from "@/store/modules/splitter";
import { Component as VueComponent } from "vue";
import PersonSettingPage from "./person-setting.vue";
import DiaryListPage from "./diary-list.vue";
import MemorandumListPage from "./memorandum-list.vue";

export default class PersonPage extends Vue {
  // 页面导航
  navigator: NavigatorModule = getModule(NavigatorModule);
  splitter: SplitterModule = getModule(SplitterModule);

  // 页面
  settingPage = PersonSettingPage;
  infoPage = PersonInfoPage;
  diaryListPage = DiaryListPage;
  memorandumListPage = MemorandumListPage;
  isExpress = false;

  diaryTags = [
    {
      name: "全部",
    },
    {
      name: "故事",
    },
    {
      name: "心情",
    },
    {
      name: "随笔",
    },
    {
      name: "笑话",
    },
    {
      name: "感情",
    }
  ];

  memorandumTags = [
    {
      name: "全部",
    },
    {
      name: "测试"
    }
  ];

  forward(page: VueComponent, title: string, animation: string = "slide") {
    this.navigator.option({
      animation: animation,
      callback: () => this.navigator.option({})
    });

    this.navigator.push({
      extends: page,
      onsNavigatorOptions: {
        animation: animation
      },
      onsNavigatorProps: {
        toolbarInfo: {
          backButton: true,
          title: title
        }
      }
    });
  }
  addTag() {
    this.$ons.notification
      .prompt("请输入标签名", {
        title: "",
        buttonLabels:["取消","添加"]
      })
      .then(value => {
        if (value) {
          console.log(value);
        }
      });
  }
  longPress(){
    alert("success");
    console.log("成功");
  }
}
</script>

<style scoped lang="scss">
.info {
  height: 6rem;
  line-height: 3rem;

  img {
    height: 4rem;
    width: 4rem;
    border-radius: 0.25rem;
  }
}

.list-item__division {
  &:after {
    content: "";
    height: 0;
    width: 100%;
    padding: 8px 0;
    display: block;
    background: red;
  }
}
</style>
