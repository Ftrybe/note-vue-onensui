// 引入ali-oss
import axios from 'axios'
import Crypto from '@/utils/crypto/crypto';
import Base64 from '@/utils/crypto/base64';
import { isPrimitive } from 'vue-class-component/lib/util';

// getSts返回参数
// "accessKeyId"
// "securityToken": "CAIS/gJ1q6Ft5B2yfSjIr5feLI7iurhKj7uGQ2rFtlodY7x8qIfMrjz2IHlMenhrCe0WtPgylG1Y7/cSlrBoRoReREvCMpchs8QPqF3wOtOd5pHtt+NZ0HlF1YMwTUyV5tTbRsmkZg+0GJ70GZat9EJaxb/9ak+aPTiMOoGIjphKd8keWhLCAxNNGNZRIHkyyqodLmCDDeuxFRToj2HMbi9voREurWJk9Zy22NGHiGrZl0ao4+USvZjUP5y4btFlJotCS9Oy1eAMTcin6iNL7AVQ/6pblbFN/Sy93uuQGF5M+R6LQbW2r9RkN11+fbNoWfwG/uHzh+09vP2Jz9yvjBhMOewSViXET8f/nJqZSLvwaIdgLOqmZiyXjY3NFOGs71t+PCNAbV0QIIN9eiMgM3F2FGGGcJ3A0UvRfwKuR5KC1KwLypdvxz3qh4HTfwbeGOXEgXxEZ89hPxp5ZwRl1GjgY7IAdBdXb1RkCrCaQIN+dhlCrrnyugnfRqWAd8DVIyuUGoABX4PCGN+WAJiTt4TS2BG16RdEFxXkFvwwsWivq+/prWxH0TLtHMzygGyAeYCRE846O1jqT1rTk5T3nqBlwvwAM7SoGfk0FK8z5jZmdUI0cf50qFWOsT2tm+ebfQmWVOwpCrteAYo4telyP57GEjYiDMieLWD4IahNBnGpKZwrFs4=",
// "accessKeySecret": "6i5W93LAmwM88iVugSeHFCR2LRb8T4mDTNopML8QLYjr",
// "expiration": "2020-09-21T11:25:06Z",
// "allowObjectPrefix": "file/misc/749580169114550275"
// fileType  avatar-头像文件;enterprise-企业相关文件;misc-其他文件
export class OssUtils{
  private ossUploadUrl = "https://ftrybe.oss-cn-shenzhen.aliyuncs.com";

  async upload(sts: { Expiration: any; AccessKeySecret: any; AllowObjectPrefix: string; AccessKeyId: string ; SecurityToken: string;}, data: any, filename:string,isPrivate?:boolean) {
    const policy = this.getPolicy(sts.Expiration);
    const signature = this.getSignature(policy, sts.AccessKeySecret);
    const ossFilename = this.getFileName(filename);
    const key = sts.AllowObjectPrefix + "/" + ossFilename;
    let param = new FormData();
    param.append('name', filename);
    param.append('key', key);
    param.append('policy', policy);
    param.append('signature', signature);
    param.append('OSSAccessKeyId', sts.AccessKeyId);
    param.append('x-oss-security-token', sts.SecurityToken);
    param.append('x-oss-object-acl', isPrivate ?"private":"public-read");
    param.append('success_action_status', "200");
    param.append('file', data, filename);

    try {
      const response = await axios.post(this.ossUploadUrl, param);
      if (response.status = 200) {
        return {
          url: this.ossUploadUrl + "/" + key,
          filename: ossFilename,
          uri: key
        }
        
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  private getPolicy(expiration:string) {
    let policyText = {
      "expiration": expiration, //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
      "conditions": [
        ["content-length-range", 0, 1024 * 1024 * 30] // 设置上传文件的大小限制
      ]
    };
    return Base64.encode(JSON.stringify(policyText));
  }

  /** 生成签名
  *  @param {String} message policyText
  *  @param {String} accesskey accesskey
  * */
 private getSignature(message:string, accesskey:string) {
    let bytes = Crypto.HMAC(Crypto.SHA1, message, accesskey, {
      asBytes: true
    });
    return Crypto.bytesToBase64(bytes);
  }

  /** 根据旧文件名获取文件后缀
  *  @param {String} filename 文件名称
  * */
  private getSuffix(filename:string) {
    let pos = filename.lastIndexOf('.')
    let suffix = ''
    if (pos != -1) {
      suffix = filename.substring(pos)
    }
    return suffix;
  }

  /** 根据旧文件名，后缀生成新的随机文件名
*  @param {String} filename 文件名称
* */
 private  getFileName(filename:string) {
    return (
      new Date().getTime() +
      Math.random()
        .toString(36)
        .substring(3, 20) +
      this.getSuffix(filename)
    );
  }
  
  /** 将base64转换为文件对象
  *  @param {String} base64 base64字符串
  * */
  convertBase64ToBlob(base64:string) {
    var base64Arr = base64.split(',');
    var imgType = '';
    var base64String = '';
    if (base64Arr.length > 1) {
      //如果是图片base64，去掉头信息
      base64String = base64Arr[1];
      imgType = base64Arr[0].substring(base64Arr[0].indexOf(':') + 1, base64Arr[0].indexOf(';'));
    }
    // 将base64解码
    var bytes = atob(base64String);
    //var bytes = base64;
    var bytesCode = new ArrayBuffer(bytes.length);
    // 转换为类型化数组
    var byteArray = new Uint8Array(bytesCode);

    // 将base64转换为ascii码
    for (var i = 0; i < bytes.length; i++) {
      byteArray[i] = bytes.charCodeAt(i);
    }

    // 生成Blob对象（文件对象）
    return new Blob([bytesCode], { type: imgType });
  }
}
export default new OssUtils();