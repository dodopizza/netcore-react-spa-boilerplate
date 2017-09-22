import * as React from "react";
import * as ReactDOM from "react-dom";

import createHistory from 'history/createBrowserHistory';

import IApplicationState from "./Interfaces/IApplicationState";
import configureStore from "./configureStore";

import App from "./Components/App/App";

// Получить начальный стейт приложения (с бэкенда)
const initialState = (window as any).initialReduxState as IApplicationState;

// Браузерная навигация
const history = createHistory();

// Создать стор
const { store, thunk } = configureStore(history, initialState);

// App
const renderApp = (App) => ReactDOM.render(App(store), document.getElementById("react-app"));

// Стартовый код react-приложения
renderApp(App);

// Enable Webpack hot module replacement for reducers
if (module.hot) {
	module.hot.accept("./Components/App/App", () => {
		renderApp(App);
	});
}