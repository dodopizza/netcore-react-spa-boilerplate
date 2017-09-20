import IApplicationState from "./IApplicationState";

// Тип для удобства создания экшен-креэйторов
export default interface IAppThunkAction<TAction> {
	(dispatch: (action: TAction) => void, getState: () => IApplicationState): void;
}