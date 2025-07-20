import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';

import App from "./App";

import {BrowserRouter} from "react-router-dom";

import {GlobalStyle} from "./styles/GlobalStyle";

import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Provider} from "react-redux";

import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
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
				<GlobalStyle/>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
