import * as React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import IApplicationState from "../../Interfaces/IApplicationState";
import { IMenuState } from "../../Reducers/Menu";
import { IDataState } from "../../Reducers/Data";
import * as Cart from "../../Reducers/Cart";
import Product from "./Product/Product";
import "./Menu.scss";

type MenuProps = {
	menu: IMenuState,
	data: IDataState,
	cartActionCreators: typeof Cart.actionCreators
}

export class Menu extends React.Component<MenuProps, {}> {
	private onClick = (id: number) => {
		this.props.cartActionCreators.add(id);
	}

	private renderProducts(menu: IMenuState, data: IDataState) {
		const products = menu.products.map(x => {
			const props = {
				product: data.products[x], 
				onClick: () => this.onClick(x)
			};

			return (
				<div className="menu__product" key={x}>
					<Product {...props} />
				</div>
			);
		});

		return (
			<div className="menu__products">
				{ products }
			</div>
		);
	}

	private renderEmptyMenuContent() {
		return (
			<div className="menu__empty">В меню пока нет продуктов :(</div>
		)
	}

	render() {
		const content = this.props.menu.isFetched
			? this.renderProducts(this.props.menu, this.props.data)
			: this.renderEmptyMenuContent();

		return (
			<div className="menu">
				<div className="menu__preloader">{ this.props.menu.isFetching ? "Загрузка" : null }</div>
				<div className="menu__content">{ content }</div>
			</div>
		);
	}
}

export default connect(
	(state: IApplicationState) => {
		return {
			menu: state.menu,
			data: state.data
		};
	},
	(dispatch: Dispatch<Cart.KnownAction>) => {
		return {
			cartActionCreators: bindActionCreators(Cart.actionCreators, dispatch)
		};
	}
)(Menu);