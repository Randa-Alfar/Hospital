export interface IUser {
    name: string,
    age: number,
    email: string,
    DOB: Date,
    password: string
}
export interface IUserSelect  {
    user_key?: string,
    name?: string,
    age?: number,
    email?: string,
    DOB?: Date
}

export interface IuserUpdate {
    key:number,
    name?: string,
    age?: number,
    email?: string,
    DOB?: Date
}

export enum EUserSelect {
    name = 'name',
    age = 'age',
    user_key = 'user_key',
    DOB = 'DOB',
    email = 'email'
}