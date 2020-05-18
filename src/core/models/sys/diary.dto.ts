import { DisplayStateEnum } from '@/core/enums/display-state.enum';
import { DiaryTagEnum } from '@/core/enums/diary-tag.enum';
import BaseDTO from './base.dto';
import { UserDTO } from './user.dto';
export class DiaryDTO extends BaseDTO {

    constructor(init?:boolean){
        super();
        if(init){
            this.title = "";
            this.content ="";
            this.visible = true;
            this.tag = DiaryTagEnum.DEFAULT;
            this.unKnowDate = new Date();
        }
    }
    // 标题
    title?: string;

    //内容
    content?: string;
    //显示状态
    visible?: boolean;

    tag?: string;

    userNickname?:string;

    userInfo?:UserDTO;

    unKnowDate?:Date;

}