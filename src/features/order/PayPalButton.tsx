import { PayPalButtons } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';

import { useUpdateOrderToPaidMutation } from './orderApiSlice';
import { Order, PaymentResult } from './orderTypes';

type Props = {
	order: Order;
};

const PayPalButton = ({ order }: Props) => {
	const [updateIsPaid] = useUpdateOrderToPaidMutation();

	const handleApprove = async (paymentResult: PaymentResult) => {
		await updateIsPaid({
			orderId: order.id,
			paymentResultBody: paymentResult,
		}).unwrap();
		toast.success('Payment success', {
			hideProgressBar: true,
			autoClose: 1000,
		});
	};

	return (
		<PayPalButtons
			style={{
				color: 'blue',
				layout: 'horizontal',
				label: 'pay',
			}}
			createOrder={(data, actions) => {
				return actions.order.create({
					purchase_units: [
						{
							amount: {
								value: String(order.totalPrice),
							},
						},
					],
				});
			}}
			onApprove={async (data, actions) => {
				const order = await actions.order?.capture();
				const paymentResult = {
					id: order!.id,
					status: order!.status,
					update_time: order!.update_time,
					email_address: order!.payer.email_address!,
				};

				handleApprove(paymentResult);
			}}
			onError={(err) => {
				toast.error('Something went wrong with the payment', {
					hideProgressBar: true,
					autoClose: 1000,
				});
			}}
			onCancel={() => {
				toast.error('Payment canceled', {
					hideProgressBar: true,
					autoClose: 1000,
				});
			}}
		/>
	);
};

export default PayPalButton;
