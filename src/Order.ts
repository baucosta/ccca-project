import CpfValidator from "./CpfValidator";
import { DiscountCoupon } from "./DiscountCoupon";
import { OrderItem } from "./OrderItem";

export class Order {
    private items: OrderItem[];

    constructor() {
        this.items = [];
    }

    addItem(item: OrderItem) {
        this.items.push(item);
    }

    send(cpf: string, coupon: DiscountCoupon): number {
        let cpfValidator = new CpfValidator(cpf);

        if (!cpfValidator.validate()) return 0;
        return this.total(coupon);
    }

    total(coupon: DiscountCoupon): number {
        const totalSum = this.items.reduce((acumulador, currentValue) => {
            return acumulador + (currentValue.getQuantity() * currentValue.getPrice());
        }, 0);
        if (coupon.getPercent() > 0) return totalSum - (totalSum * coupon.getPercent()) / 100;

        return totalSum;
    }
}