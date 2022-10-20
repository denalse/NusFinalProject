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

export const colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
};

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
