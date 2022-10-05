import { Field, InputType, ObjectType } from 'type-graphql';

import { Product } from '../models/Product';

@ObjectType()
export class GetProductsResponse {
	@Field((type) => [Product])
	products: [Product];

	@Field()
	page: number;

	@Field()
	pages: number;
}

@ObjectType()
export class ProductMutationBasicResponse {
	@Field()
	message: string;
}

@InputType()
export class ProductBody {
	@Field()
	name: string;

	@Field()
	price: number;

	@Field()
	image: string;

	@Field()
	brand: string;

	@Field()
	category: string;

	@Field()
	countInStock: number;

	@Field()
	description: string;
}