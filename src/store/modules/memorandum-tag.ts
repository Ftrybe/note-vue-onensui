import { VuexModule, Module, Mutation, Action, MutationAction } from 'vuex-module-decorators';
import store from '../index';
import { MemorandumTagService } from '@/core/services/memorandum-tag.service';
import { MemorandumTagDTO } from '@/core/models/sys/memorandum-tag.dto';
import { ResultCodeEnum } from '@/core/enums/result-code.enum';
const  key = "m_tags";
@Module({
    dynamic: true,
    name: 'MemorandumTagModule',
    store
})
export default class MemorandumTagModule extends VuexModule {
    tags = window.localStorage.getItem(key);

    @Mutation
    setTagList(tags: any) {
        window.localStorage.setItem(key, JSON.stringify(tags));
        this.tags = tags;
    }
    @Mutation
    clear(){
        window.localStorage.removeItem(key);
        this.tags = null;
    }

    @Action
    async init() {
        this.setTagList(JSON.parse(localStorage.getItem(key) || ''));
    }

    @Action
    async getTagList(){
        const rsp = await new MemorandumTagService().list({pageSize:99});
        if(rsp.data.code == ResultCodeEnum.SUCCESS){
            const tags:MemorandumTagDTO[]  = rsp.data.data;
            this.setTagList(tags);
            return ResultCodeEnum.SUCCESS;
        }
        return ResultCodeEnum.FAIL;
    }

    @Action
    async setTag(tags:any){
        console.log(this.tags);
        console.log(tags);
        this.setTagList(tags);
        // await new MemorandumTagService().update(tags);

    }
}
