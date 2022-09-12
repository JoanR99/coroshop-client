import { useParams } from 'react-router-dom';
import ProductView from '../features/product/ProductView';
import ReviewList from '../features/review/ReviewList';
import AddReview from '../features/review/AddReview';
import { useSelector } from 'react-redux';
import { selectCurrentAccessToken } from '../features/auth/authSlice';
import { Container } from '../components/Container';

const ProductScreen = () => {
	const { id } = useParams();
	const accessToken = useSelector(selectCurrentAccessToken);

	return (
		<Container>
			<ProductView productId={id!} />
			{accessToken && <AddReview productId={id!} />}
			<ReviewList productId={id!} />
		</Container>
	);
};

export default ProductScreen;
