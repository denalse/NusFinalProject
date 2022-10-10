export interface Register {
    email: string;
    password: string;
    passwordCfm: string;
}

export interface Response {
    code: number
    message?: string
    data?: any
}