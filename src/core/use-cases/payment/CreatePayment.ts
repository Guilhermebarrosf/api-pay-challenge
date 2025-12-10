import { CreatePaymentDTO, CustomerData } from './CreatePaymentDTO';
import { PaymentGateway } from '../../../core/ports/gateway/PaymentGateway';

interface PaymentResult {
    transactionId: string;
    status: string;
    buyer: string;
    amount: number;
    qrCodeText: string;
}

export class CreatePayment {
    constructor(private paymentGateway: PaymentGateway) {}

    async execute(data: CreatePaymentDTO): Promise<PaymentResult> {
        if (data.amount <= 0) {
            throw new Error("The amount must be greater than zero.");
        }

        const transaction = await this.paymentGateway.createTransaction(data);

        return {
            transactionId: transaction.transactionId,
            status: transaction.status,
            qrCodeText: transaction.qrCodeText,

            buyer: data.customer.name,
            amount: data.amount
        };
    }
}