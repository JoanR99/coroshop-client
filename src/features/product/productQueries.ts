import { gql } from 'graphql-request';

export const getProducts = gql`
	query GetProducts($getProductsInput: GetProductsInput!) {
		getProducts(getProductsInput: $getProductsInput) {
			page
			pages
			products {
				id
				name
				image
				rating
				price
				category
				brand
			}
		}
	}
`;

export const getProductsOverviewList = gql`
	query GetProducts($getProductsInput: GetProductsInput!) {
		getProducts(getProductsInput: $getProductsInput) {
			page
			pages
			products {
				id
				name
				image
				rating
				price
			}
		}
	}
`;

export const getProductsGroupedByCategory = gql`
	query GetProducts {
		getProductsGroupedByCategory {
			category
			products {
				id
				name
				image
				rating
				price
			}
		}
	}
`;

export const getProduct = gql`
	query GetProduct($productId: String!) {
		getProduct(productId: $productId) {
			id
			name
			image
			category
			description
			rating
			numReviews
			price
			countInStock
			brand
			similarProducts {
				id
				name
				price
				image
				rating
			}
			reviews {
				id
				rating
				comment
				author
				authorName
				createdAt
				product
			}
		}
	}
`;

export const getProductInfo = gql`
	query GetProductInfo($productId: String!) {
		getProductInfo(productId: $productId) {
			id
			name
			image
			brand
			category
			description
			rating
			numReviews
			price
			countInStock
		}
	}
`;

export const getProductsCount = gql`
	query GetProductsCount {
		getProductsCount
	}
`;
