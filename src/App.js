import {ThemeProvider} from "styled-components";
import {theme} from "./styles/theme";
import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import {Suspense, useEffect} from "react";
import {Loader} from "./components/Loader/Loader";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import SearchPage from "./pages/SearchPage/SearchPage";
import ForgottenPage from "./pages/ForgottenPage/ForgottenPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import DiscountPage from "./pages/DiscountPage/DiscountPage";
import NewPage from "./pages/NewPage/NewPage";
import AllBrandsPage from "./pages/AllBrandsPage/AllBrandsPage";
import BrandPage from "./pages/BrandPage/BrandPage";
import NoProducts from "./pages/NoProducts/NoProducts";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import {useMedia} from "./utils/hooks/useMedia";
import AdminPage from "./pages/AdminPage/AdminPage";
import {PrivateRoute, PrivateAdminRoute} from "./modules/PrivateRoutes/PrivateRoutes";
import CooperationPage from "./pages/CooperationPage/CooperationPage";
import UserPage from "./pages/UserPage/UserPage";
import SharedLayoutWithoutFooter from "./components/SharedLayoutWithoutFooter/SharedLayoutWithoutFooter";
import AuthorizationPage from "./pages/Authorization/AuthorizationPage";
import RegisterOptCabinetPage from "./pages/Authorization/SubPages/RegisterOptCabinetPage";
import RegisterPersonalCabinetPage from "./pages/Authorization/SubPages/RegisterPersonalCabinetPage";
import {useDispatch} from "react-redux";
import {refreshUser} from "./redux/auth/operation";
import ForgotPasswordPage from "./pages/Authorization/SubPages/ForgotPasswordPage";
import AboutUsPageMobile from "./pages/AboutUsPage/AboutUsPageMobile";
import CartPage from "./pages/CartPage/CartPage";
import OrderPlacementPage from "./pages/OrderPlacementPage/OrderPlacementPage";

function App() {
	const {isMobileScreen} = useMedia();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(refreshUser());
	}, [dispatch]);
	return (
		<ThemeProvider theme={theme}>
			<Routes>
				<Route path="*" element={<NotFoundPage/>}/>

				<Route
					path="/"
					element={
						<Suspense fallback={<Loader/>}>
							<SharedLayout/>
						</Suspense>
					}
				>
					<Route
						path="cooperation"
						element={
							<Suspense fallback={<Loader/>}>
								<CooperationPage/>
							</Suspense>
						}
					/>
					<Route
						index
						element={
							<Suspense fallback={<Loader/>}>
								<HomePage/>
							</Suspense>
						}
					/>
					<Route
						path="forgotten"
						element={
							<Suspense fallback={<Loader/>}>
								<ForgottenPage/>
							</Suspense>
						}
					/>
					<Route
						path="forgotten/:forgottenCode"
						element={
							<Suspense fallback={<Loader/>}>
								<ForgottenPage/>
							</Suspense>
						}
					/>
					<Route
						path="katehoriji"
						element={
							<Suspense fallback={<Loader/>}>
								<CategoryPage/>
							</Suspense>
						}
					/>
					<Route
						path="katehoriji/:katehorii"
						element={
							<Suspense fallback={<Loader/>}>
								<CategoryPage/>
							</Suspense>
						}
					></Route>
					<Route
						path="katehoriji/:katehorii/:katehorii"
						element={
							<Suspense fallback={<Loader/>}>
								<CategoryPage/>
							</Suspense>
						}
					/>
					<Route
						path="katehoriji/:katehorii/:katehorii/:katehorii"
						element={
							<Suspense fallback={<Loader/>}>
								<CategoryPage/>
							</Suspense>
						}
					/>
					<Route
						path="brands"
						element={
							<Suspense fallback={<Loader/>}>
								<AllBrandsPage/>
							</Suspense>
						}
					/>
					<Route
						path="brands/:brands"
						element={
							<Suspense fallback={<Loader/>}>
								<BrandPage/>
							</Suspense>
						}
					/>
					<Route
						path="novynky"
						element={
							<Suspense fallback={<Loader/>}>
								<NewPage/>
							</Suspense>
						}
					/>
					<Route
						path="aktsiji"
						element={
							<Suspense fallback={<Loader/>}>
								<DiscountPage/>
							</Suspense>
						}
					/>
					<Route
						path="about-us"
						element={
							<Suspense fallback={<Loader/>}>
								<AboutUsPage/>
								<AboutUsPageMobile/>
							</Suspense>
						}
					/>
					<Route
						path="/search"
						element={
							<Suspense fallback={<Loader/>}>
								<SearchPage/>
							</Suspense>
						}
					/>
					<Route
						path="product"
						element={
							<Suspense fallback={<Loader/>}>
								<Navigate to="/"/>
							</Suspense>
						}
					/>

					<Route
						path="/products/:id"
						element={
							<Suspense fallback={<Loader/>}>
								<ProductPage/>
							</Suspense>
						}
					/>
					<Route
						path="no-product"
						element={
							<Suspense fallback={<Loader/>}>
								<NoProducts/>
							</Suspense>
						}
					/>
					<Route
						path="admin-panel"
						element={<PrivateAdminRoute component={AdminPage} to="/"/>}
					/>
				</Route>

				<Route
					path="/"
					element={
						<Suspense fallback={<Loader/>}>
							<SharedLayoutWithoutFooter/>
						</Suspense>
					}
				>
					<Route
						path="/cabinet"
						element={
							<Suspense fallback={<Loader/>}>
								<UserPage/>
							</Suspense>
						}
					/>
					<Route
						path="/authorization"
						element={
							<Suspense fallback={<Loader/>}>
								<AuthorizationPage/>
							</Suspense>
						}
					/>
					<Route
						path="/reg-opt-cabinet"
						element={
							<Suspense fallback={<Loader/>}>
								<RegisterOptCabinetPage/>
							</Suspense>
						}
					/>
					<Route
						path="/reg-personal-cabinet"
						element={
							<Suspense fallback={<Loader/>}>
								<RegisterPersonalCabinetPage/>
							</Suspense>
						}
					/>
					<Route
						path="/forgot-password"
						element={
							<Suspense fallback={<Loader/>}>
								<ForgotPasswordPage/>
							</Suspense>
						}
					/>
					<Route
						path="cart"
						element={
							<Suspense fallback={<Loader/>}>
								<CartPage/>
							</Suspense>
						}
					/>
					<Route
						path="order"
						element={
							<Suspense fallback={<Loader/>}>
								<OrderPlacementPage/>
							</Suspense>
						}
					/>
				</Route>
				{/*
          <Route
            path="userData"
            element={<PrivateRoute component={UserData} to="/" />}
          ></Route>

          <Route
            path="сhangePassword"
            element={<PrivateRoute component={ChangePassword} to="/" />}
          />

          <Route
            path="history"
            element={<PrivateRoute component={PaymentHistory} to="/" />}
          />
          <Route path="feedback" element={<Feedback />} />
        </Route> */}
			</Routes>
			{!isMobileScreen && <ScrollToTop/>}
		</ThemeProvider>
	);
}

export default App;
