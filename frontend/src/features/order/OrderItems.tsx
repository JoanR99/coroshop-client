import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { GhostButton } from '../../components/Button';
import { StyledLinkDark4 } from '../../components/StyledLink';
import { Paragraph } from '../../components/Typography';
import { CartItem } from '../cart/cartTypes';
import { OrderItem } from './orderTypes';

type Props = {
	cartItem: CartItem | OrderItem;
};

const CartItemContainer = styled.div`
	width: 100%;
	display: flex;
	height: 8rem;
	margin-bottom: 1.5rem;
	align-items: center;
	justify-content: space-between;
`;

const ItemImage = styled.img`
	width: 30%;
`;

const ItemColum = styled.div`
	display: flex;
	align-items: center;
	column-gap: 1rem;
	width: 50%;
`;

const PriceColumn = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 25%;
`;

const OrderItems = ({ cartItem }: Props) => {
	const { image, quantity, price } = cartItem;

	let id, name;

	if ('id' in cartItem) {
		id = cartItem.id;
	} else {
		id = cartItem.product;
	}

	if ('name' in cartItem) {
		name = cartItem.name;
	} else {
		name = cartItem.productName;
	}

	return (
		<CartItemContainer>
			<ItemColum>
				<ItemImage src={image} alt={name} />
				<StyledLinkDark4 to={`/products/${id}`}>{name}</StyledLinkDark4>
			</ItemColum>

			<PriceColumn>
				<Paragraph>
					{quantity} x ${price} = ${quantity * price}
				</Paragraph>
			</PriceColumn>
		</CartItemContainer>
	);
};

export default OrderItems;