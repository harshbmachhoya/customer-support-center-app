export interface IUser {
    _id: string;
    fullName: string;
    email: string;
    password: string;
    role: { _id: string; name: string }
}

export interface IRoles {
    _id: string;
    name: string;
}

export interface ILogin {
    email: string;
    password: string;
}

