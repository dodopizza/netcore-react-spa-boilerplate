import * as React from "react"
import { Provider } from "react-redux";
import Layout from "../Layout/Layout";
import { AppContainer } from "react-hot-loader";

export default (store) => (
	<AppContainer>
		<Provider store={store}>
			<Layout />
		</Provider>
	</AppContainer>
);