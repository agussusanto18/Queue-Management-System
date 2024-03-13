export interface CounterResponse {
    _id: string;
    name: string;
    available: boolean;
    totalVisitor: number;
    createdAt: string
}

export interface CounterRequest {
    name: string;
    available: boolean;
}