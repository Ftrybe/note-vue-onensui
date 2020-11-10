import { BaseService } from './base.service';
import { OssFileDTO } from '../models/sys/oss-file.dto';
import http from '../interceptors/http.interceptor';
export class OssFileService extends BaseService<OssFileDTO>{
    baseUrl: string = "/oss/file";

    getSts(type:string){
        return http.get("/oss/sts",{
            params: {
                type: type
            }
        })
    }

    getPrivate(id:string, type: string){
        return http.get(`/oss/private/${id}`,{
            params: {
                type: type
            }
        })
    }
}
export default new OssFileService();
