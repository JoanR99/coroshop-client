import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { MainButton } from '../../components/Button';
import ItemOnCart from './ItemOnCart';
import { selectCartItems, toggleIsCartOpen } from './cartSlice';
import { StyledContainer } from '../../components/Container';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const CartDropdownContainer = styled(StyledContainer)`
	position: absolute;
	width: 30rem;
	height: 40rem;
	display: flex;
	flex-direction: column;
	background-color: white;
	top: 90px;
	right: 40px;
	z-index: 5;
`;

const CartItems = styled.div`
	height: 35rem;
	display: flex;
	flex-direction: column;
	overflow: scroll;
`;

const CartDropDown = () => {
	const cartItems = useAppSelector(selectCartItems);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const clickHandler = () => {
		dispatch(toggleIsCartOpen());
		navigate('/cart');
	};

	return (
		<CartDropdownContainer>
			<CartItems>
				{cartItems.map((cartItem) => (
					<ItemOnCart key={cartItem.id} cartItem={cartItem} />
				))}
			</CartItems>

			<MainButton onClick={clickHandler}>GO TO CART</MainButton>
		</CartDropdownContainer>
	);
};

export default CartDropDown;
