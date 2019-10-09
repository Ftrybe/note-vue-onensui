
import SysBaseEntity from "./sys-base.entity";
import { GenderEnum } from '@/core/enums/gender.enum';
import { ActiveStateEnum } from '@/core/enums/active-state.enum';
export interface SysUser extends SysBaseEntity {    
    
    nickname: string;    
    
    birthday: Date;    
    
    photo: string;    
    
    gender: GenderEnum;    
    
    phoneState: ActiveStateEnum;
}
