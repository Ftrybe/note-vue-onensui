import http from 'axios';
import { LAuthDTO } from '../models/sys/lauth.dto';
import https from '@/core/interceptors/http.interceptor';
http.defaults.baseURL = process.env.VUE_APP_BASE_API;

export class AuthService {
    
    login(auth: LAuthDTO) {
        return http.post(
            '/tokens',
            auth
        );
    }

    register(auth: LAuthDTO,captchaTime?:number) {
        return http.post('/register',auth,{
            params: {
                captchaTime:captchaTime
            }
        })
    }

    captcha(captchaTime:number){
        return http.get('/captcha',{
            params:{
                captchaTime:  captchaTime
            }
        });
    }

    update(auth:LAuthDTO){
        return https.put('/tokens',auth);
    }

    smsCode(phone:string){
        return http.get('/smscode',{
            params:{
                phone:phone
            }
        });
    }

    verifyPhone(code:string,phone:string){
        return https.get('/verifyPhone',{
            params: {
                phone: phone,
                code: code
            }
        })
    }
    updatePhone(phones:{oldPhone:string,newPhone:string}){
        return https.put('/phone',phones);
    }
}