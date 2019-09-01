import { VuexModule, Module, Mutation } from 'vuex-module-decorators';
import store from '../index';
@Module({
    dynamic: true,
    name: 'ActionSheetModule',
    store
})
export default class ActionSheetModule extends VuexModule {
   visible:boolean = false;

   @Mutation
   switch(){
       this.visible = !this.visible;
   }
}
