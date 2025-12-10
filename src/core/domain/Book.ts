export interface BookProps {
    id?: string;
    title: string;
    author: string;
    publishedAt: number;
}
export class BookEntity {
    private props: BookProps;

    constructor(props: BookProps) {
        this.props = props;
    }

    get id() { return this.props.id; }
    get title() { return this.props.title; }
    get author() { return this.props.author; }
    get publishedAt() { return this.props.publishedAt; }

    toJSON() {
        return {
            id: this.props.id,
            title: this.props.title,
            author: this.props.author,
            publishedAt: this.props.publishedAt,
        };
    }
}