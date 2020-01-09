import { DisplayStateEnum } from '@/core/enums/display-state.enum';
import { DiaryTagEnum } from '@/core/enums/diary-tag.enum';
import BaseDTO from './base.dto';
export class DiaryDTO extends BaseDTO {
    // 标题
    title?: string;

    userId?:string;
    //内容
    content?: string;
    //显示状态
    state?: DisplayStateEnum;

    tag?: DiaryTagEnum;
}