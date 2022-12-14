import { gql } from 'graphql-request';

export const getUserProfile = gql`
	query GetUserProfile {
		getUserProfile {
			id
			name
			email
			isAdmin
		}
	}
`;

export const getUsers = gql`
	query getUsers($getUsersInput: GetItemsInput!) {
		getUsers(getUsersInput: $getUsersInput) {
			users {
				id
				name
				email
				isAdmin
			}
			page
			pages
		}
	}
`;

export const getUser = gql`
	query GetUser($userId: String!) {
		getUser(userId: $userId) {
			id
			name
			email
			isAdmin
		}
	}
`;

export const getUsersCount = gql`
	query GetUsersCount {
		getUsersCount
	}
`;
