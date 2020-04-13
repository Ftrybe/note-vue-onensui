import http from "axios";
import Page from "../models/diary/page";
import { DiaryTagEnum } from '../enums/diary-tag.enum';
import { DiaryDTO } from '../models/sys/diary.dto';
import { BaseService } from './base.service';
export class PublicService extends BaseService<DiaryDTO>{
    baseUrl = "/public";
}
export default new PublicService();
