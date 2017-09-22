import * as Menu from "./Reducers/Menu";
import * as Cart from "./Reducers/Cart";
import * as Page from "./Reducers/Page";
import * as Data from "./Reducers/Data";

// Когда будет задиспатчен экшен, редукс обновит каждое свойство стейта высшего уровня
// вызвав соответствующий редюсер, важно, чтобы имена совпадали
export default {
	menu: Menu.reducer,
	cart: Cart.reducer,
	page: Page.reducer,
	data: Data.reducer
}