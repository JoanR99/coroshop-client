import { Server } from 'http';
import request from 'supertest-graphql';
import app from '../app';
import server from '../config/apolloServer';
import db from './config/database';
import { getProductsQuery } from './gql/productQueries';
import { Product } from '../models/Product';
import { createUser } from './utils/authUtils';
import {
	VALID_CREDENTIALS,
	BAD_FLOAT_INPUT,
	BAD_STRING_INPUT,
} from './utils/constants';
import { createProducts } from './utils/productUtils';
import { loginMutation } from './gql/authMutations';

type GetProductsInput = {
	pageSize?: any;
	pageNumber?: any;
	keyword?: any;
};

type GetProductsResponse = {
	getProducts: {
		products: Product[];
		pages: number;
		page: number;
	};
};

const getProducts = (
	getProductsInput: GetProductsInput = {
		pageNumber: 1,
		pageSize: 10,
		keyword: '',
	},
	options: { accessToken: string }
) => {
	const agent = request(app)
		.path('/api/graphql')
		.query(getProductsQuery)
		.variables({ getProductsInput });

	if ('accessToken' in options) {
		agent.set('Authorization', `Bearer ${options.accessToken}`);
	}

	return agent;
};

type LoginInput = {
	email?: string;
	password?: string;
};

type LoginResponse = {
	login: {
		accessToken: string;
	};
};

const login = (loginInput: LoginInput = {}) =>
	request(app)
		.path('/api/graphql')
		.query(loginMutation)
		.variables({ loginInput });

let expressServer: Server;

beforeAll(async () => {
	await db.connect();
	const apolloServer = await server();

	await apolloServer.start();

	apolloServer.applyMiddleware({ app, path: '/api/graphql', cors: false });

	expressServer = app.listen(8080, () =>
		console.log('Server started at port 8080')
	);
});

afterEach(async () => await db.clear());
afterAll(async () => {
	await db.close();
	expressServer.close();
});

