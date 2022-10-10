export interface Register {
    email: string;
    password: string;
}

export interface Response {
    code: number
    message?: string
    data?: any
}