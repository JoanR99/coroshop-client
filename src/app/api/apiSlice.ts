import { createApi } from '@reduxjs/toolkit/query/react';
import {
	GraphQLClient,
	ClientError,
} from '@rtk-query/graphql-request-base-query/node_modules/graphql-request/dist/index';
import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { RootState } from '../store';
import {
	clearCredentials,
	setCredentials,
} from '../../features/auth/authSlice';
import getNewAccessToken from '../../features/auth/getNewAccessToken';

const serverURL = import.meta.env.VITE_SERVER_URL
	? import.meta.env.VITE_SERVER_URL + '/api/graphql'
	: '/api/graphql';

const client = new GraphQLClient(serverURL, {
	credentials: 'include',
});

const baseQuery = graphqlRequestBaseQuery({
	client,
	prepareHeaders: (headers, { getState }) => {
		const state = getState as () => RootState;
		const accessToken = state().auth?.accessToken;
		if (accessToken) {
			headers.set('authorization', `Bearer ${accessToken}`);
		}
		return headers;
	},
});

const baseQueryWithReAuth = async (
	args: { document: string; variables: any },
	api: BaseQueryApi,
	extraOptions: Partial<Pick<ClientError, 'request' | 'response'>>
) => {
	let result = await baseQuery(args, api, extraOptions);

	if (result?.error?.message?.includes('Forbidden resource')) {
		const accessToken = await getNewAccessToken();

		if (accessToken) {
			api.dispatch(setCredentials({ accessToken }));

			result = await baseQuery(args, api, extraOptions);
		} else {
			api.dispatch(clearCredentials());
		}
	}

	return result;
};

export const apiSlice = createApi({
	baseQuery: baseQueryWithReAuth,
	tagTypes: ['products', 'reviews', 'orders', 'users'],
	endpoints: () => ({}),
});
