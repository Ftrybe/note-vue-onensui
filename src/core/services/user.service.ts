import http from '../interceptors/http.interceptor'
export class UserService {
    getCurrentUser(){
       return http.get("/currentUser");
    }
}