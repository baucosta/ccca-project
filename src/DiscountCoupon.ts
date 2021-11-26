export class DiscountCoupon {
    private code: string;
    private percent: number;

    constructor(code: string, percent: number) {
        this.code = code;
        this.percent = percent;
    }

    getPercent(): number {
        return this.percent;
    }
}