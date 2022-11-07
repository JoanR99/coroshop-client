import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import {
	addProductSchema,
	defaultValues,
} from '../validation/addProductSchema';
import FormInput from '../components/FormInput';
import { useAddProductMutation } from '../features/product/productApiSlice';
import { MarginContainer } from '../components/Container';
import { MainButton } from '../components/Button';

const AddProduct = () => {
	const navigate = useNavigate();
	const methods = useForm({
		resolver: zodResolver(addProductSchema),
		defaultValues,
	});

	const [addProduct, { isLoading }] = useAddProductMutation();

	const submitHandler = async ({
		name,
		price,
		image,
		brand,
		category,
		description,
		countInStock,
	}: {
		name: string;
		price: string;
		image: string;
		brand: string;
		category: string;
		description: string;
		countInStock: string;
	}) => {
		const id = toast.loading('Adding product...', { theme: 'dark' });
		try {
			await addProduct({
				name,
				price: Number(price),
				image,
				brand,
				category,
				description,
				countInStock: Number(countInStock),
			}).unwrap();

			toast.update(id, {
				render: 'Add product Success',
				type: 'success',
				isLoading: false,
				autoClose: 3000,
				theme: 'dark',
			});
			navigate('/products');
		} catch (e) {
			toast.update(id, {
				render: 'Add product Fail',
				type: 'error',
				isLoading: false,
				autoClose: 3000,
				theme: 'dark',
			});
			console.log(e);
		}
	};

	return (
		<MarginContainer>
			<FormProvider {...methods}>
				<h1>Add product</h1>

				<form
					onSubmit={methods.handleSubmit(submitHandler)}
					noValidate
					autoComplete="off"
				>
					<FormInput label="Name" type="text" name="name" id="name" required />
					<FormInput
						label="Price"
						type="number"
						name="price"
						id="price"
						required
					/>

					<FormInput
						label="Image url"
						type="text"
						name="image"
						id="image"
						required
					/>

					<FormInput
						label="Brand"
						type="text"
						name="brand"
						id="brand"
						required
					/>

					<FormInput
						label="Category"
						type="text"
						name="category"
						id="category"
						required
					/>

					<FormInput
						label="Description"
						type="text"
						name="description"
						id="description"
						required
					/>

					<FormInput
						label="Count in stock"
						type="number"
						name="countInStock"
						id="countInStock"
						required
					/>

					<MainButton disabled={isLoading}>Add Product</MainButton>
				</form>
			</FormProvider>
		</MarginContainer>
	);
};

export default AddProduct;