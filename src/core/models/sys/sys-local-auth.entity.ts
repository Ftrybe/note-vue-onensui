import SysBaseEntity from "./sys-base.entity";
import { RoleEnum } from '@/core/enums/role.enum';
import { ActiveStateEnum } from '@/core/enums/active-state.enum';
export interface SysLocalAuth extends SysBaseEntity {

    userId: string;

    username: string;

    password: string;

    phone: string;

    role: RoleEnum;

    state: ActiveStateEnum;
} 