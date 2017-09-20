import { Reducer } from "redux";
import { ICart } from "../Interfaces/ICart";
import { IOrder } from "../Interfaces/IOrder";

export interface IOrderState {
	[orderId: string]: IOrder;
}

// Типы с discriminant или tag
interface IInitAction { type: "INIT" }

// Discriminated union или Tag union
type KnownAction = IInitAction;

const defaultState = {}

export const reducer: Reducer<IOrderState> = (state: IOrderState, action: KnownAction) => {
	switch (action.type) {
		case "INIT":
			return Object.assign({}, defaultState, state);
	}

	return state || Object.assign({}, defaultState) as IOrderState;
};