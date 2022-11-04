export interface SearchCriteria {
    type: string;
    width: number;
    height: number;
    search: string;
}
export interface Feedback {
    name: string;
    email: string;
    feedback: string;
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
}

export interface Response {
    message?: string;
}
