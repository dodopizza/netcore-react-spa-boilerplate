import { Reducer } from "redux";
import { IProduct } from "../Interfaces/IProduct";
import { IMenu } from "../Dto/IMenu";
import { IProductInclude } from "../Dto/IProductInclude";

export interface IDataState {
	products: {
		[productId: number]: IProduct;
	}
}

// Типы с discriminant или tag
interface IInitAction { type: "INIT" }

// Смежные типы событий
interface IMenuSuccess { type: "MENU_FETCH_SUCCESS", payload: IMenu }

// Discriminated union или Tag union
type KnownAction = IInitAction | IMenuSuccess;

// Default state
const defaultState = {
	products: {}
};

const mapToProduct = (pi: IProductInclude): IProduct => {
	return {
		id: pi.id,
		name: pi.attributes.name,
		description: pi.attributes.description
	}
};

export const reducer: Reducer<IDataState> = (state: IDataState, action: KnownAction) => {
	switch (action.type) {
		case "INIT": {
			return Object.assign({}, defaultState, state);
		}

		case "MENU_FETCH_SUCCESS": {
			const newData = {
				products: state.products
			};

			action.payload.included.map(x => {
				const product = mapToProduct(x);

				newData.products[x.id] = product;
			})

			return Object.assign({}, defaultState, newData);
		}

		default:
			const x: never = action;
	}

	return state || Object.assign({}, defaultState);
};