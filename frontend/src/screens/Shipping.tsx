import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { shippingAddressSchema } from '../validation/shippingAddressSchema';
import {
	selectShippingAddress,
	setShippingAddress,
	ShippingAddress,
} from '../features/cart/cartSlice';
import FormInput from '../components/FormInput';
import { MainButton } from '../components/Button';
import styled from 'styled-components';
import { Container } from '../components/Container';
import { Heading3 } from '../components/Typography';

const StyledContainer = styled(Container)`
	max-width: 60rem;
	margin: auto;
	margin-top: 4rem;
	margin-bottom: 4rem;
	border-top: solid 1rem #a8dadc;
	border-radius: 1rem;
	padding: 2rem;
	box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.2);
`;

const Input = styled(FormInput)`
	width: 100%;
`;

const Shipping = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const shippingAddress = selectShippingAddress();
	const methods = useForm({
		resolver: zodResolver(shippingAddressSchema),
		defaultValues: shippingAddress,
	});

	const submitHandler = (shippingInfo: ShippingAddress) => {
		dispatch(setShippingAddress(shippingInfo));
		navigate('/payment');
	};
	return (
		<StyledContainer>
			<Heading3>Shipping Information</Heading3>
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(submitHandler)}
					noValidate
					autoComplete="off"
				>
					<Input
						type="text"
						name="address"
						id="address"
						label="Address"
						required
					/>
					<Input type="text" name="city" id="city" label="City" required />
					<Input
						type="text"
						name="postalCode"
						id="postalCode"
						label="Postal Code"
						required
					/>
					<Input
						type="text"
						name="country"
						id="country"
						label="Country"
						required
					/>

					<MainButton>GO TO PAYMENT</MainButton>
				</form>
			</FormProvider>
		</StyledContainer>
	);
};

export default Shipping;
