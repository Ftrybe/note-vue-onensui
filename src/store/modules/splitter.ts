import { VuexModule, Module, Mutation, getModule } from 'vuex-module-decorators';

import store from '../index';
@Module({
    dynamic: true,
    name: 'SplitterModule',
    store
})
class Splitter extends VuexModule {
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
export const SplitterModule = getModule(Splitter);
