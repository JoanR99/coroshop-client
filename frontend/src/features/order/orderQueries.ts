import { gql } from 'graphql-request';

export const getOrders = gql`
	query GetOrders() {
		getProducts() {
			id
            orderBy
            createdAt
            totalPrice
            isPaid
            paidAt
            isDelivered
            deliveredAt
            createdAt
		}
	}
`;

export const getOrder = gql`
	query GetOrder($orderId: String!) {
		getOrderById(orderId: $orderId) {
			id
			orderBy
			createdAt
			totalPrice
			isPaid
			paidAt
			isDelivered
			deliveredAt
			shippingPrice
			taxPrice
			totalPrice
			paymentMethod
			shippingAddress {
				address
				city
				postalCode
				country
			}
			orderItems {
				image
				quantity
				price
				product
				productName
			}
		}
	}
`;