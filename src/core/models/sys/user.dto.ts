
import BaseDTO from './base.dto';
import { GenderEnum } from '@/core/enums/gender.enum';
import { ActiveStateEnum } from '@/core/enums/active-state.enum';
export class UserDTO extends BaseDTO {    
    
    constructor(init?:boolean){
        super();
        if(init){
            this.nickname = "";
            this.birthday = new Date();
            this.phone = "";
            this.gender = GenderEnum.NONE;
            this.phoneState = ActiveStateEnum.STANDARD;
            this.username = "";
            this.phone = "";

        }
    }
    nickname?: string;    
    
    birthday?: Date;    
    
    photo?: string;    
    
    gender?: GenderEnum;    
    
    phoneState?: ActiveStateEnum;

    username?: string;

    phone?: string;

    role?: string
}
