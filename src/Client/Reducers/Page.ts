import { Reducer } from "redux";

export type IPageState = Page;

// Типы с discriminant или tag
interface IMenuAction { type: "MENU" }
interface ICheckoutAction { type: "CHECKOUT" }
interface IOrderAction { type: "ORDER" }

// Discriminated union или Tag union
type KnownAction = IMenuAction | ICheckoutAction | IOrderAction;

// Типы с discriminant или tag
type Page = "Menu" | "Checkout" | "Order";

export const reducer: Reducer<IPageState> = (state: IPageState, action: KnownAction) => {
	switch (action.type) {
		case "MENU":
			return "Menu";
		case "CHECKOUT":
			return "Checkout";
		case "ORDER":
			return "Order";
		default:
		// Исчерпывающая проверка исключает необработанные кейсы
		const exhaustiveCheck: never = action;
	}

	return state || "Menu";
};
