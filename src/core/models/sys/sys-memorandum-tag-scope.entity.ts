import SysBaseEntity from "./sys-base.entity";
export interface SysMemorandumTagScope extends SysBaseEntity{
    memorandumId:string;

    tagId:string;
}