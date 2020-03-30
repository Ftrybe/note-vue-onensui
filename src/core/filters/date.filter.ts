export class DateFilter{
   public format(input: Date,fmt: string): string{
       let date = input;
        if(Object.prototype.toString.call(date) == Object.prototype.toString.call("a")){
            date = new Date(date);
        }
        if(/(y+)/.test(fmt)){
            fmt = fmt.replace(RegExp.$1, (date.getFullYear()+'').substr(4-RegExp.$1.length));
        }
        let o: any = {
            'M+': date.getMonth()+1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        }
        for(let k in o){    
            let str = o[k] + '';
            if(new RegExp(`(${k})`).test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length===1)?str:this.padLeftZero(str));
            }
        }
        return fmt;
    }

   private padLeftZero(str:string){
        return ('00'+str).substr(str.length);
    }
}