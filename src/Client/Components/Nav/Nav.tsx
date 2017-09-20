import * as React from "react";
import Link from "redux-first-router-link";
import "./Nav.scss";

export default class Nav extends React.Component<any, any> {
	render() {
		return (
			<div className="nav">
				<div className="nav__item">
					<Link to="/">Menu</Link>
				</div>
				<div className="nav__item">
					<Link to="/checkout">Checkout</Link>
				</div>
				<div className="nav__item">
					<Link to="/order">Order</Link>
				</div>
			</div>
		);
	}
}