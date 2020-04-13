import { BaseService } from './base.service';
import { MemorandumTagDTO } from '../models/sys/memorandum-tag.dto';

export class MemorandumTagService extends BaseService<MemorandumTagDTO> {
    
    baseUrl = "/memorandumTag";

}
export default new MemorandumTagService();
