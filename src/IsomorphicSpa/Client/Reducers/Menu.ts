import { Reducer } from "redux";
import { IMenu } from "../Dto/IMenu";

export interface IMenuState {
	isFetching: boolean;
	isFetched: boolean;
	products: number[];
}

// Типы с discriminant или tag
interface IInitAction { type: "INIT" }

// Запрос меню
interface IMenuRequest { type: "MENU_FETCH_REQUEST" }
interface IMenuSuccess { type: "MENU_FETCH_SUCCESS", payload: IMenu }
interface IMenuFaulure { type: "MENU_FETCH_FAILURE" }

// Discriminated union или tag union
export type KnownAction =
	| IInitAction
	| IMenuRequest
	| IMenuSuccess
	| IMenuFaulure;

const defaultState = {
	isFetching: false,
	isFetched: false,
	products: []
};

export const reducer: Reducer<IMenuState> = (state: IMenuState, action: KnownAction) => {
	switch (action.type) {
		case "INIT": {
			return Object.assign({}, defaultState);
		}

		case "MENU_FETCH_REQUEST": {
			const newData = {
				isFetching: true
			};

			return Object.assign({}, defaultState, newData);
		}

		case "MENU_FETCH_FAILURE": {
			const newData = {
				isFetching: false
			};

			return Object.assign({}, defaultState, newData);
		}

		case "MENU_FETCH_SUCCESS": {
			var newData = {
				products: action.payload.data.relationships.products.data.map(x => x.id),
				isFetched: true
			};

			return Object.assign({}, defaultState, newData);
		}

		default: {
			const x: never = action;
		}
	}

	return state || Object.assign({}, defaultState);
};