describe('Get Products', () => {
	describe('Fail cases', () => {
		it('should  return error message when pageSize argument is not a number', async () => {
			const user = await createUser();
			await createProducts(1, user.id, user.name);
			const loginResponse = await login(VALID_CREDENTIALS);
			const accessToken = (loginResponse.data as LoginResponse).login
				.accessToken;
			const response = await getProducts(
				{ pageNumber: 1, pageSize: '', keyword: '' },
				{ accessToken }
			);

			expect(
				response.errors
					?.map((error) => error.message)[0]
					.includes(BAD_FLOAT_INPUT)
			).toBeTruthy();
		});

		it('should  return error message when pageNumber argument is not a number', async () => {
			const user = await createUser();
			await createProducts(1, user.id, user.name);
			const loginResponse = await login(VALID_CREDENTIALS);
			const accessToken = (loginResponse.data as LoginResponse).login
				.accessToken;
			const response = await getProducts(
				{ pageNumber: '', pageSize: 1, keyword: '' },
				{ accessToken }
			);

			expect(
				response.errors
					?.map((error) => error.message)[0]
					.includes(BAD_FLOAT_INPUT)
			).toBeTruthy();
		});

		it('should  return error messages when both pageSize and pageNumber arguments are not numbers', async () => {
			const user = await createUser();
			await createProducts(1, user.id, user.name);
			const loginResponse = await login(VALID_CREDENTIALS);
			const accessToken = (loginResponse.data as LoginResponse).login
				.accessToken;
			const response = await getProducts(
				{ pageNumber: '', pageSize: '', keyword: '' },
				{ accessToken }
			);

			response.errors?.forEach((error) =>
				expect(error.message.includes(BAD_FLOAT_INPUT)).toBeTruthy()
			);
		});

		it('should  return error message when keyword argument is not a string', async () => {
			const user = await createUser();
			await createProducts(1, user.id, user.name);
			const loginResponse = await login(VALID_CREDENTIALS);
			const accessToken = (loginResponse.data as LoginResponse).login
				.accessToken;
			const response = await getProducts(
				{ pageNumber: 1, pageSize: 1, keyword: 1 },
				{ accessToken }
			);

			console.log(response.errors?.map((error) => error.message)[0]);

			expect(
				response.errors
					?.map((error) => error.message)[0]
					.includes(BAD_STRING_INPUT)
			).toBeTruthy();
		});
	});

	describe('Bad inputs returning default properties cases', () => {
		it('should return first page when pageNumber argument is below 1', async () => {
			const user = await createUser();
			await createProducts(1, user.id, user.name);
			const loginResponse = await login(VALID_CREDENTIALS);
			const accessToken = (loginResponse.data as LoginResponse).login
				.accessToken;
			const response = await getProducts(
				{ pageNumber: -5, pageSize: 1, keyword: '' },
				{ accessToken }
			);

			expect(
				(response.data as GetProductsResponse).getProducts.products.length
			).toBe(1);
			expect((response.data as GetProductsResponse).getProducts.page).toBe(1);
			expect((response.data as GetProductsResponse).getProducts.pages).toBe(1);
		});

		it('should return first page when pageNumber parameter is greater than current possible pages', async () => {
			const user = await createUser();
			await createProducts(1, user.id, user.name);
			const loginResponse = await login(VALID_CREDENTIALS);
			const accessToken = (loginResponse.data as LoginResponse).login
				.accessToken;
			const response = await getProducts(
				{ pageNumber: 2, pageSize: 1, keyword: '' },
				{ accessToken }
			);

			expect(
				(response.data as GetProductsResponse).getProducts.products.length
			).toBe(1);
			expect((response.data as GetProductsResponse).getProducts.page).toBe(1);
			expect((response.data as GetProductsResponse).getProducts.pages).toBe(1);
		});

		it('should set pageSize to 12 and return correct products and pagination data when pageSize argument is below 1', async () => {
			const user = await createUser();
			await createProducts(13, user.id, user.name);
			const loginResponse = await login(VALID_CREDENTIALS);
			const accessToken = (loginResponse.data as LoginResponse).login
				.accessToken;
			const response = await getProducts(
				{ pageNumber: 2, pageSize: 0, keyword: '' },
				{ accessToken }
			);

			expect(
				(response.data as GetProductsResponse).getProducts.products.length
			).toBe(1);
			expect((response.data as GetProductsResponse).getProducts.page).toBe(2);
			expect((response.data as GetProductsResponse).getProducts.pages).toBe(2);
		});
	});

	describe('Success cases', () => {
		it('should return page object as response body', async () => {
			const user = await createUser();
			await createProducts(1, user.id, user.name);
			const loginResponse = await login(VALID_CREDENTIALS);
			const accessToken = (loginResponse.data as LoginResponse).login
				.accessToken;
			const response = await getProducts(
				{ pageNumber: 1, pageSize: 1, keyword: '' },
				{ accessToken }
			);

			expect(
				(response.data as GetProductsResponse).getProducts.products.length
			).toBe(1);
			expect((response.data as GetProductsResponse).getProducts.page).toBe(1);
			expect((response.data as GetProductsResponse).getProducts.pages).toBe(1);
		});

		it('should return correct products and pagination data', async () => {
			const user = await createUser();
			await createProducts(11, user.id, user.name);
			const loginResponse = await login(VALID_CREDENTIALS);
			const accessToken = (loginResponse.data as LoginResponse).login
				.accessToken;
			const response = await getProducts(
				{ pageNumber: 1, pageSize: 10, keyword: '' },
				{ accessToken }
			);

			expect(
				(response.data as GetProductsResponse).getProducts.products.length
			).toBe(10);
			expect((response.data as GetProductsResponse).getProducts.page).toBe(1);
			expect((response.data as GetProductsResponse).getProducts.pages).toBe(2);
		});

		it('should return correct products and pagination data when keyword is provided', async () => {
			const user = await createUser();
			await createProducts(11, user.id, user.name);
			const loginResponse = await login(VALID_CREDENTIALS);
			const accessToken = (loginResponse.data as LoginResponse).login
				.accessToken;
			const response = await getProducts(
				{ pageNumber: 1, pageSize: 10, keyword: 'product8' },
				{ accessToken }
			);

			expect(
				(response.data as GetProductsResponse).getProducts.products.length
			).toBe(1);

			expect(
				(response.data as GetProductsResponse).getProducts.products[0].name
			).toBe('product8');
			expect((response.data as GetProductsResponse).getProducts.page).toBe(1);
			expect((response.data as GetProductsResponse).getProducts.pages).toBe(1);
		});
	});
});