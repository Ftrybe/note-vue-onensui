import SysBaseEntity from "./sys-base.entity";

export interface SysMemorandumTag extends SysBaseEntity {
    // 标签名称
    name: String;

    userId:String;
}