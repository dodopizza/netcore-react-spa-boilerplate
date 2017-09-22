import { IProductRelationship } from "./IProductRelationship";
import { IProductInclude } from "./IProductInclude";

export interface IMenu {
	data: {
		id: number;
		type: "menu";
		relationships: {
			products: {
				data: IProductRelationship[];
			};
		};
	};
	included: IProductInclude[];
}