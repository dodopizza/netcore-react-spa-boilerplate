import * as React from "react";
import { renderToString } from "react-dom/server";
import { createServerRenderer, RenderResult } from "aspnet-prerendering";
import axios from 'axios';
import createHistory from 'history/createMemoryHistory'

import configureStore from "./configureStore";
import App from "./Components/App/App";

export default createServerRenderer(params => {
	axios.defaults.baseURL = params.origin;

	return new Promise<RenderResult>(async (resolve, reject) => {
		// Статическая история из одного урла
		const history = createHistory({ initialEntries: [params.location.path] })

		// Подготавливаем стор с историей в памяти и бросаем эвент навигации
		const { store, thunk } = configureStore(history);
		
		// Запускаем приложение, что в свою очередь запускает выполнение асинхронных тасок
		const app = App(store);

		try {
			// Ждём завершения роут-санка
			await thunk(store)

			// Возвращаем результат
			resolve({
				html: renderToString(app),
				globals: { initialReduxState: store.getState() }
			});
		} catch (error) {
			// Выбрасываем ошибку обратно
			reject(error);
		}
	});
});