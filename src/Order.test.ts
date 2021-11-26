import { DiscountCoupon } from "./DiscountCoupon";
import { Order } from "./Order";
import { OrderItem } from "./OrderItem";    

test("Shouldn't make an order with invalid cpf", function () {
    const order = new Order();
    const discountCoupon = new DiscountCoupon ('', 0);
    const orderItem = new OrderItem('Item 1', 2, 12.40);

    order.addItem(orderItem);
    expect(order.send('123.456.789-10', discountCoupon)).toBeFalsy();
});

test("Should make an order with three items", function () {
    const order = new Order();
    const discountCoupon = new DiscountCoupon ('', 0);

    for(let itemNumber=1; itemNumber <= 3; itemNumber++) {
        order.addItem(new OrderItem('Item ' + itemNumber, itemNumber, 10.00));
    }
    expect(order.send('713.683.110-59', discountCoupon)).toEqual(60);
});
   
test("Should make an order with discount coupon", function () {
    const order = new Order();
    const discountCoupon = new DiscountCoupon ('blackfriday', 10);

    for(let itemNumber=1; itemNumber <= 3; itemNumber++) {
        order.addItem(new OrderItem('Item ' + itemNumber, itemNumber, 10.00));
    }
    expect(order.send('713.683.110-59', discountCoupon)).toEqual(54);
});