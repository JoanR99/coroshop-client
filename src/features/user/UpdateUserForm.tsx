import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import FormInput from '../../components/FormInput';
import { registerSchema, defaultValues } from '../../validation/registerSchema';
import {
	useGetUserProfileQuery,
	useUpdateUserProfileMutation,
} from '../user/userApiSlice';
import Button from '../../components/Button';

const UpdateUserForm = () => {
	const { data: userProfile, isLoading } = useGetUserProfileQuery(null);

	useEffect(() => {
		if (userProfile?.getUserProfile.name) {
			methods.reset({
				name: userProfile?.getUserProfile.name,
				email: userProfile?.getUserProfile.email,
			});
		}
	}, [userProfile?.getUserProfile.name]);

	const methods = useForm({
		resolver: zodResolver(registerSchema),
		defaultValues,
	});

	const [updateUserProfile, { isLoading: updateLoading }] =
		useUpdateUserProfileMutation();

	const submitHandler = async ({
		name,
		email,
		password,
	}: {
		name: string;
		email: string;
		password: string;
	}) => {
		const id = toast.loading('Updating...', { theme: 'light' });
		try {
			await updateUserProfile({ name, email, password }).unwrap();

			toast.update(id, {
				render: 'Update Profile Success',
				type: 'success',
				isLoading: false,
				hideProgressBar: true,
				autoClose: 1000,
				theme: 'light',
			});
		} catch (e) {
			toast.update(id, {
				render: 'Update Profile Fail',
				type: 'error',
				isLoading: false,
				hideProgressBar: true,
				autoClose: 1000,
				theme: 'light',
			});
		}
	};

	return isLoading ? (
		<div>Loading</div>
	) : (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(submitHandler)}
				noValidate
				autoComplete="off"
			>
				<FormInput label="Name" type="text" name="name" id="name" required />

				<FormInput
					label="Email"
					type="email"
					name="email"
					id="email"
					required
				/>
				<FormInput
					label="Password"
					type="password"
					name="password"
					id="password"
					required
				/>

				<FormInput
					label="Password confirm"
					type="password"
					name="passwordConfirm"
					id="passwordConfirm"
					required
				/>
				<Button
					variant="main"
					size={{
						'@initial': 'small',
						'@md': 'normal',
					}}
					fontSize="1"
					disabled={updateLoading}
				>
					Update Profile
				</Button>
			</form>
		</FormProvider>
	);
};

export default UpdateUserForm;
