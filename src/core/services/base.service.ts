import pluralize from 'pluralize';
import http from '../interceptors/http.interceptor';
import Page from '../models/diary/page';
import BaseDTO from '../models/sys/base.dto';
export class BaseService<T extends BaseDTO> {

    baseUrl: string = "";

    get(id: string) {
        return http.get(this.resultFul(id))
    }

    getDynamic(entity: T) {
        return http.get(this.resultFul(entity.id), {
            params: entity
        })
    }

    save(entity: T) {
        return http.post(this.baseUrl, entity);
    }

    delete(id: string) {
        return http.delete(this.resultFul(id));
    }

    update(entity: T) {
        return http.put(this.baseUrl, entity);
    }

    list(page?: Page<T>,entity?: T) {
        return http.get(pluralize(this.baseUrl), { params: {page,entity} })
    }

    private resultFul(path?:string):string {
        return this.baseUrl + '/' + path;
    }

}