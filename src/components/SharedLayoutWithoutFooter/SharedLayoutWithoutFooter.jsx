import {Suspense} from "react";
import {Outlet} from "react-router-dom";

import Header from "../Header/Header";
import {Loader} from "../Loader/Loader";

import {Bgd} from "./SharedLayoutWithoutFooter.styled";

const SharedLayoutWithoutFooter = () => {
	return (
		<>
			<Header/>
			<Bgd>
				<Suspense fallback={<Loader/>}>
					<Outlet/>
				</Suspense>
			</Bgd>
		</>
	);
};

export default SharedLayoutWithoutFooter;
