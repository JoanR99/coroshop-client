import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiSlice } from '../../app/api/apiSlice';

import { useAppDispatch } from '../../app/hooks';
import Button from '../../components/Button';
import { useLogoutMutation } from './authApiSlice';
import { clearCredentials } from './authSlice';

const LogoutButton = () => {
	const [logout] = useLogoutMutation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleClick = async () => {
		const id = toast.loading('Login Out...', { theme: 'light' });
		try {
			await logout(null);
			dispatch(clearCredentials());
			dispatch(apiSlice.util.resetApiState());
			localStorage.setItem('persist', JSON.stringify(false));

			toast.update(id, {
				render: 'Logout Success',
				type: 'success',
				isLoading: false,
				hideProgressBar: true,
				autoClose: 1000,
				theme: 'light',
			});
			navigate('/');
		} catch (e) {
			toast.update(id, {
				render: 'Login Fail',
				type: 'error',
				isLoading: false,
				hideProgressBar: true,
				autoClose: 1000,
				theme: 'light',
			});
		}
	};

	return (
		<Button
			variant="linkLight"
			onClick={handleClick}
			fontWeight="bold"
			fontSize={{
				'@initial': 1,
				'@sm': 2,
			}}
			size={{
				'@initial': 'small',
				'@sm': 'normal',
			}}
		>
			Logout
		</Button>
	);
};

export default LogoutButton;
