import * as React from "react";
import { IProduct } from "Interfaces/IProduct";
import "./Product.scss";

export interface IProductProps {
	product: IProduct;
	onClick: () => void;
}

export default class Product extends React.Component<IProductProps, {}> {
	render() {
		return (
			<div className="product" onClick={this.props.onClick}>
				<div className="product__name">{this.props.product.name}</div>
				<div className="product__description">{this.props.product.description}</div>
			</div>
		);
	}
}