import BaseDTO from './base.dto';

export class OssFileDTO extends BaseDTO {
    title?: string;

    type?: string;

    url?: string;

    targetUser?: string;

    content?: string;

    password?: string;
}
