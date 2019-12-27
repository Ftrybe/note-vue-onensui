import SysBaseEntity from "./sys-base.entity";
import { DisplayStateEnum } from '@/core/enums/display-state.enum';
import { DiaryTagEnum } from '@/core/enums/diary-tag.enum';
export class SysDiary extends SysBaseEntity {
    // 标题
    title?: string;

    userId?:string;
    //内容
    content?: string;
    //显示状态
    state?: DisplayStateEnum;

    tag?: DiaryTagEnum;
}