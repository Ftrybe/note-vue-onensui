<template>
    <v-ons-page>
       <div>
           这是盒子
           <div>记事(动效)</div>
           <div>
               表单
               <div>用户名</div>
               <div>密码</div>
           </div>
           <div>登陆按钮</div>
       </div>
       <div>
           <div>qq快捷登陆</div>
           <div>weixin快捷登陆</div>
       </div>
	</v-ons-page>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class LoginPage extends Vue {

}
</script>
<style scoped lang='scss'>

</style>