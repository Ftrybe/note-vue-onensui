import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, Canceler, CancelTokenStatic } from 'axios';
const baseURL = process.env.VUE_APP_BASE_API;
export class HttpInterceptor {
    public axios:AxiosInstance;
    private pending:any[] = [];
    private cancelToken:CancelTokenStatic;
    private neverCancel = false;
    constructor() {
        console.log(process.env.VUE_APP_BASE_URL);
        this.axios = Axios.create({
            baseURL: baseURL,
            timeout: 8000
        });
        this.axios.defaults.timeout = 8000;
        this.cancelToken = Axios.CancelToken;
        this.request();
        this.response();
    }

    request() {
        this.axios.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                if(!config.cancelToken){
                    config.cancelToken = new this.cancelToken((cancel:Canceler) => {
                        this.removePending(config,cancel)
                    })
                }
                if (localStorage.token) {
                    config.headers.Authorization = localStorage.token;
                }
                return config;
            }, (err: AxiosError) => {
                return Promise.reject(err);
            }
        )
    }

    response() {
        this.axios.interceptors.response.use((response: AxiosResponse) => {
            this.removePending(response.config);
            if (response.data) {

            }
            return response;
        },
            (err: AxiosError) => {
                return Promise.reject(err);
            }
        )
    }

    removePending(config:AxiosRequestConfig,f?:any){
        const flagUrl = config.url;
        if (this.pending.indexOf(flagUrl) !== -1) {
            // 如果在请求中，并存在f,f即axios提供的取消函数
            if (f) {
                f('取消重复请求'); // 执行取消操作
            } else {
                this.pending.splice(this.pending.indexOf(flagUrl), 1); // 把这条记录从数组中移除
            }
        } else {
            // 如果不存在在请求队列中，加入队列
            if (f) {
                this.pending.push(flagUrl);
            }
        }
   
    }
}
export default new HttpInterceptor().axios;