import * as React from "react";
import "./Button.scss";

export default (onClick: () => void) => {
	return (
		<button className="button" onClick={onClick}>Создать заказ</button>
	);
}