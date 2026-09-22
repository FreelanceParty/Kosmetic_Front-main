import React from "react";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = {hasError: false};
	}

	static getDerivedStateFromError() {
		return {hasError: true};
	}

	componentDidCatch(error, errorInfo) {
		console.error("ErrorBoundary зловив помилку:", error, errorInfo);
	}

	handleReload = () => {
		window.location.reload();
	};

	render() {
		if (this.state.hasError) {
			return (
				<div className="flex flex-col items-center justify-center gap-6 min-h-[60vh] px-5 text-center">
					<div className="font-semibold text-lg">Щось пішло не так</div>
					<div className="text-md max-w-[420px]">
						Сталася помилка під час відображення сторінки. Спробуйте оновити сторінку.
						Якщо помилка повторюється — очистіть кошик або зверніться до адміністратора.
					</div>
					<button
						type="button"
						onClick={this.handleReload}
						className="h-[51px] px-8 bg-[#E667A4] text-white font-semibold rounded-[3px]"
					>
						ОНОВИТИ СТОРІНКУ
					</button>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
