export interface userLoginDto {
    email: string,
    password: string
}
export interface userRegisterDto {
    email: string;
    last_name: string,
    first_name: string,

    login: string,
    password: string
}
export interface userForgotPassword {
    email: string,
    password: string
}
export interface userTokens {
    accessToken: string,
    refreshToken: string
}