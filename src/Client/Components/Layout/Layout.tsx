import * as React from "react";
import Nav from "../Nav/Nav";

import { connect } from "react-redux";
import Menu from "../Menu/Menu";
import { Order } from "../Order/Order";
import { Checkout } from "../Checkout/Checkout";
import * as Page from "../../Reducers/Page";
import IApplicationState from "../../Interfaces/IApplicationState";

import './Layout.scss';

type LayoutProps = {
	page: Page.IPageState
}

class Layout extends React.Component<LayoutProps, {}> {
	
	private renderContent(page: Page.IPageState) {
		switch (page) {
			case "Menu": return <Menu />;
			case "Checkout": return <Checkout />;
			case "Order": return <Order />;
			default: const exhaustiveCheck: never = page;
		}
	}

	render() {
		return (
			<div className="layout">
				<div className="layout__header">
					<Nav />
				</div>
				<div className="layout__body">
					{ this.renderContent(this.props.page) }
				</div>
			</div>
		);
	}
}

export default connect(
	(state: IApplicationState) => {
		return {
			page: state.page
		};
	}
)(Layout);