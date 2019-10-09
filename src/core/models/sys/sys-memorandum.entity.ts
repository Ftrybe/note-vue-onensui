import SysBaseEntity from "./sys-base.entity";
import { SysMemorandumTag } from "./sys-memorandum-tag.entity";
export interface  SysMemorandum extends SysBaseEntity {
    // 标题
    
    title: string;
    // 内容
    
    content: string;
    // 事件开始时间
    
    eventStartTime: Date;
    // 事件结束时间
    
    eventStopTime: Date;    

    userId: string;
    // 非数据库字段
    tags: SysMemorandumTag[];    tagIds: string;
}