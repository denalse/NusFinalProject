export interface Register {
    id?: number;
    email: string;
    password: string;
    // passwordCfm: string;
    terms: boolean;
}

export interface Login {
    id?: number;
    email: string;
    password: string;
}

export interface Response {
    code: number;
    message?: string;
    data?: any;
}
export interface SearchCriteria {
	type: string;
	width: number;
	height: number;
	search: string;
}