import { CounterResponse } from './counter';

interface EmergencyContact {
    name: string;
    relationship: string;
    phoneNumber: string;
}

interface InsuranceInformation {
    provider: string;
    policyNumber: string;
}

export interface CustomerResponse {
    callId: number;
    _id: string;
    name: string;
    phoneNumber: string;
    queueNumber: number;
    address: string;
    dateOfBirth: string;
    gender: string;
    emergencyContact: EmergencyContact;
    insuranceInformation: InsuranceInformation;
    medicalHistory: string;
    occupation: string;
    maritalStatus: string;
    counter: CounterResponse;
    createdAt: string;
}

export interface CustomerRequest {
    name: string;
    phoneNumber: string;
    queueNumber: number;
    address: string;
    dateOfBirth: string;
    gender: string;
    emergencyContact: EmergencyContact;
    insuranceInformation: InsuranceInformation;
    medicalHistory: string;
    occupation: string;
    maritalStatus: string;
}