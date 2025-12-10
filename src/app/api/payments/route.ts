import {PaymentController} from "../../../infra/controllers/payment/PaymentController";

const paymentController = new PaymentController();

export async function POST(request: Request) {
    return paymentController.handlePayment(request);
}