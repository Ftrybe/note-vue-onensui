import http from '../interceptors/http.interceptor';
import { UserDTO } from '../models/sys/user.dto';
import { BaseService } from './base.service';

export class UserService extends BaseService<UserDTO>{

    baseUrl = "/user";
    
    getCurrentUser(){
       return http.get("/currentUser");
    }

}