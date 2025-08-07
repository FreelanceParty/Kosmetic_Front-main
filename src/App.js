import {ThemeProvider} from "styled-components";
import {theme} from "./styles/theme";
import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import {Suspense} from "react";
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
import {PrivateRoute, PrivateAdminRoute} from "./modules/PrivateRoutes/PrivateRoutse";
import CooperationPage from "./pages/CooperationPage/CooperationPage";

function App() {
	const {isMobileScreen} = useMedia();
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
						path="kliientam"
						element={
							<Suspense fallback={<Loader/>}>
								<AboutUsPage/>
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
					{/* <Route
            path="order"
            element={
              <Suspense fallback={<Loader />}>
                <OrderPlacement />
              </Suspense>
            }
          /> */}
					<Route
						path="ordersbyclient"
						element={<PrivateAdminRoute component={AdminPage} to="/"/>}
					/>
				</Route>
				{/* <Route
          path="cabinet"
          element={<PrivateRoute component={UserPage} to="/" />}
        >
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
