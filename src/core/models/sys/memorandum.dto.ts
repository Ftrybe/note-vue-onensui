import BaseDTO from './base.dto';
import { MemorandumTagDTO } from "./memorandum-tag.dto";
export class MemorandumDTO extends BaseDTO {
    // 标题

    title?: string;
    // 内容

    content?: string;
    // 事件开始时间

    eventStartTime?: Date;
    // 事件结束时间

    eventStopTime?: Date;

    userId?: string;
    // 非数据库字段
    tags?: MemorandumTagDTO[];

    tagIds?: string;
}