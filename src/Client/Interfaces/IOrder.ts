import { ICart } from "./ICart";

export interface IOrder {
	id: number;
	cart: ICart;
}