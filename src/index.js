import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';

import axios from "axios";

import App from "./App";

import {BrowserRouter} from "react-router-dom";

import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Provider} from "react-redux";

import store, {persistor} from "./redux/store";
import {PersistGate} from "redux-persist/integration/react";

if (
	process.env.NODE_ENV === "production" &&
	window.location.hostname === "beautyblossom.com.ua"
) {
	window.location.replace(
		`https://www.beautyblossom.com.ua${window.location.pathname}${window.location.search}${window.location.hash}`
	);
}

const persistedToken = localStorage.getItem("token");
if (persistedToken) {
	axios.defaults.headers.common.Authorization = `Bearer ${persistedToken}`;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<BrowserRouter basename="/">
					<App/>

					<ToastContainer
						position="bottom-right"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="colored"
					/>
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
