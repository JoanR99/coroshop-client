import { useNavigate } from 'react-router-dom';
import * as Popover from '@radix-ui/react-popover';

import Button from '../../components/Button';
import { selectIsCartOpen, toggleIsCartOpen } from './cartSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { styled, keyframes } from '../../../stitches.config';
import CartIcon from './CartIcon';
import CartItems from './CartItems';

const slideUpAndFade = keyframes({
	from: {
		opacity: 0,
		transform: 'translateY(2px)',
	},
	to: {
		opacity: 1,
		transform: 'translateY(0)',
	},
});

const CartDropdownContainer = styled(Popover.Content, {
	borderTop: 'solid 1rem #a8dadc',
	borderRadius: '1rem',
	padding: '2rem',
	boxShadow: '0 1.5rem 4rem rgba(0, 0, 0, 0.2)',
	width: '30rem',
	height: '40rem',
	display: 'flex',
	flexDirection: 'column',
	backgroundColor: '$light',
	animationDuration: '400ms',
	animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
	willChange: 'transform, opacity',

	"&[data-state='open'][data-side='bottom']": {
		animationName: `${slideUpAndFade}`,
	},

	variants: {
		size: {
			small: {
				width: '25rem',
				height: '35rem',
				padding: '1rem',
			},
			normal: {
				width: '30rem',
				height: '40rem',
				padding: '2rem',
			},
		},
	},
});

const Arrow = styled(Popover.Arrow, {
	fill: '$main_light',
});

const CartIconContainer = styled('button', {
	border: 'none',
	backgroundColor: 'inherit',
	width: '30px',
	height: '30px',
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	cursor: 'pointer',

	variants: {
		size: {
			small: {
				width: '20px',
				height: '20px',
			},
			normal: {
				width: '30px',
				height: '30px',
			},
		},
	},
});

const CartDropDown = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isCartOpen = useAppSelector(selectIsCartOpen);

	const toggleCartOpen = () => dispatch(toggleIsCartOpen());

	const clickHandler = () => {
		dispatch(toggleIsCartOpen());
		navigate('/cart');
	};

	return (
		<Popover.Root open={isCartOpen} onOpenChange={toggleCartOpen}>
			<Popover.Trigger asChild>
				<CartIconContainer
					size={{
						'@initial': 'small',
						'@sm': 'normal',
					}}
				>
					<CartIcon />
				</CartIconContainer>
			</Popover.Trigger>
			<Popover.Portal>
				<CartDropdownContainer
					size={{
						'@initial': 'small',
						'@md': 'normal',
					}}
				>
					<CartItems />
					<Button
						variant="main"
						size={{
							'@initial': 'small',
							'@md': 'normal',
						}}
						fontSize="1"
						onClick={clickHandler}
					>
						GO TO CART
					</Button>
					<Arrow />
				</CartDropdownContainer>
			</Popover.Portal>
		</Popover.Root>
	);
};

export default CartDropDown;
