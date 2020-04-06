import { VuexModule, Module, Mutation , getModule} from 'vuex-module-decorators';
import store from '../index';
@Module({
    dynamic: true,
    name: 'TabbarModule',
    store
})
class Tabbar extends VuexModule {
    index: number = 0;
    @Mutation
    set(index: number){
        this.index = index;
    }   
}
export const TabbarModule = getModule(Tabbar);
