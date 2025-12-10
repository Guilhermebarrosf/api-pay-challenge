export interface PaymentRequest {
    buyerName: string;
    amount: string;
    document: string;
    description: string;
}

export interface PaymentResponse {
    transactionId: string;
    status: string;
    buyer: string;
    amount: string;
    qrCodeText: string;
    paymentLink: string;
}

export const PaymentsService = {
    create: async (data: PaymentRequest): Promise<PaymentResponse> => {
        const res = await fetch('/api/payments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Falha ao criar transação');
        }

        return res.json();
    },
};