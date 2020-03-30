import { VuexModule, Module } from 'vuex-module-decorators';
import store from '../index';
import { DiaryTagEnum } from '../../core/enums/diary-tag.enum';
@Module({
    dynamic: true,
    name: 'DiaryModule',
    store
})
export default class DiaryModule extends VuexModule {
    diaryTags = [
        { id: "0", name: "默认" },
        { id: "1", name: "故事" },
        { id: "2", name: "随笔" },
        { id: "3", name: "心情" },
        { id: "4", name: "笑话" },
        { id: "5", name: "感情" },
    ]
}
