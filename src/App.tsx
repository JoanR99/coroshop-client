import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Layout from './components/Layout';
import Home from './screens/Home';
import Login from './screens/Login';
import ProductScreen from './screens/ProductScreen';
import 'react-toastify/dist/ReactToastify.css';
import Register from './screens/Register';
import RequireAuth from './features/auth/RequireAuth';
import RequireAdmin from './features/auth/RequireAdmin';
import PersistLogin from './features/auth/PersistLogin';
import Users from './screens/Users';
import Unauthorized from './screens/Unauthorized';
import AllProducts from './screens/AllProducts';
import Cart from './screens/Cart';
import Shipping from './screens/Shipping';
import Payment from './screens/Payment';
import PlaceOrder from './screens/PlaceOrder';
import Order from './screens/Order';
import Profile from './screens/Profile';
import ProductList from './screens/ProductList';
import OrdersList from './screens/OrdersList';
import Admin from './screens/Admin';
import Categories from './screens/Categories';
import CategoryProducts from './screens/CategoryProducts';
import { globalStyles } from '../stitches.config';

function App() {
	globalStyles();
	return (
		<>
			<ToastContainer />
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route element={<PersistLogin />}>
						<Route index element={<Home />} />
						<Route path="/products" element={<AllProducts />} />
						<Route
							path="/products/page/:pageNumber"
							element={<AllProducts />}
						/>
						<Route path="products/:id" element={<ProductScreen />} />
						<Route path="categories" element={<Categories />} />
						<Route path="categories/:category" element={<CategoryProducts />} />
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
						<Route path="unauthorized" element={<Unauthorized />} />
						<Route path="cart" element={<Cart />} />

						<Route element={<RequireAuth />}>
							<Route path="/shipping" element={<Shipping />} />
							<Route path="/payment" element={<Payment />} />
							<Route path="/placeOrder" element={<PlaceOrder />} />
							<Route path="/order/:orderId" element={<Order />} />
							<Route path="/profile" element={<Profile />} />

							<Route path="admin" element={<RequireAdmin />}>
								<Route element={<Admin />}>
									<Route path="user-list" element={<Users />} />
									<Route path="product-list" element={<ProductList />} />
									<Route path="order-list" element={<OrdersList />} />
								</Route>
							</Route>
						</Route>
					</Route>
				</Route>
			</Routes>
		</>
	);
}

export default App;
