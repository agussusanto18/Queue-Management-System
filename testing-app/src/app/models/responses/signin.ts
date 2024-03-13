export interface SignInResponse {
    token: string;
}

export interface SignInRequest {
    email: string;
    password: string;
}