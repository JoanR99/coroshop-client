export interface User {
	id: string;
	name: string;
	email: string;
	isAdmin: boolean;
}

export type AddUserInput = {
	name: string;
	email: string;
	password: string;
};

export type AddUserResponse = {
	addUser: { message: string };
};

export type UpdateUserProfileInput = AddUserInput;

export type UpdateUserProfileResponse = {
	updateUserProfile: User;
};

export type GetUserProfileResponse = {
	getUserProfile: User;
};

export type GetUsersInput = {
	pageSize: number;
	keyword: string;
	pageNumber: number;
};

export type GetUsersResponse = {
	getUsers: {
		users: User[];
		page: number;
		pages: number;
	};
};

export type DeleteUserInput = {
	userId: string;
};

export type DeleteUserResponse = {
	message: string;
};

export type UpdateUserInput = {
	updateBody: {
		name: string;
		email: string;
		isAdmin: boolean;
	};
	userId: string;
};

export type UpdateUserResponse = {
	updateUser: {
		id: string;
		name: string;
		email: string;
		isAdmin: boolean;
	};
};

export type GetUserInput = {
	userId: string;
};

export type GetUserResponse = {
	getUser: {
		id: string;
		name: string;
		email: string;
		isAdmin: boolean;
	};
};
