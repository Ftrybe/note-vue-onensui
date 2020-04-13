import http from '../interceptors/http.interceptor';
import { MemorandumDTO } from '../models/sys/memorandum.dto';
import { BaseService } from './base.service';

export class MemorandumService extends BaseService<MemorandumDTO>{

    baseUrl = "/memorandum";
}
export default new MemorandumService();
