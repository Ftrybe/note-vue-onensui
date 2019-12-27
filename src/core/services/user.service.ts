import http from 'axios'
import { SysLocalAuth } from '../models/sys/sys-local-auth.entity';
export class UserService {
    baseUrl = process.env.VUE_APP_BASE_API;
    login(auth: SysLocalAuth) {
        console.log(auth);
        return http.post(
            this.baseUrl + '/tokens',
            auth
        );
    }

    info(auth: SysLocalAuth) {
        return http.get(this.baseUrl + '/tokens')
    }

    register(auth: SysLocalAuth) {
        return http.post(
            this.baseUrl + '/username',
            auth
        )
    }
}