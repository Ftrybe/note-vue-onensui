import { VuexModule, Module, Mutation , Action} from 'vuex-module-decorators';
import store from '../index';
@Module({
    dynamic: true,
    name: 'SplitterModule',
    store
})
export default class SplitterModule extends VuexModule {
    open: boolean = false;

    @Mutation
    toggle(shouldOpen: boolean){
        if (typeof shouldOpen === 'boolean') {
            this.open = shouldOpen;
          } else {
            this.open = !this.open;
          }
    }

}
