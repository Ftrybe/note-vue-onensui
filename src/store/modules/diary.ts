import { VuexModule, Module, getModule } from 'vuex-module-decorators';
import store from '../index';
@Module({
    dynamic: true,
    name: 'DiaryModule',
    store
})
class Diary extends VuexModule {
    diaryTags = [
        { id: "0", name: "未分类" },
        { id: "1", name: "故事" },
        { id: "2", name: "随笔" },
        { id: "3", name: "心情" },
        { id: "4", name: "笑话" },
        { id: "5", name: "感情" },
    ]
}
export const DiaryModule = getModule(Diary);
