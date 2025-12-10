export interface PaymentProps {
    id: string;
    buyerName: string;
    value: number;
    document: string;
    description: string;
    createdAt: Date;
}
export class Payment {
    private props: PaymentProps;

    constructor(props: PaymentProps) {
        this.props = props;
    }

    get id() { return this.props.id; }
    get buyerName() { return this.props.buyerName; }
    get value() { return this.props.value; }
    get document() { return this.props.document; }
    get description() { return this.props.description; }
    get createdAt() { return this.props.createdAt; }
}