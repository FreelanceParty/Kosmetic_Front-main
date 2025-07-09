import {Navigate} from 'react-router-dom';

export const PrivateRoute = ({component: Component, ...rest}) => {
	const token = localStorage.getItem("token");
	return token ? <Component/> : <Navigate to="/login" {...rest} />;
};

export const PrivateAdminRoute = ({component: Component, ...rest}) => {
	const token = localStorage.getItem("token");
	const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

	return token && isAdmin
		? <Component/>
		: <Navigate to="/login" {...rest} />;
};