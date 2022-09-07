import { Prop, Ref, getModelForClass } from '@typegoose/typegoose';
import { Field as GqlField, ObjectType as GqlType } from 'type-graphql';

import { User } from './User';

@GqlType()
export class Product {
	@GqlField((_type) => String)
	id: string;

	@GqlField((_type) => String)
	@Prop({ required: true, ref: () => User })
	public createdBy!: Ref<User>;

	@GqlField((_type) => String)
	@Prop({ required: true })
	public name!: string;

	@GqlField((_type) => String)
	@Prop({ required: true })
	public image!: string;

	@GqlField((_type) => String)
	@Prop({ required: true })
	public brand!: string;

	@GqlField((_type) => String)
	@Prop({ required: true })
	public category!: string;

	@GqlField((_type) => String)
	@Prop({ required: true })
	public description!: string;

	@GqlField((_type) => Number)
	@Prop({ required: true, default: 0 })
	public rating!: number;

	@GqlField((_type) => Number)
	@Prop({ required: true, default: 0 })
	public numReviews!: number;

	@GqlField((_type) => Number)
	@Prop({ required: true, default: 0 })
	public price!: number;

	@GqlField((_type) => Number)
	@Prop({ required: true, default: 0 })
	public countInStock!: number;
}

const ProductModel = getModelForClass(Product);

export default ProductModel;
