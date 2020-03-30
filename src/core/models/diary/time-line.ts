import { DiaryDTO } from '../sys/diary.dto';
import { MemorandumDTO } from '../sys/memorandum.dto';

export interface TimeLine{
    // title: string;
    createTime: Date ;
    items: DiaryDTO[] | MemorandumDTO[];
}