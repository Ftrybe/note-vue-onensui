import { ActiveStateEnum } from '@/core/enums/active-state.enum';
import { RoleEnum } from '@/core/enums/role.enum';
import BaseDTO from './base.dto';
export class LAuth extends BaseDTO {

    userId?: string;

    username?: string;

    password?: string;

    phone?: string;

    role?: RoleEnum;

    state?: ActiveStateEnum;

    captcha?: string;
} 