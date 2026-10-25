import {ThemeProvider} from "styled-components";
import {theme} from "./styles/theme";
import {Navigate, Route, Routes, useLocation, useParams} from "react-router-dom";
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
import AllBrandsPage from "./pages/AllBrandsPage/AllBrandsPage";
import BrandPage from "./pages/BrandPage/BrandPage";
import NoProducts from "./pages/NoProducts/NoProducts";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import {useMedia} from "./utils/hooks/useMedia";
import AdminPage from "./pages/AdminPage/AdminPage";
import {PrivateAdminRoute} from "./modules/PrivateRoutes/PrivateRoutes";
import CooperationPage from "./pages/CooperationPage/CooperationPage";
import UserPage from "./pages/UserPage/UserPage";
import SharedLayoutWithoutFooter from "./components/SharedLayoutWithoutFooter/SharedLayoutWithoutFooter";
import AuthorizationPage from "./pages/Authorization/AuthorizationPage";
import RegisterOptCabinetPage from "./pages/Authorization/SubPages/RegisterOptCabinetPage";
import RegisterDropCabinetPage from "./pages/Authorization/SubPages/RegisterDropCabinetPage";
import RegisterPersonalCabinetPage from "./pages/Authorization/SubPages/RegisterPersonalCabinetPage";
import {useDispatch, useSelector} from "react-redux";
import {refreshUser} from "./redux/auth/operation";
import ForgotPasswordPage from "./pages/Authorization/SubPages/ForgotPasswordPage";
import AboutUsPageMobile from "./pages/AboutUsPage/AboutUsPageMobile";
import CartPage from "./pages/CartPage/CartPage";
import OrderPlacementPage from "./pages/OrderPlacementPage/OrderPlacementPage";
import OrderReceivedPage from "./pages/OrderPlacementPage/OrderReceivedPage";
import {trackPageView} from "./ads/AdEvents";
import {useRemarketingPageView} from "./ads/useEcommerceTracking";
import Seo from "./components/Seo/Seo";
import ContactWidget from "./components/ContactWidget/ContactWidget";
import {getUserEmail, getUserFirstName, getUserLastName, getUserNumber} from "./redux/auth/selectors";
import "react-phone-input-2/lib/style.css";


function RedirectProductToProducts() {
	const {id} = useParams();
	return <Navigate to={`/products/${id}`} replace/>;
}

function App() {
	useMedia();
	useRemarketingPageView();
	const dispatch = useDispatch();
	const location = useLocation();
	const userEmail = useSelector(getUserEmail);
	const userFirstName = useSelector(getUserFirstName);
	const userLastName = useSelector(getUserLastName);
	const userNumber = useSelector(getUserNumber);

	useEffect(() => {
		dispatch(refreshUser());
	}, [dispatch]);

	useEffect(() => {
		trackPageView({em: userEmail, fn: userFirstName, ln: userLastName, ph: userNumber});
	}, [location.pathname, location.search, userEmail, userFirstName, userLastName, userNumber]);
	return (
		<ThemeProvider theme={theme}>
			<Routes>
				<Route path="*" element={<><Seo title="Сторінку не знайдено" noindex/><NotFoundPage/></>}/>

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
								<Seo
									title="Співпраця: опт і дропшипінг корейської косметики"
									description="Оптові закупівлі та дропшипінг корейської косметики з Beauty Blossom. Вигідні ціни, оригінальна продукція та швидка відправка по Україні."
								/>
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
								<Seo title="Відновлення пароля" noindex/>
								<ForgottenPage/>
							</Suspense>
						}
					/>
					<Route
						path="forgotten/:forgottenCode"
						element={
							<Suspense fallback={<Loader/>}>
								<Seo title="Відновлення пароля" noindex/>
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
						path="about-us"
						element={
							<Suspense fallback={<Loader/>}>
								<Seo
									title="Про нас"
									description="Beauty Blossom — інтернет-магазин оригінальної корейської косметики. Дізнайтеся про нас, наші принципи роботи та переваги співпраці."
								/>
								<AboutUsPage/>
								<AboutUsPageMobile/>
							</Suspense>
						}
					/>
					<Route
						path="/search"
						element={
							<Suspense fallback={<Loader/>}>
								<Seo title="Пошук" noindex/>
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
						path="/product/:id"
						element={
							<Suspense fallback={<Loader/>}>
								<RedirectProductToProducts/>
							</Suspense>
						}
					/>
					<Route
						path="no-product"
						element={
							<Suspense fallback={<Loader/>}>
								<Seo title="Товарів не знайдено" noindex/>
								<NoProducts/>
							</Suspense>
						}
					/>
					<Route
						path="admin-panel"
						element={<><Seo title="Адмін-панель" noindex/><PrivateAdminRoute component={AdminPage} to="/"/></>}
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
								<Seo title="Особистий кабінет" noindex/>
								<UserPage/>
							</Suspense>
						}
					/>
					<Route
						path="/authorization"
						element={
							<Suspense fallback={<Loader/>}>
								<Seo title="Вхід" noindex/>
								<AuthorizationPage/>
							</Suspense>
						}
					/>
					<Route
						path="/reg-opt-cabinet"
						element={
							<Suspense fallback={<Loader/>}>
								<Seo title="Реєстрація оптового кабінету" noindex/>
								<RegisterOptCabinetPage/>
							</Suspense>
						}
					/>
					<Route
						path="/reg-drop-cabinet"
						element={
							<Suspense fallback={<Loader/>}>
								<Seo title="Реєстрація дроп-кабінету" noindex/>
								<RegisterDropCabinetPage/>
							</Suspense>
						}
					/>
					<Route
						path="/reg-personal-cabinet"
						element={
							<Suspense fallback={<Loader/>}>
								<Seo title="Реєстрація" noindex/>
								<RegisterPersonalCabinetPage/>
							</Suspense>
						}
					/>
					<Route
						path="/forgot-password"
						element={
							<Suspense fallback={<Loader/>}>
								<Seo title="Відновлення пароля" noindex/>
								<ForgotPasswordPage/>
							</Suspense>
						}
					/>
					<Route
						path="cart"
						element={
							<Suspense fallback={<Loader/>}>
								<Seo title="Кошик" noindex/>
								<CartPage/>
							</Suspense>
						}
					/>
					<Route
						path="order"
						element={
							<Suspense fallback={<Loader/>}>
								<Seo title="Оформлення замовлення" noindex/>
								<OrderPlacementPage/>
							</Suspense>
						}
					/>
					<Route
						path="order-received/:orderNumber"
						element={
							<Suspense fallback={<Loader/>}>
								<Seo title="Замовлення оформлено" noindex/>
								<OrderReceivedPage/>
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
			<ScrollToTop/>
			<ContactWidget/>
		</ThemeProvider>
	);
}

export default App;
