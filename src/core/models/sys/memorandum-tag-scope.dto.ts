import BaseDTO from './base.dto';
export class MemorandumTagScopeDTO extends BaseDTO {
    constructor(init?:boolean){
        super();
        if(init){
            this.tagId = "0";
            this.userId = "";
            this.memorandumId = "";
        }
    }
    memorandumId?: string;

    tagId?: string;

    userId?:string;
}