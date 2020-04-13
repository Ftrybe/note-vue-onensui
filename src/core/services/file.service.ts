import http from '../interceptors/http.interceptor';
import { BaseService } from './base.service';
import { FileDto } from '../models/sys/file.dto';

class FileService extends BaseService<FileDto>{
    baseUrl: string = "/file";

    profile(id:string){
        http.get("/profile/"+id);
    }
    notice(){

    }
}
export default new FileService();
