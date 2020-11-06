export default class Grocery {
    name: string;
    quantity: number;
    pricePerUnit: number;

    constructor(name: string, quantity: number, price: number) {
        this.name = name;
        this.quantity = quantity;
        this.pricePerUnit = price;
    }

    getTotalPrice() {
        return this.quantity * this.pricePerUnit;
    }

    toString() {
        return (
            `Product: ${this.name}, `                +
            `Quantity: ${this.quantity}, `           +
            `Price Per Unit: ${this.pricePerUnit}, ` +
            `Total Price: ${this.getTotalPrice()}`
        );
    }

    toJSON() {
        return {
            name: this.name,
            quantity: this.quantity,
            pricePerUnit: this.pricePerUnit,
            totalPrice: this.getTotalPrice()
        }
    }
}