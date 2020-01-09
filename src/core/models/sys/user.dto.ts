
import BaseDTO from './base.dto';
import { GenderEnum } from '@/core/enums/gender.enum';
import { ActiveStateEnum } from '@/core/enums/active-state.enum';
export class UserDTO extends BaseDTO {    
    
    nickname?: string;    
    
    birthday?: Date;    
    
    photo?: string;    
    
    gender?: GenderEnum;    
    
    phoneState?: ActiveStateEnum;

    username?: string;
}
