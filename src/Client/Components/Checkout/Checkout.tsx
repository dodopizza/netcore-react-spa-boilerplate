import * as React from "react";
import Input from "./Input/Input";
import Button from "./Button/Button";
import "./Checkout.scss";

export class Checkout extends React.Component<{}, {}> {
	onInput = () => {

	}

	onClick = () => {

	}

	render() {
		const input = Input(this.onInput);
		const button = Button(this.onClick);

		return (
			<div className="checkout">
				<div className="checkout__form">
					<div className="checkout__form-label">Введите имя:</div>
					<div className="checkout__form-input">
						{ input }
					</div>
				</div>
				<div className="checkout__form-button">
					{ button }
				</div>
			</div>
		);
	}
}