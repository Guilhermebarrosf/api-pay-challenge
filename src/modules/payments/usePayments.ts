import { useState } from 'react';
import { PaymentsService, PaymentRequest, PaymentResponse } from './payments.service';

export function usePaymentsController() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<PaymentResponse | null>(null);

    const [form, setForm] = useState<PaymentRequest>({
        buyerName: '',
        amount: '',
        document: '',
        description: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await PaymentsService.create(form);
            setResult(data);
        } catch (error) {
            alert((error as Error).message || 'Error processing payment.');
        } finally {
            setLoading(false);
        }
    };

    return { form, setForm, handleSubmit, loading, result };
}