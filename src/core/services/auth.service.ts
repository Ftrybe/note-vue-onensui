import http from 'axios';
import { LAuthDTO } from '../models/sys/lauth.dto';
import jwt from '@/core/interceptors/http.interceptor';
http.defaults.baseURL = process.env.VUE_APP_BASE_API;

export class AuthService {
    
    login(auth: LAuthDTO) {
        return http.post(
            '/tokens',
            auth
        );
    }

    register(auth: LAuthDTO,t:Number) {
        return http.post(
            '/username',
            auth,{
                params:{
                    t: t
                }
            }
        )
    }

    captcha(t:Number){
        return http.get('/captcha',{
            params:{
                t: t
            }
        });
    }

    update(auth:LAuthDTO){
        return jwt.put('/tokens',auth);
    }
}