import SysBaseEntity from "./sys-base.entity";
export interface SysOAuth extends SysBaseEntity {

    userId: string;

    oauthName: string;

    oauthId: string;

    oauthAccessToken: string;
    
    oauthExpires: string;
}