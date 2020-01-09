import BaseDTO from './base.dto';
export class OAuthDTO extends BaseDTO {

    userId?: string;

    oauthName?: string;

    oauthId?: string;

    oauthAccessToken?: string;
    
    oauthExpires?: string;
}