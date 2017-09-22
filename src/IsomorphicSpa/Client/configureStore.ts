import { createStore, applyMiddleware, compose, combineReducers, Store, ReducersMapObject, Reducer, GenericStoreEnhancer, StoreEnhancerStoreCreator } from "redux";
import { connectRoutes, LocationState } from 'redux-first-router';
import { History } from 'history';

import reducers from "./reducers";
import routes from "./routes";
import { isServer } from "./Utils/Common";

import IApplicationState from "./Interfaces/IApplicationState";

export default (history: History, initialState?: IApplicationState) => {
	// Роутер
	const { reducer, middleware, enhancer, thunk } = connectRoutes(history, routes)

	// Корневой редюсер
	const rootReducer = buildRootReducer(reducers, reducer);

	// Мидлвейры
	const middlewares = applyMiddleware(middleware)

	// Дев-тулз
	const devToolsMiddleware = buildDevToolsMiddleware();

	// Энхэнсеры
	const enhancers = compose(enhancer, middlewares, devToolsMiddleware)

	// Создаём стор
	const store = createStore(rootReducer, initialState, enhancers)

	// Enable Webpack hot module replacement for reducers
	if (module.hot) {
		module.hot.accept('./reducers', () => {
			const nextRootReducer = require<typeof reducers>('./reducers');
			store.replaceReducer(buildRootReducer(reducers, reducer));
		});
	}

	// Стор и Санк
	return { store, thunk };
}

const buildRootReducer = (reducers: ReducersMapObject, routerReducer: Reducer<LocationState>) => {
	return combineReducers({...reducers, location: routerReducer });
}

const buildDevToolsMiddleware = () => {
	const windowIfDefined = isServer() ? null : window as any;
	const devToolsExtension = windowIfDefined && windowIfDefined.devToolsExtension as () => GenericStoreEnhancer;
	const devToolsMiddleware = devToolsExtension ? devToolsExtension() : <S>(next: StoreEnhancerStoreCreator<S>) => next;
	return devToolsMiddleware;
}