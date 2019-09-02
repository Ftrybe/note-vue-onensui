import { VuexModule, Module, Mutation } from 'vuex-module-decorators';
import store from '../index';
@Module({
    dynamic: true,
    name: 'ActionSheetModule',
    store
})
export default class ActionSheetModule extends VuexModule {
   dp_visible:boolean = false;
   ss_visible:boolean = false;

   @Mutation
   dp_switch(){
       this.dp_visible = !this.dp_visible;
   }
   
   @Mutation
   ss_switch(){
       this.ss_visible = !this.ss_visible;
   }
}
