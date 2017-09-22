import * as Menu from "./Actions/Menu";
import timeout from "./Utils/Timeout";

export default { 
	MENU: {
		path: '/',
		thunk: async (dispatch, getState) => {
			console.log("TEST ROUTE")
			await Menu.get(dispatch, getState);
		}
	},
	CHECKOUT: {
		path: '/checkout',
		thunk: async (dispatch, getState) => {
			console.log("before");
			await timeout(10000);
			console.log("after");
		}
	},
	ORDER: {
		path: '/order',
		thunk: async (dispatch, getState) => {
			console.log("before");
			await timeout(10000);
			console.log("after");
		}
	}
};