export interface IRole {
    key?: React.Key;
    id?: number,
    name: string,
    description: string
}

export interface IRoleLable {
    staff: string,
    stocker: string
}

export interface ILoginData {
    username: string,
    password: string
}