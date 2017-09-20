import { Reducer } from "redux";
import { ICart } from "../Interfaces/ICart";

export interface ICartState extends ICart {}

// Типы с discriminant или tag
interface IAddProductAction { type: "ADD_PRODUCT", payload: number }
interface IRemoveProductAction { type: "REMOVE_PRODUCT", payload: number }

// Discriminated union или Tag union
export type KnownAction = IAddProductAction | IRemoveProductAction;

export const actionCreators = {
	add: (id: number) => <IAddProductAction>{ type: "ADD_PRODUCT", payload: id },
	remove: (id: number) => <IRemoveProductAction>{ type: "REMOVE_PRODUCT", payload: id }
}

export const defaultState = {
	products: {}
}

export const reducer: Reducer<ICartState> = (state: ICartState, action: KnownAction) => {
	switch (action.type) {
		case "ADD_PRODUCT": {
			const newState = Object.assign({}, defaultState, state)
			if (!newState.products[action.payload]) {
				newState.products[action.payload] = 0
			}
			newState.products[action.payload] += 1;
			return newState;
		}

		case "REMOVE_PRODUCT": {
			const newState = Object.assign({}, defaultState, state)
			if (newState.products[action.payload] > 0) {
				newState.products[action.payload] -= 1;
			}
			return newState;
		}
		
		default:
		// Исчерпывающая проверка исключает необработанные кейсы
		const exhaustiveCheck: never = action;
	}

	return state || Object.assign({}, defaultState);
};
