import {Navigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import {getIsAdmin} from "../../redux/auth/selectors";

export const PrivateRoute = ({component: Component, ...rest}) => {
	const token = localStorage.getItem("token");
	return token ? <Component/> : <Navigate to="/login" {...rest} />;
};

export const PrivateAdminRoute = ({component: Component, ...rest}) => {
	const isAdmin = useSelector(getIsAdmin);

	return isAdmin
		? <Component/>
		: <Navigate to="/login" {...rest} />;
};