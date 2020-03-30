export default class Page<T> {
    currPage?: number;
    order?: {
        [columnName: string]: ("ASC" | "DESC") | {
            order: "ASC" | "DESC";
            nulls: "NULLS FIRST" | "NULLS LAST";
        };
    };
    pageSize?: number;
    total?: number;
    list?: any | T[];
}