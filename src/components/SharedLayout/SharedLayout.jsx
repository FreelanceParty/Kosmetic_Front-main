import {Suspense} from "react";
import {Outlet} from "react-router-dom";

import Header from "../Header/Header";

import {Loader} from "../Loader/Loader";

import {Bgd} from "./SharedLayout.styled";
import Footer from "../Footer/Footer";

const SharedLayout = () => {
	return (
		<>
			<Header/>
			<Bgd>
				<Suspense fallback={<Loader/>}>
					<Outlet/>
				</Suspense>
			</Bgd>
			<Footer/>
		</>
	);
};

export default SharedLayout;
