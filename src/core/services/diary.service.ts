import http from '../interceptors/http.interceptor';
import { DiaryDTO } from '../models/sys/diary.dto';
import { BaseService } from './base.service';

export class DiaryService extends BaseService<DiaryDTO> {
    
    baseUrl = "/diary";

}
