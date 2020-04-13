import BaseDTO from './base.dto';

export class FileDto extends BaseDTO {
    name?: string;

    data: File | Blob | string | any;

    type?: string;

    dataType?: string;

    bucketName?: 'profile' | 'notice' | string;
}
