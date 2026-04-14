import {Suspense} from "react";
import {Outlet} from "react-router-dom";

import Header from "../Header/Header";

import {Loader} from "../Loader/Loader";

import Footer from "../Footer/Footer";

const SharedLayout = () => {
	return (
		<div className="h-screen flex flex-col overflow-x-hidden">
			<Header/>

			<div id="app-scroll-container" className="flex flex-col min-h-0 flex-1 overflow-y-auto">
				<main className="flex-1">
					<Suspense fallback={<Loader/>}>
						<Outlet/>
					</Suspense>
				</main>

				<Footer/>
			</div>

		</div>
	);
};

export default SharedLayout;
