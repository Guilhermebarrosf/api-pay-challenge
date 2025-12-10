import { CreatePaymentDTO } from '../../use-cases/payment/CreatePaymentDTO';

export interface PaymentGateway {
    createTransaction(data: CreatePaymentDTO): Promise<{
        transactionId: string;
        status: string;
        qrCodeText: string;
    }>;
}