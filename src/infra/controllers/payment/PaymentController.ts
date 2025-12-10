import { CreatePayment } from '../../../core/use-cases/payment//CreatePayment';
import { CreatePaymentDTO } from '../../../core/use-cases/payment/CreatePaymentDTO';
import { NextResponse } from 'next/server';
import { PPaymentGateway } from '../../gateways/PaymentGateway';

const pPaymentGateway = new PPaymentGateway();
const createPaymentUseCase = new CreatePayment(pPaymentGateway);

export class PaymentController {
    async handlePayment(request: Request) {
        try {
            const body = await request.json();

            const paymentData: CreatePaymentDTO = {
                customer: {
                    name: body.buyerName,
                    document: body.document,
                    email: 'pagador@sistema.com',
                    phone: '11999999999'
                },
                amount: Number(body.amount),
                description: body.description,
            };

            const result = await createPaymentUseCase.execute(paymentData);

            return NextResponse.json({
                transactionId: result.transactionId,
                status: result.status,
                qrCodeText: result.qrCodeText,
                buyer: result.buyer,
                amount: result.amount
            }, { status: 201 });

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro desconhecido ao processar pagamento.";
            return NextResponse.json({ error: errorMessage }, { status: 400 });
        }
    }
}