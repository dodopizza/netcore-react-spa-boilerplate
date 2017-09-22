import * as Menu from "../Reducers/Menu";
import * as Cart from "../Reducers/Cart";
import * as Page from "../Reducers/Page";
import * as Data from "../Reducers/Data";

export default interface IApplicationState {
	menu: Menu.IMenuState,
	cart: Cart.ICartState,
	page: Page.IPageState,
	data: Data.IDataState,
}