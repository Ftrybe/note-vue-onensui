export class PromiseUtils {
    public static async apply(axiosMethod: Promise<any>, handle: any) {
        return new Promise((resolve, reject) => {
            axiosMethod.then(res => {
                const data = res.data.data;
                handle(data);
                resolve(data);
            }).catch(err => {
                reject(err);
            })
        })
    }
}
