import {Suspense} from "react";
import {Outlet} from "react-router-dom";

import Header from "../Header/Header";

import {Loader} from "../Loader/Loader";

import Footer from "../Footer/Footer";

const SharedLayout = () => {
	return (
		<>
			<Header/>
			<div className="flex flex-col overflow-y-auto max-h-screen">
				<div>
					<Suspense fallback={<Loader/>}>
						<Outlet/>
					</Suspense>
				</div>
				<Footer/>
			</div>
		</>
	);
};

export default SharedLayout;
