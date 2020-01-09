import http from 'axios'
import { LAuth } from '../models/sys/lauth.dto';
http.defaults.baseURL = process.env.VUE_APP_BASE_API;
export class AuthService {
    login(auth: LAuth) {
        return http.post(
            '/tokens',
            auth
        );
    }

    info(auth: LAuth) {
        return http.get('/tokens')
    }

    register(auth: LAuth,t:Number) {
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
}