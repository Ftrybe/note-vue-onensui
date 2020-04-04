export class ValidatorUtils {
    public static isMobile(number:string): Boolean{
        if (/^1[3456789]\d{9}$/.test(number)) {
            return true;
        }
        return false;
    }    
}
