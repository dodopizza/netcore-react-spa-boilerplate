export interface IProductInclude {
	id: number;
	type: "product";
	attributes: {
		name: string;
		description: string;
	}
}