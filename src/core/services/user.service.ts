import http from '@/core/interceptors/http.interceptor'
import { SysLocalAuth } from '../models/sys/sys-local-auth.entity';
export class UserService {
    login(auth:SysLocalAuth) {
        return http({
            url: '/tokens',
            method: 'post',
            params: {auth}
        });
    }
}