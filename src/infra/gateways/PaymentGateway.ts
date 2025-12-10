import { PaymentGateway } from '../../core/ports/gateway/PaymentGateway';
import { CreatePaymentDTO } from '../../core/use-cases/payment/CreatePaymentDTO';

export class PPaymentGateway implements PaymentGateway {

    private PAYEVO_API_URL = 'https://apiv2.payevo.com.br/functions/v1/transactions';
    private PAYEVO_API_KEY = process.env.PAYEVO_SECRET_KEY;

    async createTransaction(data: CreatePaymentDTO) {
        if (!this.PAYEVO_API_KEY) {
            throw new Error("PayEvo Secret key is not configured.");
        }

        const amountInCents = data.amount * 100;

        const payload = {
            amount: amountInCents,
            paymentMethod: "PIX",
            customer: {
                name: data.customer.name,
                email: data.customer.email,
                phone: data.customer.phone,
                document: {
                    type: "CPF",
                    number: data.customer.document.replace(/\D/g, '')
                }
            },
            items: [{
                title: data.description,
                quantity: 1,
                unitPrice: amountInCents,
                externalRef: "PRODUTO0001"
            }],
            description: data.description,
        };
        const response = await fetch(this.PAYEVO_API_URL, {
            method: 'POST',
            headers: {
                'authorization':
                    `Basic ${Buffer.from("sk_like_vieVlMQyM4gu6IoFeQ6rl8T2ofFXMPdL5AleiuFgajaNWbJv").toString("base64")}`
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (!response.ok) {
            console.error('Api Payevo Error', result);
        }

        return {
            transactionId: result.id,
            status: result.status,
            qrCodeText: result.pix?.payload || result.pix?.qrcode || 'Pix Code not found',
        };
    }
}