import BaseDTO from './base.dto';
import { MemorandumTagScopeDTO } from './memorandum-tag-scope.dto';
export class MemorandumDTO extends BaseDTO {
    constructor(init?: boolean) {
        super();
        if (init) {
            this.title = "";
            this.content = "";
            this.eventStartTime = new Date();
            this.eventStopTime = new Date();
            this.tagId = "0";
            this.scope = new MemorandumTagScopeDTO(true);
        }
    }

    // 标题

    title?: string;
    // 内容

    content?: string;
    // 事件开始时间

    eventStartTime?: Date;
    // 事件结束时间

    eventStopTime?: Date;

    userId?: string;

    tagId?: string;

    scope?:MemorandumTagScopeDTO;
}