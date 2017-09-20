import { AxiosResponse } from "axios";

import IAppThunkAction from "../Interfaces/IAppThunkAction";
import { KnownAction } from "../Reducers/Menu";

import * as Menu from "../Api/Menu";

export const get = ((): IAppThunkAction<KnownAction> => async (dispatch, getState) => {
	const state = getState();

	const isFetching = state.menu.isFetching;
	const isFetched = state.menu.isFetched;

	if (isFetching) return;
	if (isFetched) return;

	dispatch({ type: "MENU_FETCH_REQUEST" })

	let response: AxiosResponse;

	try {
		response = await Menu.get()
	} catch (error) {
		console.log(error);
		dispatch({ type: "MENU_FETCH_FAILURE" })
		return;
	}

	dispatch({ type: "MENU_FETCH_SUCCESS", payload: response.data })
})()