
export class OrderItem {
    private description: string;
    private price: number;
    private quantity: number;

    constructor(description: string, quantity: number, price: number) {
        this.description = description;
        this.price = price;
        this.quantity = quantity;
    }

    getPrice(): number {
        return this.price;
    }

    getQuantity(): number {
        return this.quantity;
    }
}