<template>
  <div class="search-box" :class="isActive?'active':''">
    <v-ons-search-input
      @blur="searchInpBlur"
      @keyup.enter="search(searchValue)"
      v-model="searchValue"
      class="search-inp"
      ref="searchInp"
    ></v-ons-search-input>
    <v-ons-icon icon="ion-search" class="ml-auto pl-1 pt-1 search-btn" :class="isActive?'active':''" @click="showSearchInp()"></v-ons-icon>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Emit } from "vue-property-decorator";

@Component
export default class ToolbarSearchComponent extends Vue {
  isActive: boolean = false;

  searchBoxTimerId?: number;

  searchValue: string = "";

  showSearchInp() {
    this.isActive= true;
    this.searchBoxTimerId = setTimeout(() => {
      ((this.$refs.searchInp as Vue).$el.getElementsByClassName(
        "search-input"
      )[0] as HTMLInputElement).focus();
    }, 1001);
  }

  searchInpBlur() {
    this.isActive = false;
  }

  @Emit()
  search(searchValue: string) {}
  beforeDestroy() {
    clearTimeout(this.searchBoxTimerId);
  }
}
</script>
<style scoped lang='scss'>
.toolbar__right {
  line-height: none;
}
.search-box {
  display: flex;
  margin-top: 8px;
  align-items: center;
  &.active {
    .search-inp {
      visibility: visible;
      width: 100%;
      transition: width 1s;
    }
  }
  .search-inp {
    line-height: 0;
    visibility: hidden;
    width: 0;
    transition: width 1s;
  }
  .search-btn {
    display: inline-block;
    color: #0076ff;
    animation: 1s showBtn;
    &.active {
      display: none;
      color: #1f1f21;
      animation: 1s showBtn;
    }
  }
}
@keyframes showBtn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>