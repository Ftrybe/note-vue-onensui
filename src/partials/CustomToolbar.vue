<template>
  <v-ons-toolbar>
    <div class="left">
      <slot name="left">
        <v-ons-back-button v-if="backLabel" class="fs-15">
          {{ backLabel }}
        </v-ons-back-button>
      </slot>
    </div>
    <div class="center"><slot>{{ title }}</slot></div>
    <div class="right"><slot name="right"></slot></div>
  </v-ons-toolbar>
</template>

<script>
  export default {
    props: ['title', 'backLabel']
  };
</script>
<style scoped lang="scss">
  .right{
    padding-right: 16px;
    color: #0076ff;
    font-size: 20px;
  }
  .left{
    font-size: 15px;
    .back-button__label{
      font-size: 15px;
    }
  }
</style>
