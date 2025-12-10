export interface CustomerData {
    name: string;
    email: string;
    phone: string;
    document: string;
}

export interface CreatePaymentDTO {
    customer: CustomerData;
    amount: number;
    description: string;
}