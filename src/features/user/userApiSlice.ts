import { apiSlice } from '../../app/api/apiSlice';
import {
	addUser,
	deleteUser,
	updateUser,
	updateUserProfile,
} from './userMutations';
import {
	getUser,
	getUserProfile,
	getUsers,
	getUsersCount,
} from './userQueries';
import {
	AddUserInput,
	AddUserResponse,
	UpdateUserProfileResponse,
	UpdateUserProfileInput,
	GetUserProfileResponse,
	GetUsersResponse,
	GetUsersInput,
	DeleteUserResponse,
	DeleteUserInput,
	UpdateUserInput,
	UpdateUserResponse,
	GetUserInput,
	GetUserResponse,
} from './userTypes';

const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUserProfile: builder.query<GetUserProfileResponse, null>({
			query: () => ({
				document: getUserProfile,
				variables: null,
			}),
			providesTags: ['users'],
		}),
		getUsers: builder.query<GetUsersResponse, GetUsersInput>({
			query: ({ pageSize, keyword, pageNumber }) => ({
				document: getUsers,
				variables: {
					getUsersInput: { pageSize, keyword, pageNumber },
				},
			}),
			providesTags: (_result, _error, params) => [{ type: 'users', ...params }],
		}),
		getUser: builder.query<GetUserResponse, GetUserInput>({
			query: ({ userId }) => ({
				document: getUser,
				variables: {
					userId,
				},
			}),
			providesTags: (_result, _error, params) => [{ type: 'users', ...params }],
		}),
		getUsersCount: builder.query<{ getUsersCount: number }, null>({
			query: () => ({
				document: getUsersCount,
				variables: null,
			}),
			providesTags: ['users'],
		}),
		addUser: builder.mutation<AddUserResponse, AddUserInput>({
			query: ({ name, email, password }) => ({
				document: addUser,
				variables: {
					addUserInput: {
						name,
						email,
						password,
					},
				},
			}),
			invalidatesTags: ['users'],
		}),
		updateUserProfile: builder.mutation<
			UpdateUserProfileResponse,
			UpdateUserProfileInput
		>({
			query: (updateBody) => ({
				document: updateUserProfile,
				variables: { updateBody },
			}),
			invalidatesTags: ['users'],
		}),
		deleteUser: builder.mutation<DeleteUserResponse, DeleteUserInput>({
			query: ({ userId }) => ({
				document: deleteUser,
				variables: {
					userId,
				},
			}),
			invalidatesTags: (_result, _error, params) => [
				{ type: 'users', ...params },
			],
		}),
		updateUser: builder.mutation<UpdateUserResponse, UpdateUserInput>({
			query: ({ updateBody, userId }) => ({
				document: updateUser,
				variables: {
					updateBody,
					userId,
				},
			}),
			invalidatesTags: (_result, _error, { userId }) => [
				{ type: 'users', userId },
			],
		}),
	}),
});

export const {
	useGetUserProfileQuery,
	useGetUsersQuery,
	useGetUserQuery,
	useGetUsersCountQuery,
	useAddUserMutation,
	useUpdateUserProfileMutation,
	useDeleteUserMutation,
	useUpdateUserMutation,
} = userApiSlice;
