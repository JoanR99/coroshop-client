import { ApolloError } from 'apollo-server-express';

export class NotFound extends ApolloError {
	constructor(message: string) {
		super(message, '404');

		Object.defineProperty(this, 'name', { value: 'MyError' });
	}
}
