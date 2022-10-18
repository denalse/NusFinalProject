export interface SearchCriteria {
    type: string;
    width: number;
    height: number;
    search: string;
}

export interface SearchQuotes {
    text: string;
    author: string;
}
// export interface Register {
//     id?: number;
//     username: string;
//     password: string;
//     terms: boolean;
// }

export interface User {
    id?: string;
    username: string;
    password: string;
    token: string;
}

export class Alert {
    id!: string;
    type!: AlertType;
    message!: string;
    autoClose!: boolean;
    keepAfterRouteChange?: boolean;
    fade!: boolean;

    constructor(init?:Partial<Alert>) {
        Object.assign(this, init);
    }
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}

export interface Response {
    code: number;
    message?: string;
    data?: any;
}
